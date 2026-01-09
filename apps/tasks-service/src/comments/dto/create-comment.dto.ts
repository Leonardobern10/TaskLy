import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  taskId: string;

  @IsString()
  text: string;

  @IsEmail()
  author: string;
}
