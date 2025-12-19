import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TaskPriority } from 'src/entities/enum/TaskPriority';
import { TaskStatus } from 'src/entities/enum/TaskStatus';
import { OrderParams } from './OrderParams';

export class FindTasksQueryDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(OrderParams)
  order?: OrderParams;
}
