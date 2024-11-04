import { User } from '../../user/user.entity';
import { Socket } from 'socket.io';

export interface AuthSocket extends Socket {
  data: {
    user: User;
  };
}
