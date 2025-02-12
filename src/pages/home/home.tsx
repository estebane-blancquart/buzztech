import Hero from '../../modules/hero/Hero';
import Presentation from '../../modules/presentation/Presentation';


function Home() {
  return (
    <>
      <Hero />
      <Presentation />
      <section>
        <iframe src="https://player.vimeo.com/video/1054567107?h=57aff06028&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" title="[TEASER] BuzzTech - Services Informatiques"></iframe>
      </section>
    </>
  );
}

export default Home;