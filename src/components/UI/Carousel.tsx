import React, { FC, useState } from 'react';

import { useInterval } from 'src/hooks/useInterval';
import carouselImg1 from 'src/assets/carousel-1.jpg';
import carouselImg2 from 'src/assets/carousel-2.jpg';
import carouselImg3 from 'src/assets/carousel-3.jpg';
import Heading from './Heading';
import Button from './Button';

type CarouselProps = {
  customStyles?: string;
  auto?: null | number;
};

const Carousel: FC<CarouselProps> = ({ customStyles, auto = 10000 }) => {
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  useInterval(() => incrementCarousel(), auto);
  const carouselPos = ['left-[0%]', 'left-[-100%]', 'left-[-200%]', 'left-[-300%]', 'left-[-400%]'];
  const slidePos = [
    'right-[0%]',
    'right-[-100%]',
    'right-[-200%]',
    'right-[-300%]',
    'right-[-400%]'
  ];

  const slides = [carouselImg1, carouselImg2, carouselImg3];
  // const slides = [
  //   <li key={0} className={`absolute w-full`}>
  //     <p className="absolute left-10 top-10 z-10 animate-fade-up-in">bob</p>
  //     <img src={carouselImg1}></img>
  //   </li>,
  //   <li key={1} className={`absolute right-[-100%] w-full`}>
  //     <p className="absolute left-10 top-10 z-10">bob</p>
  //     <img src={carouselImg2}></img>
  //   </li>,
  //   <li key={2} className={`absolute right-[-200%] w-full`}>
  //     <p className="absolute left-10 top-10 z-10">hey</p>
  //     <img src={carouselImg3}></img>
  //   </li>
  // ];

  const renderSlides = slides.map((slide, i) => {
    const animateTitle = i === carouselIndex ? 'animate-fade-up-delay-sm' : '';
    const animateText = i === carouselIndex ? 'animate-fade-up-delay-md' : '';
    return (
      <li key={i} className={`absolute w-full ${slidePos[i]}`}>
        <Heading customStyles={`absolute left-10 top-10 z-10 opacity-0 text-3xl ${animateTitle}`}>
          $250K Prize
        </Heading>
        <p className={`absolute left-10 top-[14rem] z-10 opacity-0 ${animateText}`}>play</p>
        <Button customStyles="absolute left-10 top-[26rem]" buttonSize="md">
          Register Now
        </Button>
        <img src={slide}></img>
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
    <div className={`${customStyles} relative col-span-2 h-full w-full overflow-hidden rounded-md`}>
      <ul
        className={`${carouselPos[carouselIndex]} relative top-0 bottom-0 flex transition-all duration-700 ease-out`}>
        {renderSlides}
      </ul>
      <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-4">{buttons}</div>
    </div>
  );
};

export default Carousel;
