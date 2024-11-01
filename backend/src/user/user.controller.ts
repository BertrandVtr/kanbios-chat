import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { GetEntityPipe } from './pipes/get-entity.pipe';
import { User } from './user.entity';
import { UserUpdateDto } from './dto/user-update.dto';

@UseGuards(AuthGuard)
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('/')
  public async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 50,
  ) {
    return await this.userService.findAllWithPagination(page, limit);
  }

  @Post('/')
  public async create(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.create(userCreateDto);
  }

  @Get('/:id')
  public async getOne(@Param('id', GetEntityPipe()) user: User) {
    return user;
  }

  @Patch('/:id')
  public async update(
    @Param('id', GetEntityPipe()) user: User,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return await this.userService.update(user.id, userUpdateDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', GetEntityPipe()) user: User) {
    return await this.userService.delete(user.id);
  }
}
