import React, { FC, ReactNode } from 'react';

type SubHeadingProps = {
  customStyles?: string;
  children?: ReactNode;
};

const SubHeading: FC<SubHeadingProps> = ({ customStyles, children }) => {
  return (
    <h2
      className={`${customStyles} pb-2 text-xl font-bold tracking-wider text-stone-800 dark:text-stone-100`}>
      {children}
    </h2>
  );
};

export default SubHeading;
