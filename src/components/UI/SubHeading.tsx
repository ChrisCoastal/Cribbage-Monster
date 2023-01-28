import React, { FC, ReactNode } from 'react';

type SubHeadingProps = {
  className?: string;
  children?: ReactNode;
};

const SubHeading: FC<SubHeadingProps> = ({ className, children }) => {
  return (
    <h2 className={`${className} pb-2 text-lg font-bold tracking-wider text-stone-100 xl:text-2xl`}>
      {children}
    </h2>
  );
};

export default SubHeading;
