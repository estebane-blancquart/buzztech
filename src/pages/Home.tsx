import Hero from '@/modules/hero/Hero';
import Presentation from '@/modules/presentation/Presentation';
import Video from '@/modules/video/Video';
import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <section className="module">
        <Hero />
      </section>

      <section className="module">
        <Presentation />
      </section>

      <section className="module">
        <Video />
      </section>
    </>
  );
};

export default Home;
