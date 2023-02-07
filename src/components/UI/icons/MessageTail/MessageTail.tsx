import React, { FC } from 'react';

type MessageTailProps = {
  height: string;
  width: string;
  color?: string;
  className?: string;
};

const MessageTail: FC<MessageTailProps> = ({ height, width, color = '#49ce9c', className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 48 48"
      fill={color}
      className={`${className} svg`}>
      <path
        d="M6.5,4.1c0,5.97-1.91,11.24-6.42,14.73c1.35,0.28,2.75,0.43,4.19,0.43c11.06,0,19.58-8.54,19.58-19.07
		c0-0.07-0.01-0.13-0.01-0.19H5.99C6.31,1.32,6.5,2.69,6.5,4.1z"
      />
      ;
    </svg>
  );
};

export default MessageTail;
