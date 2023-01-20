import React, { FC, ReactNode } from 'react';

type SubHeadingProps = {
  className?: string;
  children?: ReactNode;
};

const SubHeading: FC<SubHeadingProps> = ({ className, children }) => {
  return (
    <h2
      className={`${className} pb-2 font-bold tracking-wider text-stone-100 lg:text-lg xl:text-2xl`}>
      {children}
    </h2>
  );
};

export default SubHeading;
