import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Link, To } from 'react-router-dom';

interface BackButtonProps {
  to?: To;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ to = '/', label = 'Retour' }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center text-blue-500 hover:text-blue-600 font-semibold"
    >
      <ArrowLeftIcon className="size-4 mr-1" />
      {label}
    </Link>
  );
};