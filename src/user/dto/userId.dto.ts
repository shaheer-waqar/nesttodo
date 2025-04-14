import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UserIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('all')
  userId: string;
}
