import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  task: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID('all')
  user_id: string;
}
