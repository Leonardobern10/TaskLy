import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Instância Axios principal da aplicação.
 *
 * Responsabilidades:
 * - Centralizar a comunicação HTTP com a API
 * - Definir o baseURL padrão
 * - Garantir envio automático de cookies (refresh token)
 *
 * Observação:
 * O uso de `withCredentials: true` é obrigatório para que o
 * cookie HTTP-only `refresh_token` seja enviado ao backend.
 * Sem isso, o fluxo de renovação de sessão falha.
 */
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

/**
 * Flag que indica se um refresh token está em andamento.
 *
 * Evita múltiplas chamadas simultâneas ao endpoint de refresh,
 * prevenindo race conditions e invalidação indevida de sessão.
 */
let isRefreshing = false;

/**
 * Fila de requisições que falharam com 401 enquanto o refresh
 * do token estava em andamento.
 *
 * Cada item contém callbacks `resolve` e `reject` para que
 * as requisições aguardem o novo token antes de serem repetidas.
 */
let failedQueue: any[] = [];

/**
 * Processa a fila de requisições que aguardam o refresh token.
 *
 * @param error - Erro ocorrido durante o refresh (se houver)
 * @param token - Novo access token gerado após o refresh
 *
 * Comportamento:
 * - Se houver erro: rejeita todas as requisições pendentes
 * - Se houver token: resolve todas as requisições com o novo token
 */
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

/**
 * Constrói o valor do header Authorization no formato Bearer.
 *
 * @param token - Access token JWT
 * @returns String no formato "Bearer <token>"
 */
const buildBearer = (token: any): string => `Bearer ${token}`;

/**
 * Interceptor de requisições.
 *
 * Responsabilidade:
 * - Anexar automaticamente o access token JWT
 *   no header Authorization de todas as requisições.
 */
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = buildBearer(token);
  }
  return config;
});

/**
 * Interceptor de respostas.
 *
 * Responsabilidade:
 * - Detectar erros 401 (token expirado)
 * - Renovar o access token usando refresh token
 * - Reexecutar automaticamente as requisições afetadas
 * - Garantir que apenas um refresh aconteça por vez
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verifica se o erro é de autenticação e se a request ainda não foi repetida
    if (error.response?.status === 401 && !originalRequest._retry) {
      /**
       * Caso já exista um refresh em andamento,
       * a requisição atual entra na fila e aguarda.
       */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = buildBearer(token);
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        /**
         * Solicita um novo access token utilizando o refresh token
         * armazenado em cookie HTTP-only.
         */
        const { data } = await api.post("/auth/refresh");
        const newToken = data.access_token;

        /**
         * Atualiza o estado global de autenticação
         * e o header padrão do Axios.
         */
        useAuthStore.getState().setSession(newToken);
        api.defaults.headers.common.Authorization = buildBearer(newToken);

        /**
         * Libera todas as requisições que aguardavam o refresh
         * e reexecuta a requisição original.
         */
        processQueue(null, newToken);
        return api(originalRequest);
      } catch (err) {
        /**
         * Caso o refresh falhe (refresh token inválido/expirado),
         * todas as requisições pendentes são canceladas
         * e o usuário é deslogado.
         */
        processQueue(err, null);
        useAuthStore.getState().logout();
        throw err;
      } finally {
        /**
         * Libera o lock de refresh, permitindo
         * futuras tentativas de renovação.
         */
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
