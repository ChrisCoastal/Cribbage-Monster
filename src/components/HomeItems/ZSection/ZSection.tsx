import React, { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useIntersectScroll from 'src/hooks/useIntersectionObserver';
import Card from 'src/components/UI/Card';
import IntersectCard from 'src/components/HomeItems/ZSection/IntersectCard';

import monster1 from 'src/assets/monster-1.jpg';
import monster2 from 'src/assets/monster-2.jpg';
import Button from 'src/components/UI/Button';

// type Props = {};

const ZSection = () => {
  const navigate = useNavigate();

  return (
    <section className="mb-28 flex justify-center">
      <ul className="mx-12 grid max-w-3xl grid-cols-1 gap-24">
        {/* <IntersectCard
          image={hero2}
          title="Show your monster talent"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus earum nihil quam rem
          cupiditate! Aliquam est at ratione nesciunt enim nam quaerat laborum fugiat ullam architecto
          asperiores quod.">
          <Button buttonSize="sm" buttonColor="secondary" handler={() => navigate('/signup')}>
            JOIN
          </Button>
        </IntersectCard> */}
        <IntersectCard
          layout="rl"
          image={monster1}
          title="Build your skills"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus earum nihil quam rem
          cupiditate! Aliquam est at ratione nesciunt enim nam quaerat laborum fugiat ullam architecto
          asperiores quod.">
          <Button buttonSize="md" buttonColor="secondary" handler={() => navigate('/rules')}>
            LEARN TO PLAY
          </Button>
        </IntersectCard>
        <IntersectCard
          image={monster2}
          title="Don't hide under the bed"
          text="Climb the leaderboard and play with friends. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus earum nihil quam rem
          cupiditate! Aliquam est at ratione nesciunt enim nam quaerat laborum fugiat ullam architecto
          asperiores quod.">
          <Button buttonSize="md" buttonColor="secondary" handler={() => navigate('/signup')}>
            PLAY NOW
          </Button>
        </IntersectCard>
      </ul>
    </section>
  );
};

export default ZSection;
