import { TaskPriority } from 'src/tasks/entities/enum/taskPriority.enum';
import { TaskStatus } from 'src/tasks/entities/enum/taskStatus.enum';
import { OrderParams } from 'types/OrderParams';

/**
 * DTO responsável por transportar informações de paginação
 * e filtros para consultas paginadas.
 *
 * Pode ser utilizado em controllers, serviços ou microservices
 * para padronizar buscas.
 */
export class PaginationDto {
  /**
   * Página atual da paginação.
   * Pode ser string (vindo de query ou mensageria) ou number.
   *
   * @example 1
   */
  page?: number | string;

  /**
   * Quantidade de itens por página.
   * Pode ser string (vindo de query ou mensageria) ou number.
   *
   * @example 10
   */
  limit?: number | string;

  /**
   * Prioridade da task para filtro.
   */
  priority?: TaskPriority;

  /**
   * Status da task para filtro.
   */
  status?: TaskStatus;

  /**
   * Filtro por título (busca parcial).
   */
  title?: string;

  /**
   * Parâmetro de ordenação
   */
  order?: OrderParams;
}
