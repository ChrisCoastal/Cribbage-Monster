import React, { FC } from 'react';
import anime from 'animejs';

type DotProps = {
  height: string;
  width: string;
  color?: string;
  className?: string;
};

const Dot: FC<DotProps> = ({ height, width, color = '#fff', className }) => {
  const open = `M100,58.56c-16.85,0-30.5,13.66-30.5,30.5s13.66,30.5,30.5,30.5s30.5-13.66,30.5-30.5S116.85,58.56,100,58.56z M100,102.25
	c-7.28,0-13.19-5.9-13.19-13.19s5.9-13.19,13.19-13.19s13.19,5.9,13.19,13.19S107.28,102.25,100,102.25z`;

  const closed = `M100,58.56c-16.85,0-30.5,13.66-30.5,30.5s13.66,30.5,30.5,30.5s30.5-13.66,30.5-30.5S116.85,58.56,100,58.56z M100,90.25
	c-7.28,0-13.19-1.19-13.19-1.19s5.9-1.19,13.19-1.19s13.19,1.19,13.19,1.19S107.28,90.25,100,90.25z`;

  const clickHandler = () => {
    anime({
      targets: '.svgtest path',
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

    // const timeline = anime.timeline({
    //   duration: 2000,
    //   easing: 'easeOutExpo'
    // });
    // timeline.add({
    //   targets: '.svgtest',
    //   d: [
    //     {
    //       value: closed
    //     }
    //   ]
    // });
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 400 400"
      fill={color}
      stroke={color}
      onClick={clickHandler}
      className={`${className} svg svgtest`}>
      <path d={open} />
    </svg>
  );
};

export default Dot;
