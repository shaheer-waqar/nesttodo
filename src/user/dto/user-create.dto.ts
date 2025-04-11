import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    `${value?.splice(0, 1)?.toUpperCase()}${value?.splice(1)?.toLowerCase()}`.trim(),
  )
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    `${value?.splice(0, 1)?.toUpperCase()}${value?.splice(1)?.toLowerCase()}`.trim(),
  )
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  password: string;
}
