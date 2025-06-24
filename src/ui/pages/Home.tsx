import React from 'react';
import Hero from '@/ui/modules/home-hero/Hero';
import Presentation from '@/ui/modules/home-presentation/Presentation';
import { homeData } from '@/core/data';
import Video from '@/ui/modules/home-video/Video';

const Home: React.FC = () => {
  return (
    <>
      <section className="module">
        <Hero 
          title={homeData.hero.title}
          subtitle={homeData.hero.subtitle}
          ctaText={homeData.hero.ctaText}
          stats={homeData.hero.stats}
        />
      </section>

      <section className="module">
        <Presentation 
          title={homeData.presentation.title}
          subtitle={homeData.presentation.subtitle}
          services={homeData.presentation.services}
        />
      </section>


      <section className="module">
        <Video />
      </section>
    </>
  );
};

export default Home;