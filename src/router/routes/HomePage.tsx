import React from 'react';
import { useNavigate } from 'react-router-dom';

// State
import useAuthContext from 'src/hooks/useAuthContext';

// Components

import Hero from 'src/components/Hero/Hero';
import HeroText from 'src/components/HeroText/HeroText';
import Button from 'src/components/UI/Button';
import PlayButton from 'src/components/UI/PlayButton';

import ZSection from 'src/components/HomeItems/ZSection/ZSection';
import Footer from 'src/components/Footer/Footer';
import SkillSection from 'src/components/HomeItems/SkillSection/SkillSection';
import MessagesSection from 'src/components/HomeItems/MessagesSection/MessagesSection';
import ProgressSection from 'src/components/HomeItems/ProgressSection/ProgressSection';

const HomePage = () => {
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();

  const playHandler = () => {
    if (userAuth?.uid) navigate(`/dashboard/${userAuth?.uid}`);
    if (!userAuth?.uid) navigate(`/login`);
  };

  return (
    <div className="bg-stone-900">
      <Hero />
      <SkillSection />
      {/* <ZSection /> */}
      <ProgressSection />
      <MessagesSection />
      <Footer />
    </div>
  );
};

export default HomePage;
