import React, { useState } from 'react';

const Carousel = () => {
  const [carouselIndex, setCarouselIndex] = useState<string>('');

  const carouselPos = ['left-[0%]', 'left-[-100%]', 'left-[-200%]', 'left-[-300%]'];

  const placeHolder = [
    <div key={1} className="h-32 w-48 bg-red-500 text-center">
      One
    </div>,
    <div key={2} className="h-32 w-48 bg-emerald-500 text-center">
      Two
    </div>,
    <div key={3} className="h-32 w-48 bg-pink-500 text-center">
      Three
    </div>
  ];

  const carouselContent = placeHolder.map((item, i) => (
    <li key={i} className="">
      {item}
    </li>
  ));

  function carouselButtonHandler(buttonIndex: number) {
    setCarouselIndex(carouselPos[buttonIndex]);
  }

  function renderCarouselButtons() {
    const buttons = [];
    for (let i = 0; i < carouselContent.length; i++) {
      buttons.push(
        <button
          onClick={() => carouselButtonHandler(i)}
          className="h-2 w-2 rounded-full outline outline-2 outline-black"></button>
      );
    }
    return buttons;
  }

  const buttons = renderCarouselButtons();

  return (
    <div className="relative h-32 w-48 overflow-hidden">
      <ul
        className={`absolute top-0 ${carouselIndex} flex h-full w-full transition-all duration-500 ease-in-out`}>
        {carouselContent}
      </ul>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-4">{buttons}</div>
    </div>
  );
};

export default Carousel;
