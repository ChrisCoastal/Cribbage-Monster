import React, { FC, ReactNode } from 'react';

type CardProps = {
  className?: string;
  children?: ReactNode;
};

const Card: FC<CardProps> = ({ className, children }) => {
  return (
    <div className={`${className} w-full rounded-md bg-stone-900/40 p-4 shadow-md lg:p-8`}>
      {children}
    </div>
  );
};

export default Card;
