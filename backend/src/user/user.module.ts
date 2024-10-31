import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEmailAlreadyExistsValidator } from './validator/user-email-already-exists.validator';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UserService, UserEmailAlreadyExistsValidator],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
