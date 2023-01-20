import React, { FC } from 'react';

type DropDownProps = {
  menuItems: string[];
};

const DropDown: FC<DropDownProps> = ({ menuItems }) => {
  return (
    <div className="relative">
      <div className="absolute right-0 flex flex-col items-end bg-white p-2">
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
