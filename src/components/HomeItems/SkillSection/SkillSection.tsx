import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs';

import { PlayerPos } from 'src/@types';
import Player from 'src/components/Player/Player';
import MessageTail from 'src/components/UI/icons/MessageTail/MessageTail';
import PlayButton from 'src/components/UI/PlayButton';
import Teeth from 'src/components/UI/icons/Teeth/Teeth';
import useScrollY from 'src/hooks/useScrollY';
import { AvatarSize } from 'src/@types';
import Avatar from 'src/components/Avatar/Avatar';

import useMediaQuery from 'src/hooks/useMediaQuery';
import { MEDIA_SIZE } from 'src/utils/constants';
import useIntersectionObserver from 'src/hooks/useIntersectionObserver';

import downArrow1 from 'src/assets/arrow-down-1-dark.svg';

const messages = [
  '👋',
  "Hey! Let's play a game!",
  "Ha, you think you're scary?! I'm not scared of you!",
  'Are you worth my time? Not sure you got the 🧠s...',
  'Who needs teeth anyway...'
];

const SkillSection = () => {
  const scrollY = useScrollY();
  const [teethPos, setTeethPos] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sectionTop = containerRef.current?.offsetTop;

  const [message, setMessage] = useState<{ text: string; index: number }>({
    text: 'Mmmmlergh ... 👁',
    index: 0
  });

  const avatarRef = useRef<HTMLDivElement>(null);
  const isIntersect = useIntersectionObserver(containerRef, { threshold: 1 });
  const animate = isIntersect ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-12';
  console.log(isIntersect);
  // const windowWidth = window.innerWidth;

  useEffect(() => {
    if (!containerRef.current) return;
    const teethPos = 40 - Math.min(40, Math.abs(containerRef.current?.offsetTop));
    console.log(scrollY.pos - containerRef.current?.offsetTop);

    setTeethPos(teethPos);
  }, [scrollY.pos]);

  useEffect(() => {
    if (!isIntersect) return;
    // if (!message.text.length)
    //   setMessage((prev) => ({
    //     text: messages[prev.index],
    //     index: prev.index + 1 < messages.length ? prev.index + 1 : 0
    //   }));
    const tick = !message.text.length ? 500 : 2000 + Math.random() * 3000;
    const interval = setInterval(() => {
      anime({
        targets: '.animate-message',
        // scale: [0, 1.05, 1],
        scale: [
          { value: 0, duration: 0 },
          { value: 1.05, duration: 200 },
          { value: 1, duration: 200 }
        ],
        translateX: [-8, 0],
        translateY: [8, 0],
        // duration: 600,
        easing: 'spring(0.5, 100, 10, 0)'
      });
      setMessage((prev) => ({
        text: messages[prev.index],
        index: prev.index + 1 < messages.length ? prev.index + 1 : 0
      }));
    }, tick);

    return () => clearInterval(interval);
  }, [isIntersect, message.text]);

  // useEffect(() => {
  //   anime({
  //     targets: '.animate-message',
  //     scale: [0, 1.05, 1],
  //     translateX: [-8, 0],
  //     translateY: [8, 0],
  //     duration: 600,
  //     easing: 'spring(0.5, 100, 10, 0)'
  //   });
  // }, [message]);

  return (
    <div
      ref={containerRef}
      className="relative mb-56 bg-emerald-300 bg-gradient-to-br from-emerald-300 to-emerald-400 py-28 ">
      {/* <Teeth className="absolute" style={{ top: -80 }} /> */}
      {/* <Teeth className="absolute -bottom-36 rotate-180" /> */}
      <div className="mx-8 flex flex-col items-center text-center">
        <h3 className="text-5xl font-bold text-stone-900 sm:text-6xl lg:text-7xl">
          Sharp teeth not required.
        </h3>
        <div className="mt-6 flex w-48 -translate-y-4 rotate-2 items-baseline sm:w-auto sm:pl-[40%]">
          <img src={downArrow1} className="rotate-180 stroke-stone-900" />
          <h4 className="-translate-y-2 font-annie text-3xl font-bold">but they are recommended</h4>
        </div>
        <div className="mx-8 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
          <div className="rounded-md p-4 text-left text-stone-900">
            <p className="w-60 text-xl font-medium">
              Find opponents to fit your skill level and improve your card play with post game
              analysis.
            </p>
          </div>
          {/* <div className="rounded-md p-4 text-stone-900">
            <p className="w-48 text-xl font-medium">
              Find an opponent to fit your skill level and improve your play with post game analysis
              and strategy.
            </p>
          </div>
          <div className="rounded-md p-4 text-stone-900">
            <p className="w-48 text-xl font-medium">
              Find an opponent to fit your skill level and improve your play with post game analysis
              and strategy.
            </p>
          </div> */}
          {/* <div className={`${animate} transition-all duration-700`}> */}
          <div
            className={`border-1 rounded-lg border-stone-900 bg-stone-800 p-4 text-left shadow-xl`}>
            <div ref={avatarRef} className="flex w-[80vw] gap-4 py-2 pl-10 pr-4 sm:py-2">
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
      {/* <div className="mx-auto flex items-center justify-center gap-4">
        <div className="inline-grid w-56 grid-cols-5 grid-rows-1">
          <Avatar
            className={`${AvatarSize.LG} col-span-2 col-start-1 row-start-1 border border-purple-500/60`}
            avatar="🦁"
          />
          <Avatar
            className={`${AvatarSize.LG} col-span-2 col-start-2 row-start-1 border border-purple-500/60`}
            avatar="🦑"
          />
          <Avatar
            className={`${AvatarSize.LG} col-span-2 col-start-3 row-start-1 border border-purple-500/60`}
            avatar="🧙‍♂️"
          />
          <Avatar
            className={`${AvatarSize.LG} col-span-2 col-start-4 row-start-1 border border-purple-500/60`}
            avatar="👩‍🎤"
          />
        </div>
        <h3 className="w-80 text-2xl font-semibold text-stone-900 sm:text-4xl">
          Play thousands of users online now.
        </h3>
      </div> */}
    </div>
  );
};

export default SkillSection;
