import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUniqueUserEmail } from '../validator/user-email-already-exists.validator';
import { ContextAwareDTO } from '../../utils/dto/context-aware.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto extends ContextAwareDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Prénom',
    example: 'Test',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nom de famille',
    example: 'Test',
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsUniqueUserEmail()
  @ApiProperty({
    description: "Email (doit être unique à travers l'application)",
    example: 'test@test.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Mot de passe',
    example: 'password123',
  })
  // @IsStrongPassword()
  password: string;
}
