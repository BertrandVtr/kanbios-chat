import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('/')
  public async getAll() {
    return await this.userService.findAll();
  }
}
