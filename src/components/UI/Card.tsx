import React, { FC, ReactNode } from 'react';

type CardProps = {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children?: ReactNode;
};

const Card: FC<CardProps> = ({ padding = 'none', className, children }) => {
  const p = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-16'
  };

  return (
    <div
      className={`${className} ${p[padding]} w-full overflow-hidden rounded-md bg-stone-900/60 shadow-md`}>
      {children}
    </div>
  );
};

export default Card;
