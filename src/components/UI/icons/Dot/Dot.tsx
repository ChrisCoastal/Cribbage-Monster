import React, { FC } from 'react';

type DotProps = {
  height: string;
  width: string;
  color?: string;
  className?: string;
};

const Dot: FC<DotProps> = ({ height, width, color = '#fff', className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      viewBox="0 0 400 400"
      fill={color}
      stroke={color}
      className={`${className} svg`}>
      <path
        d="M92.37,34.28c0,0.18,0,0.37-0.01,0.55c-0.01,0.18-0.02,0.36-0.04,0.54c-0.02,0.18-0.04,0.36-0.07,0.53
	c-0.03,0.18-0.06,0.35-0.09,0.52c-0.02,0.08-0.04,0.17-0.06,0.25c-0.02,0.08-0.04,0.17-0.06,0.25c-0.02,0.08-0.04,0.17-0.07,0.25
	c-0.02,0.08-0.05,0.17-0.07,0.25c-0.03,0.08-0.05,0.17-0.08,0.25c-0.03,0.08-0.06,0.17-0.09,0.25s-0.06,0.17-0.09,0.25
	c-0.03,0.08-0.07,0.16-0.1,0.24c-0.03,0.07-0.06,0.14-0.09,0.22s-0.07,0.14-0.1,0.21c-0.03,0.07-0.07,0.14-0.1,0.21
	c-0.03,0.07-0.07,0.14-0.11,0.21c-0.04,0.07-0.07,0.14-0.11,0.21c-0.04,0.07-0.08,0.14-0.12,0.2c-0.04,0.07-0.08,0.13-0.12,0.2
	c-0.04,0.07-0.08,0.13-0.12,0.2c-0.05,0.08-0.1,0.16-0.16,0.23c-0.05,0.08-0.11,0.15-0.16,0.23c-0.05,0.08-0.11,0.15-0.17,0.22
	c-0.06,0.07-0.11,0.15-0.17,0.22c-0.06,0.07-0.12,0.14-0.18,0.21c-0.06,0.07-0.12,0.14-0.18,0.21c-0.06,0.07-0.13,0.14-0.19,0.2
	c-0.06,0.07-0.13,0.13-0.19,0.2c-0.06,0.06-0.12,0.12-0.18,0.18c-0.06,0.06-0.12,0.12-0.18,0.17c-0.06,0.06-0.12,0.11-0.19,0.17
	c-0.06,0.06-0.13,0.11-0.19,0.16c-0.06,0.05-0.13,0.11-0.2,0.16c-0.07,0.05-0.13,0.1-0.2,0.15c-0.07,0.05-0.14,0.1-0.2,0.15
	s-0.14,0.1-0.21,0.14c-0.07,0.05-0.14,0.1-0.22,0.14c-0.07,0.05-0.15,0.09-0.22,0.14c-0.07,0.05-0.15,0.09-0.22,0.13
	c-0.07,0.04-0.15,0.08-0.23,0.13c-0.08,0.04-0.15,0.08-0.23,0.12c-0.08,0.04-0.16,0.08-0.23,0.12c-0.08,0.04-0.16,0.07-0.24,0.11
	c-0.08,0.04-0.16,0.07-0.24,0.11c-0.08,0.03-0.16,0.06-0.23,0.1c-0.08,0.03-0.16,0.06-0.24,0.09c-0.08,0.03-0.16,0.06-0.24,0.08
	c-0.08,0.03-0.16,0.05-0.24,0.08c-0.08,0.03-0.16,0.05-0.25,0.07c-0.08,0.02-0.16,0.05-0.25,0.07c-0.08,0.02-0.17,0.04-0.25,0.06
	c-0.08,0.02-0.17,0.04-0.25,0.06c-0.09,0.02-0.18,0.04-0.27,0.05c-0.09,0.02-0.18,0.03-0.27,0.05c-0.09,0.01-0.18,0.03-0.27,0.04
	c-0.09,0.01-0.18,0.02-0.27,0.03s-0.18,0.02-0.28,0.03c-0.09,0.01-0.18,0.01-0.28,0.02c-0.09,0-0.19,0.01-0.28,0.01
	c-0.09,0-0.19,0-0.28,0c-0.09,0-0.18,0-0.26,0c-0.09,0-0.17,0-0.26-0.01c-0.09,0-0.17-0.01-0.26-0.02s-0.17-0.01-0.26-0.02
	c-0.09-0.01-0.17-0.02-0.26-0.03c-0.09-0.01-0.17-0.02-0.25-0.03c-0.08-0.01-0.17-0.03-0.25-0.04s-0.17-0.03-0.25-0.05
	c-0.09-0.02-0.18-0.04-0.27-0.06c-0.09-0.02-0.18-0.04-0.27-0.06c-0.09-0.02-0.18-0.05-0.26-0.07s-0.17-0.05-0.26-0.08
	c-0.09-0.03-0.17-0.05-0.26-0.08c-0.09-0.03-0.17-0.06-0.26-0.09c-0.08-0.03-0.17-0.06-0.25-0.1s-0.17-0.07-0.25-0.1
	c-0.07-0.03-0.15-0.06-0.22-0.1c-0.07-0.03-0.15-0.07-0.22-0.1c-0.07-0.03-0.15-0.07-0.22-0.11c-0.07-0.04-0.14-0.07-0.21-0.11
	s-0.14-0.08-0.21-0.12c-0.07-0.04-0.14-0.08-0.21-0.12c-0.07-0.04-0.14-0.08-0.21-0.13c-0.07-0.04-0.13-0.09-0.2-0.13
	c-0.08-0.05-0.15-0.1-0.22-0.15c-0.07-0.05-0.15-0.1-0.22-0.16c-0.07-0.05-0.15-0.11-0.22-0.16c-0.07-0.06-0.14-0.11-0.21-0.17
	c-0.07-0.06-0.14-0.12-0.21-0.18c-0.07-0.06-0.14-0.12-0.2-0.18c-0.07-0.06-0.13-0.12-0.2-0.18c-0.06-0.06-0.13-0.12-0.19-0.19
	c-0.06-0.06-0.12-0.12-0.17-0.18c-0.06-0.06-0.11-0.12-0.17-0.18c-0.06-0.06-0.11-0.12-0.17-0.19c-0.05-0.06-0.11-0.13-0.16-0.19
	c-0.05-0.06-0.11-0.13-0.16-0.19c-0.05-0.07-0.1-0.13-0.15-0.2c-0.05-0.07-0.1-0.13-0.15-0.2c-0.05-0.07-0.1-0.14-0.14-0.21
	c-0.05-0.07-0.1-0.14-0.14-0.22c-0.05-0.07-0.09-0.15-0.14-0.22c-0.05-0.07-0.09-0.15-0.13-0.22s-0.09-0.15-0.13-0.23
	c-0.04-0.08-0.08-0.15-0.12-0.23c-0.04-0.08-0.08-0.16-0.12-0.24c-0.04-0.08-0.07-0.16-0.11-0.24c-0.04-0.08-0.07-0.16-0.11-0.24
	c-0.07-0.16-0.13-0.32-0.19-0.48s-0.12-0.33-0.17-0.49c-0.05-0.17-0.1-0.33-0.14-0.5c-0.04-0.17-0.08-0.34-0.12-0.51
	c-0.04-0.17-0.07-0.35-0.09-0.52c-0.03-0.18-0.05-0.35-0.07-0.53c-0.02-0.18-0.03-0.36-0.04-0.54c-0.01-0.18-0.01-0.36-0.01-0.55
	c0-0.18,0-0.37,0.01-0.55c0.01-0.18,0.02-0.36,0.04-0.54c0.02-0.18,0.04-0.36,0.07-0.53c0.03-0.18,0.06-0.35,0.09-0.52
	c0.04-0.17,0.07-0.34,0.12-0.51c0.04-0.17,0.09-0.34,0.14-0.5c0.05-0.17,0.11-0.33,0.17-0.49s0.12-0.32,0.19-0.48
	c0.07-0.16,0.14-0.32,0.21-0.47c0.07-0.16,0.15-0.31,0.23-0.46c0.08-0.15,0.17-0.3,0.26-0.45c0.09-0.15,0.18-0.29,0.28-0.43
	c0.1-0.14,0.19-0.28,0.3-0.42c0.1-0.14,0.21-0.27,0.31-0.4c0.11-0.13,0.22-0.26,0.33-0.39c0.11-0.13,0.23-0.25,0.35-0.37
	c0.12-0.12,0.24-0.24,0.37-0.35c0.13-0.11,0.25-0.23,0.39-0.33c0.13-0.11,0.27-0.21,0.4-0.31c0.14-0.1,0.27-0.2,0.42-0.3
	c0.14-0.1,0.29-0.19,0.43-0.28c0.15-0.09,0.29-0.17,0.45-0.26c0.15-0.08,0.3-0.16,0.46-0.23s0.31-0.15,0.47-0.21
	c0.16-0.07,0.32-0.13,0.48-0.19c0.16-0.06,0.33-0.12,0.49-0.17c0.17-0.05,0.33-0.1,0.5-0.14c0.17-0.04,0.34-0.08,0.51-0.12
	c0.17-0.04,0.35-0.07,0.52-0.09s0.35-0.05,0.53-0.07c0.18-0.02,0.36-0.03,0.54-0.04c0.18-0.01,0.36-0.01,0.55-0.01
	c0.18,0,0.37,0,0.55,0.01c0.18,0.01,0.36,0.02,0.54,0.04c0.18,0.02,0.36,0.04,0.53,0.07s0.35,0.06,0.52,0.09
	c0.17,0.04,0.34,0.08,0.51,0.12c0.17,0.04,0.34,0.09,0.5,0.14c0.17,0.05,0.33,0.11,0.49,0.17c0.16,0.06,0.32,0.12,0.48,0.19
	c0.16,0.07,0.32,0.14,0.47,0.21s0.31,0.15,0.46,0.23c0.15,0.08,0.3,0.17,0.45,0.26c0.15,0.09,0.29,0.18,0.43,0.28
	c0.14,0.1,0.28,0.19,0.42,0.3c0.14,0.1,0.27,0.21,0.4,0.31c0.13,0.11,0.26,0.22,0.39,0.33c0.13,0.11,0.25,0.23,0.37,0.35
	c0.12,0.12,0.24,0.24,0.35,0.37c0.11,0.13,0.23,0.25,0.33,0.39c0.11,0.13,0.21,0.27,0.31,0.4c0.1,0.14,0.2,0.27,0.3,0.42
	c0.1,0.14,0.19,0.29,0.28,0.43c0.09,0.15,0.17,0.29,0.26,0.45c0.08,0.15,0.16,0.3,0.23,0.46c0.08,0.15,0.15,0.31,0.21,0.47
	c0.07,0.16,0.13,0.32,0.19,0.48s0.12,0.33,0.17,0.49c0.05,0.17,0.1,0.33,0.14,0.5c0.04,0.17,0.08,0.34,0.12,0.51
	c0.04,0.17,0.07,0.35,0.09,0.52c0.03,0.18,0.05,0.35,0.07,0.53c0.02,0.18,0.03,0.36,0.04,0.54C92.36,33.91,92.37,34.09,92.37,34.28z
	"
      />
    </svg>
  );
};

export default Dot;
