import React, { FC, ReactNode } from 'react';

type HeadingProps = {
  customStyles?: string;
  children?: ReactNode;
};

const Heading: FC<HeadingProps> = ({ customStyles, children }) => {
  return (
    <h1
      className={`${customStyles} pb-2 text-9xl font-bold tracking-wider text-stone-800 dark:text-stone-100`}>
      {children}
    </h1>
  );
};

export default Heading;
