import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthUser } from './auth-user.decorator';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    readonly userService: UserService,
    readonly authService: AuthService,
  ) {}

  @Post('/login')
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
  public async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      access_token: this.authService.generateJWT(user),
    };
  }

  @Get('/test')
  @UseGuards(AuthGuard)
  public async test(@AuthUser() user: User) {
    return {
      success: true,
      user,
    };
  }
}
