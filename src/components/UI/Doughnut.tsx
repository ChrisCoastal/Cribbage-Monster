import React, { FC, useState } from 'react';

type DoughnutProps = {
  chartColor?: string;
  centerText?: string;
  degFill: number;
};

const Doughnut: FC<DoughnutProps> = ({ degFill, centerText, chartColor = '#a5d' }) => {
  const [hover, setHover] = useState(false);
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

  const innerGlow = 'shadow-[inset_0_0rem_0.3rem_0.3rem_#a855f733]';

  return (
    <div className="relative h-full w-full">
      <div
        className={`${
          hover && innerGlow
        } absolute left-1/2 top-1/2 flex h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-stone-800 text-4xl font-extrabold transition-all duration-300`}>
        <p className={`text-[${chartColor}]`} style={{ color: `${chartColor}` }}>
          {centerText}
        </p>
      </div>
      <div
        style={doughnutStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="transition-all duration-300 hover:shadow-[0_0rem_0.25rem_0.25rem_#a855f755]"></div>
    </div>
  );
};

export default Doughnut;
