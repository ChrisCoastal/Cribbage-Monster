import React from 'react';
import HeroText from 'src/components/HeroText/HeroText';
import PlayButton from 'src/components/UI/PlayButton';

const Hero = () => {
  return (
    <div className="relative mb-28 flex h-screen max-h-[50rem] w-full flex-col justify-center overflow-hidden bg-cardbacks object-scale-down">
      <div className="pointer-events-none absolute h-full w-full bg-gradient-to-br from-stone-900/20 to-stone-900/90"></div>
      <section className="relative z-10 mx-[10%] flex flex-col gap-20 sm:mx-24 sm:gap-28 lg:mx-20 lg:flex-row lg:justify-center">
        <div className="h-[120px] w-[324px] lg:h-[200px] lg:w-[540px]">
          <HeroText
            height="200"
            width="540"
            color="rgb(231 229 228)"
            className={`-translate-x-20 scale-[.6] sm:-translate-x-9 sm:scale-90 lg:scale-100`}
            aria-role="h1"
            aria-label="Are you a Monster?"
          />
        </div>
        <PlayButton className="self-start justify-self-center lg:self-end" />
      </section>
    </div>
  );
};

export default Hero;
