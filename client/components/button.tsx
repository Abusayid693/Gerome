import React, {ReactNode} from 'react';
import {Spinner} from './spinner';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: ReactNode;
}

export const ButtonDark: React.FC<ButtonProps> = ({isLoading, children}) => {
  return (
    <button disabled={isLoading} className="bg-blue-800 w-full py-3 rounded text-white flex items-center justify-center">
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export const ButtonLight: React.FC<ButtonProps> = ({isLoading, children}) => {
  return (
    <button disabled={isLoading} className="w-full py-3 rounded text-blue-800 border border-blue-800 flex  items-center justify-center">
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
