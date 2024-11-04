import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../store/hooks.ts';
import { selectToken } from '../store/auth/authSlice.ts';
import { useEffect, useRef } from 'react';

export const useSocket = () => {
  const token = useAppSelector(selectToken);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (token) {
      socket.current = io('http://localhost:3000', {
        auth: {
          token,
        },
        autoConnect: false,
      });
    } else {
      socket.current = null;
    }
    
    return () => {
      socket.current?.disconnect();
    };
  }, [token]);

  return socket;
};