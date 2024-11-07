import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(
    readonly userService: UserService,
    readonly authService: AuthService,
  ) {}

  @Post('/login')
  @ApiOperation({ summary: 'Connexion Utilisateur' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Connexion réussie',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: "Token JWT utile pour l'authentification",
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Couple email/mot de passe incorrect',
  })
  public async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('Couple email/password is wrong');
    }

    const isValidPassword = await this.authService.validatePassword(
      user,
      loginDto.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Couple email/password is wrong');
    }

    return {
      access_token: this.authService.generateJWT(user),
    };
  }

  @Post('/register')
  @ApiOperation({ summary: 'Inscription Utilisateur' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Inscription réussie',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: "Token JWT utile pour l'authentification",
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      "Échec de l'inscription en raison d'une adresse e-mail déjà utilisée ou d'autres erreurs de validation.",
  })
  public async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      access_token: this.authService.generateJWT(user),
    };
  }

  @Get('/validate-token')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Validation du token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Le Bearer token dans le header Authorization est valide',
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description:
      "Il n'y pas de token dans le header Authorization ou bien celui-ci est invalide.",
  })
  @ApiBearerAuth()
  public async validateToken() {
    return {
      success: true,
    };
  }
}
