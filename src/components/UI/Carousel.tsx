import React, { FC, useState } from 'react';

import { useInterval } from 'src/hooks/useInterval';

type CarouselProps = {
  customStyles?: string;
  auto?: null | number;
};

const Carousel: FC<CarouselProps> = ({ customStyles, auto = 5000 }) => {
  // const [carouselIndex, setCarouselIndex] = useState<{ prev: number; cur: number; next: number }>({
  //   prev: 2,
  //   cur: 0,
  //   next: 1
  // });
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  useInterval(() => incrementCarousel(), auto);
  const carouselPos = ['left-[0%]', 'left-[-100%]', 'left-[-200%]', 'left-[-300%]', 'left-[-400%]'];

  const placeHolder = [
    <div key={0} className="h-32 w-96 bg-red-500 text-center"></div>,
    <div key={1} className="h-32 w-96 bg-emerald-500 text-center"></div>,
    <div key={2} className="h-32 w-96 bg-pink-500 text-center"></div>
  ];

  const slides = placeHolder.map((item, i) => {
    return <li key={i}>{item}</li>;
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
            selected && 'bg-stone-700'
          } h-2 w-2 rounded-full opacity-50 outline outline-1 outline-stone-700`}></button>
      );
    }
    return buttons;
  }

  const buttons = renderCarouselButtons();

  return (
    <div className={`${customStyles} relative overflow-hidden rounded-md`}>
      <ul
        className={`absolute ${carouselPos[carouselIndex]} top-0 flex h-full w-full transition-all duration-700 ease-out`}>
        {slides}
      </ul>
      <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-4">{buttons}</div>
    </div>
  );
};

export default Carousel;
