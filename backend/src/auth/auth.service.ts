import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(RegisterDto: RegisterDto): Promise<User> {
    return await this.userService.create({
      email: RegisterDto.email,
      password: await this.hasPassword(RegisterDto.password),
      firstName: RegisterDto.firstName,
      lastName: RegisterDto.lastName,
    });
  }

  public async validatePassword(
    user: User,
    plainPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, user.password);
  }

  public generateJWT(user: User): string {
    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
    };

    return this.jwtService.sign(payload);
  }

  public async verifyJWT(token: string): Promise<User | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return this.userService.findOneById(payload.id);
    } catch (error) {
      return null;
    }
  }

  private async hasPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
