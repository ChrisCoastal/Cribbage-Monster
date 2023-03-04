import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs';

import { PlayerPos } from 'src/@types';

import Player from 'src/components/Player/Player';
import MessageTail from 'src/components/UI/icons/MessageTail/MessageTail';

import useIntersectionObserver from 'src/hooks/useIntersectionObserver';

import downArrow1 from 'src/assets/arrows/arrow-down-1-dark.svg';

const SkillSection = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<{ text: JSX.Element; index: number }>({
    text: <p>Mmmmlergh ... 👁</p>,
    index: 0
  });
  const messages = [
    <p key={0}>👋</p>,
    <p key={1}>Hey! Let&apos;s play a game!</p>,
    <p key={2}>Ha, you think you&apos;re scary?! I&apos;m not scared of you!</p>,
    <p key={3}>
      Are you worth my time? Not sure you got the <span className="text-2xs md:text-sm">🧠</span>
      ...
    </p>,
    <p key={4}>Who needs teeth anyway...</p>
  ];

  const avatarRef = useRef<HTMLDivElement>(null);
  const isIntersect = useIntersectionObserver(containerRef);

  useEffect(() => {
    if (!isIntersect) return;
    const interval = setInterval(() => {
      anime({
        targets: '.animate-message',
        scale: [
          { value: 0, duration: 0 },
          { value: 1.05, duration: 200 },
          { value: 1, duration: 200 }
        ],
        translateX: [-8, 0],
        translateY: [8, 0],
        easing: 'spring(0.5, 100, 10, 0)'
      });
      setMessage((prev) => ({
        text: messages[prev.index],
        index: prev.index + 1 < messages.length ? prev.index + 1 : 0
      }));
    }, 3600 * message.index);

    return () => clearInterval(interval);
  }, [isIntersect, message.text, message.index]);

  return (
    <div
      ref={containerRef}
      className="relative bg-emerald-300 bg-gradient-to-br from-emerald-300 to-emerald-400 py-36">
      <div className="mx-8 flex flex-col items-center text-center">
        <h3 className="text-5xl font-bold text-stone-900 sm:text-6xl lg:text-7xl">
          Sharp teeth not required.
        </h3>
        <div className="mt-3 flex w-48 -translate-y-4 rotate-2 items-baseline sm:w-auto sm:pl-[40%]">
          <img src={downArrow1} className="rotate-180 stroke-stone-900" />
          <h4 className="-translate-y-2 font-annie text-3xl font-bold">but are recommended</h4>
        </div>
        <div className="mx-8 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
          <div className="rounded-md p-4 text-left text-stone-900">
            <p className="w-60 text-xl font-medium">
              Find opponents to fit your skill level and improve your card play with post game
              analysis.
            </p>
          </div>
          <div
            className={`border-1 rounded-lg border-stone-900 bg-stone-800 p-4 text-left shadow-xl`}>
            <div ref={avatarRef} className="flex w-[350px] gap-4 py-2 pl-10 pr-4 sm:w-[374px]">
              <Player
                playerPos={PlayerPos.P_ONE}
                isDealer={false}
                displayName={'A. Monster'}
                avatar={'🧟‍♀️'}
                isActive={true}
              />
              <div className="flex-shrink">
                <ul className="mt-1 flex max-h-20 flex-col gap-1 sm:max-h-[6.5rem]">
                  {message.text && (
                    <li className="animate-message relative inline-block origin-bottom-left rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 py-0.5 px-2 text-sm text-stone-800">
                      {message.text}
                      <MessageTail height="36" width="36" className="absolute left-0" />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSection;
