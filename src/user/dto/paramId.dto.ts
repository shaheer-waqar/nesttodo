import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class paramIdDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID('all')
  id: string;
}
