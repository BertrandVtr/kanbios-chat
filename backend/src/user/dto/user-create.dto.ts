import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUniqueUserEmail } from '../validator/user-email-already-exists.validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsUniqueUserEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  // @IsStrongPassword()
  password: string;
}
