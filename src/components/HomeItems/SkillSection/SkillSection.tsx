import React, { useEffect, useState, useRef } from 'react';
import Teeth from 'src/components/UI/icons/Teeth/Teeth';
import useScrollY from 'src/hooks/useScrollY';
import { AvatarSize } from 'src/@types';
import Avatar from 'src/components/Avatar/Avatar';

const SkillSection = () => {
  const scrollY = useScrollY();
  const [teethPos, setTeethPos] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sectionTop = containerRef.current?.offsetTop;
  console.log(teethPos);

  // const windowWidth = window.innerWidth;

  useEffect(() => {
    if (!containerRef.current) return;
    const teethPos = 40 - Math.min(40, Math.abs(containerRef.current?.offsetTop));
    console.log(scrollY.pos - containerRef.current?.offsetTop);

    setTeethPos(teethPos);
  }, [scrollY.pos]);

  return (
    <div
      ref={containerRef}
      className="relative my-48 bg-emerald-300 bg-gradient-to-br from-emerald-300 to-emerald-400 py-36">
      {/* <Teeth className="absolute" style={{ top: -80 }} /> */}
      {/* <Teeth className="absolute -bottom-36 rotate-180" /> */}
      <div className="flex flex-col items-center">
        <h3 className="text-5xl font-bold text-stone-900 sm:text-6xl lg:text-7xl">
          Sharp teeth not required.
        </h3>
        <p className="w-1/4 text-xl">
          Find an opponent to fit your skill level and improve your play with post game analysis and
          strategy.
        </p>
      </div>
      <div className="mx-auto flex items-center justify-center gap-4">
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
        <h3 className="w-56 text-2xl font-semibold text-emerald-600 sm:w-64 sm:text-4xl">
          Play thousands of users online
        </h3>
      </div>
    </div>
  );
};

export default SkillSection;
