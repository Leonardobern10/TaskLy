// observability/http-metrics.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { MetricsService } from './metrics.service';

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
  constructor(private readonly metricsService: MetricsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = process.hrtime();

    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const handler = context.getHandler();
    const controller = context.getClass();

    const route = `${controller.name}.${handler.name}`;

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        const diff = process.hrtime(start);
        const duration = diff[0] + diff[1] / 1e9;

        this.metricsService.incrementRequest(method, route, statusCode);
        this.metricsService.observeRequestDuration(
          method,
          route,
          statusCode,
          duration,
        );
      }),
    );
  }
}
