import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Match } from '../../validators/match.decorator';
import { IsUniqueUserEmail } from '../../user/validator/user-email-already-exists.validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsUniqueUserEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  @Match('password')
  confirmPassword: string;
}
