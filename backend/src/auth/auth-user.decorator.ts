import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from './types/AuthRequest';
import { User } from '../user/user.entity';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | null => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
