import React, { FC, ReactNode } from 'react';

type HeadingProps = {
  className?: string;
  children?: ReactNode;
};

const Heading: FC<HeadingProps> = ({ className, children }) => {
  return (
    <h1
      className={`${className} pb-2 text-6xl font-bold tracking-wider text-stone-800 dark:text-stone-100 sm:text-7xl 2xl:text-[6.8rem]`}>
      {children}
    </h1>
  );
};

export default Heading;
