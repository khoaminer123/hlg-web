
import React from 'react';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import Banner from '../components/Banner';
import Features from '../components/Features';
import Honors from '../components/Honors';
import News from '../components/News';
import Gallery from '../components/Gallery';

const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Intro />
      <Banner />
      <Features />
      <News />
      <Honors />
      <Gallery />
    </div>
  );
};

export default Home;
