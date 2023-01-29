import React, { FC, useRef } from 'react';
import Badge from 'src/components/Badge/Badge';
import Card from 'src/components/UI/Card';

import useMediaQuery from 'src/hooks/useMediaQuery';
import { MEDIA_SIZE } from 'src/utils/constants';
import useIntersectionObserver from 'src/hooks/useIntersectionObserver';

type IntersectCardProps = {
  image: string;
  title: string;
  text: string;
  layout?: 'lr' | 'rl';
  children?: React.ReactNode;
};

const IntersectCard: FC<IntersectCardProps> = ({ image, title, text, layout = 'lr', children }) => {
  const cardRef = useRef<HTMLLIElement>(null);

  const minMediaSm = useMediaQuery(MEDIA_SIZE.sm);

  const isIntersect = useIntersectionObserver(cardRef, { threshold: 0.3 });
  const animate = isIntersect ? 'opacity-1 translate-y-0' : 'opacity-0 translate-y-12';
  const desktopDirection = layout === 'lr' ? 'flex-row' : 'flex-row-reverse';
  const direction = !minMediaSm ? 'flex-col' : desktopDirection;

  return (
    <>
      <li
        ref={cardRef}
        className={`${animate} ${direction} flex gap-6 transition-all duration-1000 sm:gap-10`}>
        <div className="relative aspect-square overflow-hidden rounded-md sm:w-[50%]">
          <img src={image} alt="card" />
        </div>

        <div className="flex flex-col justify-around gap-4 text-stone-50 sm:w-[50%]">
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="font-medium">{text}</p>
          <div className="mt-8">{children}</div>
        </div>
      </li>
    </>
  );
};

export default IntersectCard;
