import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getBearer(request);
    const currentUser = await this.authService.verifyJWT(token);

    if (!currentUser) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    request.user = currentUser;
    return true;
  }

  private getBearer(request: Request): string | null {
    const { authorization } = request.headers;

    if (!authorization || authorization.trim() === '') {
      return null;
    }

    return authorization.replace(/bearer/gim, '').trim() || null;
  }
}
