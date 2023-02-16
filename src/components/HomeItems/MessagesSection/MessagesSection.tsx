import React, { useState, useRef } from 'react';
import { PlayerPos } from 'src/@types';
import Player from 'src/components/Player/Player';
import MessageTail from 'src/components/UI/icons/MessageTail/MessageTail';
import Button from 'src/components/UI/Button';

import useMediaQuery from 'src/hooks/useMediaQuery';
import { MEDIA_SIZE } from 'src/utils/constants';
import useIntersectionObserver from 'src/hooks/useIntersectionObserver';
import PlayButton from 'src/components/UI/PlayButton';

const MessagesSection = () => {
  const [message, setMessage] = useState<string>('Hey');

  const avatarRef = useRef<HTMLDivElement>(null);
  const isIntersect = useIntersectionObserver(avatarRef, { threshold: 0.3 });
  const animate = isIntersect ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-12';

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-4xl font-bold text-stone-50 sm:text-6xl lg:text-7xl">
        Nothing to be afraid of.
      </h3>
      <p className="text-stone-50">
        You&apos;re not alone and that is a good thing! Get monster in game advice and pointers.
      </p>
      <div className={`${animate} transition-all duration-700`}>
        <div ref={avatarRef} className="flex w-[376px] gap-4 py-2 pl-10 pr-4 sm:py-2">
          <Player
            playerPos={PlayerPos.P_ONE}
            isDealer={false}
            displayName={'Monster'}
            avatar={'🧟‍♀️'}
            isActive={false}
          />
          <div className="flex-shrink">
            <ul className="mt-1 flex max-h-20 flex-col-reverse gap-1 sm:max-h-[6.5rem]">
              {message && (
                <li className="animate-message relative inline-block origin-bottom-left rounded-md bg-gradient-to-br from-emerald-300 to-emerald-500 py-0.5 px-2 text-sm text-stone-800">
                  {/* {message} */}

                  <p>Hey! Let&apos;s play a game!</p>
                  <MessageTail height="36" width="36" className="absolute left-0" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <PlayButton />
    </div>
  );
};

export default MessagesSection;
