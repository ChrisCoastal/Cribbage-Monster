import React, { FC } from 'react';

type AddIconProps = {
  height: string;
  width: string;
  color?: string;
  className?: string;
};

const AddIcon: FC<AddIconProps> = ({ height, width, color = '#fff', className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 48 48"
      fill={color}
      className={`${className} svg`}>
      <path d="M22.3 38.2V25.7H9.8v-3.4h12.5V9.8h3.4v12.5h12.5v3.4H25.7v12.5Z" />
    </svg>
  );
};

export default AddIcon;
