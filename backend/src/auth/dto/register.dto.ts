import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Match } from '../../validators/match.decorator';
import { IsUniqueUserEmail } from '../../user/validator/user-email-already-exists.validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Prénom',
    example: 'Bertrand',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nom de famille',
    example: 'Vautrin',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsUniqueUserEmail()
  @ApiProperty({
    description: 'Email',
    example: 'bertrand.vautrin@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Mot de passe',
    example: 'password123',
  })
  // @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  // @IsStrongPassword()
  @Match('password')
  @ApiProperty({
    description: 'Confirmation du mot de passe',
    example: 'password123',
  })
  confirmPassword: string;
}
