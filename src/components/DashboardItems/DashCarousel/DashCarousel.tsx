import React, { FC, useState } from 'react';

import { useInterval } from 'src/hooks/useInterval';
import carouselImg1 from 'src/assets/carousel/carousel-1.jpg';
import carouselImg2 from 'src/assets/carousel/carousel-2.jpg';
import carouselImg3 from 'src/assets/carousel/carousel-3.jpg';
import carouselImgMobile1 from 'src/assets/carousel/carousel-1-mobile.jpg';
import carouselImgMobile2 from 'src/assets/carousel/carousel-2-mobile.jpg';
import carouselImgMobile3 from 'src/assets/carousel/carousel-3-mobile.jpg';
import Heading from 'src/components/UI/Heading';
import Button from 'src/components/UI/Button';

type DashCarouselProps = {
  className?: string;
  auto?: null | number;
};

const DashCarousel: FC<DashCarouselProps> = ({ className, auto = 10000 }) => {
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  useInterval(() => incrementCarousel(), auto);
  const carouselPos = ['left-[0%]', 'left-[-100%]', 'left-[-200%]', 'left-[-300%]', 'left-[-400%]'];

  const slides = [
    { mobile: carouselImgMobile1, lg: carouselImg1 },
    { mobile: carouselImgMobile2, lg: carouselImg2 },
    { mobile: carouselImgMobile3, lg: carouselImg3 }
  ];

  const renderSlides = slides.map((slide, i) => {
    const animateTitle = i === carouselIndex ? 'animate-fade-up-delay-sm' : '';
    const animateText = i === carouselIndex ? 'animate-fade-up-delay-md' : '';
    return (
      <li key={i} className={`relative w-full`}>
        <Heading className={`absolute left-6 top-10 z-10 opacity-0 lg:left-10 ${animateTitle}`}>
          Big Prizes!
        </Heading>
        <p
          className={`absolute left-6 top-[40%] z-10 w-[90%] text-2xl font-medium text-stone-50 opacity-0 sm:text-3xl lg:left-10 lg:text-4xl ${animateText}`}>
          Join the cribbage tournament league and compete for prizes and prestige!
        </p>
        <Button className="absolute left-6 bottom-[2rem] lg:left-10" buttonSize="md">
          Register Now
        </Button>
        <picture>
          <source srcSet={slide.lg} type="image/webp" media="@media screen and (min-width: 900px" />
          <img src={slide.lg} className="h-full w-full object-cover"></img>
        </picture>
      </li>
    );
  });

  const lastSlide = slides.length - 1;

  function incrementCarousel() {
    setCarouselIndex((index) => (index < lastSlide ? index + 1 : 0));
  }

  function carouselButtonHandler(buttonIndex: number) {
    setCarouselIndex(buttonIndex);
  }

  function renderCarouselButtons() {
    const buttons = [];
    for (let i = 0; i < slides.length; i++) {
      const selected = i === carouselIndex;
      buttons.push(
        <button
          key={i}
          onClick={() => carouselButtonHandler(i)}
          className={`${
            selected && 'bg-stone-200/60'
          } h-2 w-2 rounded-full outline outline-1 outline-stone-200/60`}></button>
      );
    }
    return buttons;
  }

  const buttons = renderCarouselButtons();

  return (
    <div className={`${className} relative h-full w-full overflow-hidden rounded-md`}>
      <ul
        className={`${carouselPos[carouselIndex]} relative flex h-full w-[300%] transition-all duration-700 ease-out `}>
        {renderSlides}
      </ul>
      <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-4">{buttons}</div>
    </div>
  );
};

export default DashCarousel;
