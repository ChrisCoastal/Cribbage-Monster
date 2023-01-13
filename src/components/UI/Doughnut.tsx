import React, { FC } from 'react';
import Card from './Card';

type DoughnutProps = {
  chartColor?: string;
  centerText?: string;
  degFill: number;
};

const Doughnut: FC<DoughnutProps> = ({ degFill, centerText, chartColor = '#a5d' }) => {
  const doughnutStyle = {
    // safari hack for aspect ratio
    height: '0',
    width: '100%',
    paddingBottom: '100%',
    // aspectRatio: '1/1',
    borderRadius: '50%',
    background: `conic-gradient(${chartColor} 0deg, ${chartColor} ${
      degFill - degFill * 0.3
    }deg, #83a ${degFill}deg, rgb(28 25 23) 1deg)`
  };

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute left-1/2 top-1/2 flex h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone-800 text-4xl font-extrabold`}>
        <p className={`text-[${chartColor}]`} style={{ color: `${chartColor}` }}>
          {centerText}
        </p>
      </div>
      <div style={doughnutStyle}></div>
    </div>
  );
};

export default Doughnut;
