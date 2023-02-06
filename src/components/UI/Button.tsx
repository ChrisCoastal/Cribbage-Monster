import React, { FC, MouseEventHandler, ReactNode } from 'react';
import ToolTip from './ToolTip';

type ButtonProps = {
  // size: string;
  handler?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  buttonColor?: string;
  buttonSize?: 'sm' | 'md' | 'lg' | 'circle';
  tooltip?: string;
  className?: string;
  children?: ReactNode;
};

const Button: FC<ButtonProps> = ({
  handler,
  type = 'button',
  buttonColor = 'primary',
  buttonSize = 'sm',
  tooltip,
  className,
  children
}) => {
  const size = {
    sm: 'py-1 px-4 rounded-md',
    md: 'py-2 px-6 text-xl font-bold tracking-wider rounded-md',
    lg: 'py-2 px-6 text-xl font-bold tracking-wider rounded-md shadow-xl',
    circle: 'p-0 rounded-full'
  };

  const color =
    buttonColor === 'primary'
      ? 'from-purple-400/90 to-purple-700/90'
      : 'from-emerald-400/90 to-emerald-700/90';

  return (
    <>
      {tooltip ? (
        <div className="relative">
          <ToolTip text={tooltip}>
            <button
              type={type}
              onClick={handler}
              className={`${className} ${color} ${size[buttonSize]} cursor-pointer bg-black bg-gradient-to-br tracking-wide text-stone-50 transition-all duration-300 hover:bg-slate-100 hover:shadow-md`}>
              {children}
            </button>
          </ToolTip>
        </div>
      ) : (
        <button
          type={type}
          onClick={handler}
          className={`${className} ${color} ${size[buttonSize]} cursor-pointer bg-black bg-gradient-to-br tracking-wide text-stone-50 shadow-md transition-all duration-300 hover:bg-slate-100 hover:shadow-md`}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
