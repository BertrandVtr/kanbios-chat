import { BackButton } from '../../components/utils/BackButton.tsx';
import React, { useEffect, useMemo } from 'react';
import { useAppSelector } from '../../store/hooks.ts';
import { selectAuthUser } from '../../store/auth/authSlice.ts';
import { useRouteUser } from '../../hooks/useRouteUser.ts';

export const ChatPage: React.FC = () => {
  const authUser = useAppSelector(selectAuthUser);
  const [user] = useRouteUser();

  useEffect(() => {
    if (user?.id === authUser?.id) {
      throw new Error('TEST');
    }
  }, [user, authUser]);

  const fullName = useMemo(() => `${user?.firstName} ${user?.lastName}`, [user?.firstName, user?.lastName]);

  return (
    <>
      <BackButton to="/" />
      <h2 className="m-4 text-center font-bold text-xl">{fullName}</h2>
      <div className="h-[75vh] w-full max-w-7xl mx-auto border border-gray-300 rounded-lg flex flex-col">
        {/* Chat messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Example messages */}
          <div className="justify-self-start w-fit bg-gray-200 text-gray-800 p-3 rounded-t-lg rounded-r-lg">
            Bonjour, comment puis-je vous aider aujourd'hui ?
          </div>
          <div className="justify-self-end ml-8 w-fit bg-blue-500 text-white p-3 rounded-t-lg rounded-l-lg text-justify">
            J'aimerais en savoir plus sur votre service. aslkfjas;lfj;aslj sldfj lask jflskd jflksdj lfJ'aimerais en savoir plus sur votre service. aslkfjas;lfj;aslj
            sldfj lask jflskd jflksdj lfJ'aimerais en savoir plus sur votre service. aslkfjas;lfj;aslj sldfj lask jflskd jflksdj lfJ'aimerais en savoir plus sur votre
            service. aslkfjas;lfj;aslj sldfj lask jflskd jflksdj lfJ'aimerais en savoir plus sur votre service. aslkfjas;lfj;aslj sldfj lask jflskd jflksdj lfJ'aimerais
            en savoir plus sur votre service. aslkfjas;lfj;aslj sldfj lask jflskd jflksdj lfJ'aimerais en savoir plus sur votre service. aslkfjas;lfj;aslj sldfj lask
            jflskd jflksdj lfJ'aimerais en savoir plus sur votre service. aslkfjas;lfj;aslj sldfj lask jflskd jflksdj lfJ'aimerais en savoir plus sur votre service.
            aslkfjas;lfj;aslj sldfj lask jflskd jflksdj lfJ'aimerais en savoir plus sur votre service. aslkfjas;lfj;aslj sldfj lask jflskd jflksdj lfJ'aimerais en savoir
            plus sur votre service. aslkfjas;lfj;aslj sldfj lask jflskd jflksdj lfs
          </div>
        </div>

        {/* Textarea for sending messages */}
        <div className="p-4 border-t border-gray-300">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring focus:ring-blue-200"
          rows={2}
          placeholder="Écrire un message..."
        />
        </div>
      </div>
    </>
  );
};