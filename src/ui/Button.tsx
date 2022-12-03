import React, { FC, MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  // size: string;
  handler: MouseEventHandler<HTMLButtonElement>;
  color?: string;
  customStyles?: string;
  children?: ReactNode;
};

const Button: FC<ButtonProps> = ({ handler, color = 'primary', customStyles, children }) => {
  const buttonColor =
    color === 'primary' ? 'bg-red-600 dark:bg-red-200' : 'bg-blue-600 dark:bg-blue-200';

  return (
    <button
      onClick={handler}
      className={`${customStyles} ${buttonColor} rounded-full hover:bg-red-400 py-1 px-4`}>
      {children}
    </button>
  );
};

export default Button;
