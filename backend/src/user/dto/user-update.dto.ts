import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsUniqueUserEmail } from '../validator/user-email-already-exists.validator';
import { ContextAwareDTO } from '../../utils/dto/context-aware.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto extends ContextAwareDTO {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Prénom',
    example: 'Bertrand',
    required: false,
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nom de famille',
    example: 'Vautrin',
    required: false,
  })
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsUniqueUserEmail()
  @IsOptional()
  @ApiProperty({
    description: 'Email',
    example: 'bertrand.vautrin@gmail.com',
    required: false,
  })
  email: string;
}
