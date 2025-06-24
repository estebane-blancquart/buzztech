import React from 'react';
import Why, { WhyPage } from '@/ui/modules/service-why/Why';
import What from '@/ui/modules/service-what/What';
import Prices from '@/ui/modules/service-prices/Prices';
import { creationWebData } from '@/core/data';
import How from '@/ui/modules/service-how/How';

const CreationWeb: React.FC = () => {
  return (
    <>
      <section className="module">
        <What
          badge={creationWebData.what.badge}
          title={creationWebData.what.title}
          subtitle={creationWebData.what.subtitle}
        />
      </section>

      <section className="module">
        <Why title="Création Web">
          {creationWebData.why.map((whyItem, index) => (
            <WhyPage
              key={index}
              title={whyItem.title}
              icon={whyItem.icon}
              landingDescription={whyItem.landingDescription}
              points={whyItem.points}
            />
          ))}
        </Why>
      </section>

      <section className="module">
        <How steps={creationWebData.steps} />
      </section>

      <section className="module">
        <Prices cards={creationWebData.prices} />
      </section>
    </>
  );
};

export default CreationWeb;