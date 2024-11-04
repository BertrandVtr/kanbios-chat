import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUniqueUserEmail } from '../validator/user-email-already-exists.validator';
import { ContextAwareDTO } from '../../utils/dto/context-aware.dto';

export class UserCreateDto extends ContextAwareDTO {
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
