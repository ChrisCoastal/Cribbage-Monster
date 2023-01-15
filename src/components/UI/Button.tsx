import React, { FC, MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  // size: string;
  handler?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  buttonSize?: 'sm' | 'md' | 'lg';
  customStyles?: string;
  children?: ReactNode;
};

const Button: FC<ButtonProps> = ({
  handler,
  type = 'button',
  color = 'primary',
  buttonSize = 'sm',
  customStyles,
  children
}) => {
  const buttonColor =
    color === 'primary' ? 'bg-emerald-600 dark:bg-purple-200' : 'bg-blue-600 dark:bg-blue-200';

  const size = {
    sm: 'py-1 px-4',
    md: 'py-2 px-6 text-xl font-bold tracking-wider',
    lg: ''
  };

  return (
    <button
      type={type}
      onClick={handler}
      className={`${customStyles} ${size[buttonSize]} cursor-pointer rounded-full bg-black py-1 px-4 text-white shadow-sm transition-all duration-300 hover:bg-slate-100 hover:shadow-md dark:bg-gradient-to-br dark:from-purple-400/90 dark:to-purple-700/90`}>
      {children}
    </button>
  );
};

export default Button;
