import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { PlayerPos } from 'src/@types';

import MessageTail from 'src/components/UI/icons/MessageTail/MessageTail';
import Player from 'src/components/Player/Player';
import PlayButton from 'src/components/UI/PlayButton';

import useIntersectionObserver from 'src/hooks/useIntersectionObserver';

import downArrow1 from 'src/assets/arrow-down-1-green.svg';

const MessagesSection = () => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isIntersectAvatar = useIntersectionObserver(avatarRef);
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
        strokeWidth="4"
        strokeLinecap="round"
        strokeMiterlimit="10"
        className="animate-draw-path"
        style={{
          strokeDasharray: '240',
          strokeDashoffset: '240'
          // animation: 'draw-path 0.6s ease-out 0.4s forwards'
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
      <h3 className="mb-8 w-72 text-center text-5xl font-bold text-stone-50 sm:text-6xl md:w-auto lg:text-7xl">
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
          {isIntersectAvatar ? line : null}
        </span>{' '}
        to be afraid of.
      </h3>
      <div className={`mb-8 transition-all delay-700 duration-700`}>
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
              <li className="relative inline-block origin-bottom-left rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 py-0.5 px-2 text-sm text-stone-800">
                <p>Okay, can we play cards now?</p>
                <MessageTail height="36" width="36" className="absolute left-0" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-16 flex flex-col justify-between gap-12 sm:flex-row ">
        <div className="flex max-w-[18rem] flex-col justify-between gap-8 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50">
          <h4 className="text-2xl font-bold text-emerald-300">Not yet...</h4>
          <p className="text-sm">
            Still a little scared? Don&apos;t be! Check out the how to play guide and build up your
            confidence.
          </p>
          <Link
            to={'/rules'}
            className={`cursor-pointer self-center rounded-md bg-black bg-gradient-to-br from-emerald-300/90 to-emerald-500/90 py-2 px-6 text-center text-xl font-bold tracking-wider text-stone-50 transition-all duration-300 hover:bg-slate-100 hover:shadow-md`}>
            LEARN
          </Link>
        </div>
        <div className="flex max-w-[18rem] flex-col justify-between gap-8 rounded-lg border border-stone-50/60 bg-stone-800 p-8 text-stone-50">
          <h4 className="text-2xl font-bold text-emerald-300">Let&apos;s Go!</h4>
          <p className="text-sm">
            Joining Cribbage Monster is free! Play online and improve your game now.
          </p>
          <PlayButton buttonText="JOIN" className="self-center" />
        </div>
      </div>
    </div>
  );
};

export default MessagesSection;
