import { useRouteError } from 'react-router';
import { BackButton } from '../utils/BackButton.tsx';

export const UserNotFound = () => {

  const error = useRouteError();

  return (
    <>
      <BackButton />
      <p className="text-center text-xl text-gray-500 italic">Oops</p>
      <p>{`${error}`}</p>
    </>
  );
};