import { useParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { User } from '../types/User.ts';
import { getUser } from '../api/UsersApi.ts';

export const useRouteUser = () => {
  const { userId } = useParams() as { userId: string };

  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    setUser(await getUser(+userId));
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return [user, fetchUser] as const;
};