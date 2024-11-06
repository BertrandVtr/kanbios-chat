import { useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { User } from '../types/User.ts';
import { getUser } from '../api/UsersApi.ts';
import { useAppSelector } from '../store/hooks.ts';
import { selectAuthUser } from '../store/auth/authSlice.ts';

export const useRouteUser = () => {
  const authUser = useAppSelector(selectAuthUser);
  const { userId } = useParams() as { userId: string };

  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    if (userId === 'me') {
      setUser(authUser);
    } else if (!isNaN(+userId)) {
      setUser(await getUser(+userId));
    }
  }, [userId, authUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return [user, fetchUser] as const;
};