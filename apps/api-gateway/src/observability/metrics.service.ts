import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

// Responsável por centralizar o registro e a exposição
// de métricas Prometheus da aplicação
//      1. Define quais métricas existem
//      2. Controla como elas são atualizadas
//      3. Expõe os dados para o Prometheus

/**
 Responsável por centralizar o registro e a exposição
 de métricas Prometheus da aplicação
      1. Define quais métricas existem
      2. Controla como elas são atualizadas
      3. Expõe os dados para o Prometheus
 */
@Injectable()
export class MetricsService {
  private readonly httpRequestCounter: client.Counter<string>; // Garante que os labels das metricas são strings
  private readonly httpRequestDuration: client.Histogram<string>;

  // No prom-client, métricas são registradas no momento
  // da criação. Por isso, isso acontece no constructor
  constructor() {
    /**
     * Isso registra métricas automáticas do Node.js, como:
        1. Uso de CPU
        2. Uso de memória
        3. Event Loop lag
        4. Garbage Collection
        5. Heap size
     */
    client.collectDefaultMetrics();

    // Só incrementa, nunca diminui
    // ideal para: REQUISIÇÕES, ERROS, EVENTOS
    this.httpRequestCounter = new client.Counter({
      // NOME DA MÉTRICA: SEMPRE SNAKE_CASE E SUFIXO _TOTAL PARA COUNTERS
      name: 'http_requests_total',
      help: 'Total de requisições HTTP',
      // CRIA DIMENSÕES DA MÉTRICA
      labelNames: ['method', 'route', 'status_code'],
    });

    // MEDE DISTRIBUIÇÃO DE VALORES
    // IDEAL PARA: LATÊNCIA, TAMANHO DO PAYLOAD, TEMPO DE PROCESSAMENTO
    this.httpRequestDuration = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duração das requisições HTTP',
      labelNames: ['method', 'route', 'status_code'],
      // SÃO OS LIMITES DE TEMPO EM SEGUNDOS
      buckets: [0.1, 0.3, 0.5, 1, 2, 5],
    });
  }

  // o COUNTER É INCREMENTADO EM 1 PARA AQUELA COMBINAÇÃO DE LABELS
  incrementRequest(method: string, route: string, statusCode: number) {
    this.httpRequestCounter.inc({
      method,
      route,
      status_code: statusCode.toString(),
    });
  }

  observeRequestDuration(
    method: string,
    route: string,
    statusCode: number,
    // PRECISA ESTAR EM SEGUNDOS, POR ISSO USAMOS `process.hrtime` no interceptor
    duration: number,
  ) {
    //Coloca o valor duration dentro dos buckets
    // Atualiza estatísticas de latência
    this.httpRequestDuration.observe(
      {
        method,
        route,
        status_code: statusCode.toString(),
      },
      duration,
    );
  }

  // REgistry global do prom-client
  // Armazena todas as métricas registradas
  getMetrics() {
    return client.register.metrics();
  }
}
