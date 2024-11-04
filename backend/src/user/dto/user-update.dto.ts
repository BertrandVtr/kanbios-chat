import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUniqueUserEmail } from '../validator/user-email-already-exists.validator';
import { ContextAwareDTO } from '../../utils/dto/context-aware.dto';

export class UserUpdateDto extends ContextAwareDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsUniqueUserEmail()
  @IsOptional()
  email: string;
}
