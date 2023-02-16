import React, { FC } from 'react';
import anime from 'animejs';

type TeethProps = {
  // height: string;
  // width: string;
  style?: React.CSSProperties;
  color?: string;
  className?: string;
};

const Teeth: FC<TeethProps> = ({ style, color = '#1c1917', className }) => {
  const teethPoints = `1600,97.38 1600,0 0,0 0,97.38 0,109.74 0,183.54 0,298.41 55.18,183.54 110.35,298.41 165.53,183.54 220.7,298.41 
	275.88,183.54 331.06,298.41 386.23,183.54 441.41,298.41 496.58,183.54 551.76,298.41 606.94,183.54 662.11,298.41 717.29,183.54 
	772.46,298.41 827.64,183.54 882.82,298.41 937.99,183.54 993.17,298.41 1048.34,183.54 1103.52,298.41 1158.7,183.54 
	1213.87,298.41 1269.05,183.54 1324.22,298.41 1379.4,183.54 1434.58,298.41 1489.75,183.54 1544.93,298.41 1600.1,183.54 
	1600.1,97.38 `;

  const clickHandler = () => {
    anime({
      targets: '.teeth',
      d: [
        {
          value: closed
        },
        {
          value: open
        }
      ],
      duration: 2000,
      loop: true,
      easing: 'easeOutExpo'
    });
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // height={height}
      // width={width}
      viewBox="0 0 1600 300"
      fill={color}
      stroke={color}
      // onClick={clickHandler}
      className={`${className} svg teeth fill-stone-900`}
      style={style}>
      <polygon points={teethPoints} />
    </svg>
  );
};

export default Teeth;
