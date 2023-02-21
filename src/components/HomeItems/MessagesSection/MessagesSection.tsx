import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlayerPos } from 'src/@types';
import Player from 'src/components/Player/Player';
import MessageTail from 'src/components/UI/icons/MessageTail/MessageTail';
import Button from 'src/components/UI/Button';
// import line from 'src/assets/line.svg';
import downArrow1 from 'src/assets/arrow-down-1-green.svg';

import useMediaQuery from 'src/hooks/useMediaQuery';
import { MEDIA_SIZE } from 'src/utils/constants';
import useIntersectionObserver from 'src/hooks/useIntersectionObserver';
import PlayButton from 'src/components/UI/PlayButton';

const MessagesSection = () => {
  const [message, setMessage] = useState<string>('Hey');

  const navigate = useNavigate();
  const avatarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isIntersectAvatar = useIntersectionObserver(avatarRef, { threshold: 0.3 });
  const animateAvatar = isIntersectAvatar ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-12';
  const animateText = isIntersectAvatar
    ? 'opacity-1 translate-y-0 -rotate-3'
    : 'opacity-0 translate-y-12 rotate-[20deg]';

  const line = (
    <svg
      className="absolute top-1/2 w-full scale-[105%] lg:scale-[120%]"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="240px"
      height="20px"
      viewBox="0 0 240 20"
      enableBackground="new 0 0 240 20">
      <path
        fill="none"
        stroke="#6CC4A9"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeMiterlimit="10"
        style={{
          strokeDasharray: '300',
          strokeDashoffset: '300',
          animation: isIntersectAvatar ? 'draw-path 1s ease-out 0.4s forwards' : ''
        }}
        d="M3.17,17.24
    c1.8-0.21,4.29-1.12,6.44-1.36c8.36-0.93,16.94-0.78,25.36-0.63c6.4,0.11,12.16-0.34,18.47-1.02c3.75-0.4,7.46,0.23,11.19,0.13
    c3.62-0.09,7.2-0.89,10.69-1.58c6.52-1.29,13.15-2.54,19.85-3.16c14.52-1.34,28.81,0.06,43.38-0.05c9.23-0.06,18.41-0.61,27.37-2.37
    c3.5-0.69,7.1-1.79,10.71-2.12c1.48-0.14,3.02,0.03,4.51-0.04c7.22-0.34,14.29-1.94,21.51-2.22c4.93-0.19,10.25,0.18,15.16,0.6
    c4.63,0.39,9.07,1.49,13.66,1.97c1.1,0.11,3.51,0.22,4.04,0.42"
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center pb-36 pt-48">
      <h3 className="mb-4 w-72 text-center text-5xl font-bold text-stone-50 sm:text-6xl md:w-auto lg:text-7xl">
        <span ref={textRef} className="relative inline-block">
          Nothing
          <div
            className={`${animateText} absolute -top-14 left-12 flex w-48 gap-1 text-right font-annie text-2xl leading-tight tracking-wider text-stone-50 transition-all delay-700 duration-500 lg:left-16 lg:w-auto`}>
            <img src={downArrow1} width="72px" className="scale-x-[-1] lg:translate-y-1" />
            <h3
              className={`whitespace-nowrap font-annie text-3xl text-emerald-300`}
              style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}>
              Almost nothing
            </h3>
          </div>
          {line}
          {/* <img src={line} alt="line" className="absolute top-1/2 w-full scale-105" /> */}
        </span>{' '}
        to be afraid of.
      </h3>
      <div className={`transition-all delay-700 duration-700`}>
        <div ref={avatarRef} className="flex w-[376px] gap-4 py-2 pl-10 pr-4 sm:py-2">
          <Player
            playerPos={PlayerPos.P_ONE}
            isDealer={false}
            displayName={'A. Monster'}
            avatar={'🧟‍♀️'}
            isActive={false}
          />
          <div className="flex-shrink">
            <ul className="mt-1 flex max-h-20 flex-col-reverse gap-1 sm:max-h-[6.5rem]">
              {message && (
                <li className="relative inline-block origin-bottom-left rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 py-0.5 px-2 text-sm text-stone-800">
                  {/* {message} */}

                  <p>Okay, can we play cards now?</p>
                  <MessageTail height="36" width="36" className="absolute left-0" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-16 flex flex-col justify-between gap-4 sm:max-w-4xl sm:flex-row">
        <div className="flex-1 rounded-lg bg-stone-800 p-6 text-stone-50">
          <p className="">
            You&apos;re not alone and that is a good thing! Get monster in game advice and pointers.
            <PlayButton />
          </p>
        </div>
        <div className="flex-1 rounded-lg bg-stone-800 p-6 text-stone-50">
          <p className="">
            Joining Cribbage Monster is free and gives automatic access to all stat tracking and
            game history.
          </p>
          <PlayButton buttonText="JOIN" />
        </div>
        <div className="flex-1 rounded-lg bg-stone-800 p-6 text-stone-50">
          <p className="">
            Still feeling nervous? Check out the how to play guide and build up your confidence.
          </p>
          <Button buttonSize="md" buttonColor="secondary" handler={() => navigate('/rules')}>
            LEARN TO PLAY
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessagesSection;
