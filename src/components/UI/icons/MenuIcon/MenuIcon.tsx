import React, { FC } from 'react';

type MenuIconProps = {
  height: string;
  width: string;
  color?: string;
  className?: string;
};

const MenuIcon: FC<MenuIconProps> = ({ height, width, color = '#fff', className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 48 48"
      fill={color}
      className={`svg ${className}`}>
      <path d="M5.5 36.8v-3.95h37v3.95Zm0-10.8v-4h37v4Zm0-10.85V11.2h37v3.95Z" />
    </svg>
  );
};

export default MenuIcon;
