import { BackButton } from '../../components/utils/BackButton.tsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../store/hooks.ts';
import { selectAuthUser } from '../../store/auth/authSlice.ts';
import { useRouteUser } from '../../hooks/useRouteUser.ts';
import { Message } from '../../types/Message.ts';
import clsx from 'clsx';
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { useSocket } from '../../hooks/useSocket.ts';

export const ChatPage: React.FC = () => {
  const authUser = useAppSelector(selectAuthUser);
  const [user] = useRouteUser();

  const socket = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>('');
  const messagesContainer = useRef<HTMLDivElement | null>(null);

  function sendMessage() {
    if (!text) return;

    socket.current?.emit('sendMessage', {
      text,
      receiverId: user?.id,
      senderId: authUser?.id,
    });

    setText('');
  }

  useEffect(() => {
    if (user?.id === authUser?.id) {
      throw new Error('TEST');
    }

    if (user) {
      socket.current?.emit('getConversation', user.id);
    }

  }, [authUser, user, socket]);

  useEffect(() => {
    socket.current?.connect();

    function onGetConversation(messages: Message[]) {
      setMessages(messages);
    }

    function onReceiveMessage(message: Message) {
      setMessages((previousMessages) => [...previousMessages, message]);
    }

    socket.current?.on('receiveMessage', onReceiveMessage);
    socket.current?.on('getConversation', onGetConversation);

    return () => {
      socket.current?.off('receiveMessage', onReceiveMessage);
      socket.current?.off('getConversation', onGetConversation);
      socket.current?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTo({ behavior: 'instant', top: messagesContainer.current.scrollHeight });
    }
  }, [messages]);

  const fullName = useMemo(() => `${user?.firstName} ${user?.lastName}`, [user?.firstName, user?.lastName]);

  return (
    <>
      <BackButton to="/" />
      <h2 className="m-4 text-center font-bold text-xl">{fullName}</h2>
      <div className="h-[75vh] w-full max-w-7xl mx-auto border border-gray-300 rounded-lg flex flex-col">
        <div ref={messagesContainer} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message._id} className={clsx('w-fit p-3 rounded-t-lg text-justify',
              message.senderId !== authUser?.id
                ? 'justify-self-start mr-8 bg-gray-200 text-gray-800 rounded-r-lg'
                : 'justify-self-end ml-8 bg-blue-500 text-white rounded-l-lg')}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-300">
          <div className="flex gap-4">
          <textarea
            className="w-full flex-1 border border-gray-300 rounded-lg p-2 resize-none focus:outline-none focus:ring focus:ring-blue-200"
            rows={2}
            placeholder="Écrire un message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
          />
            <button
              onClick={sendMessage}
              className="w-20 h-20 inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition text-white"
            >
              <PaperAirplaneIcon className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};