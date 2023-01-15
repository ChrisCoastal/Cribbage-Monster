import React, { FC, ReactNode } from 'react';

type CardProps = {
  customStyles?: string;
  children?: ReactNode;
};

const Card: FC<CardProps> = ({ customStyles, children }) => {
  return (
    <div className={`${customStyles} w-full rounded-md bg-stone-900/40 p-8 shadow-md`}>
      {children}
    </div>
  );
};

export default Card;
