import React from 'react';

// Components
import ClassicSection from 'src/components/HomeItems/ClassicSection/ClassicSection';
import Footer from 'src/components/Footer/Footer';
import Hero from 'src/components/Hero/Hero';
import MessagesSection from 'src/components/HomeItems/MessagesSection/MessagesSection';
import ProgressSection from 'src/components/HomeItems/ProgressSection/ProgressSection';
import SkillSection from 'src/components/HomeItems/SkillSection/SkillSection';

const HomePage = () => {
  return (
    <div className="bg-stone-900">
      <Hero />
      <ClassicSection />
      <SkillSection />
      <ProgressSection />
      <MessagesSection />
      <Footer />
    </div>
  );
};

export default HomePage;
