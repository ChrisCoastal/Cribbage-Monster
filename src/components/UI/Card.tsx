import React, { FC, ReactNode } from 'react';

type CardProps = {
  customStyles?: string;
  children?: ReactNode;
};

const Card: FC<CardProps> = ({ customStyles, children }) => {
  return <div className={`${customStyles} rounded-md p-2 shadow-md`}>{children}</div>;
};

export default Card;
