import { User } from '../../user/user.entity';
import { Request } from 'express';

export type AuthRequest = { user: User } & Request;
