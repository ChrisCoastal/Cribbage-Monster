import React, { FC, ReactNode } from 'react';

type SubHeadingProps = {
  customStyles?: string;
  children?: ReactNode;
};

const SubHeading: FC<SubHeadingProps> = ({ customStyles, children }) => {
  return (
    <h2 className={`${customStyles} text-xl font-bold tracking-wider text-white dark:text-white`}>
      {children}
    </h2>
  );
};

export default SubHeading;
