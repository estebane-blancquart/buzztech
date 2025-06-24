import React from 'react';
import Why, { WhyPage } from '@/ui/modules/service-why/Why';
import What from '@/ui/modules/service-what/What';
import Prices from '@/ui/modules/service-prices/Prices';
import { depannageData } from '@/core/data';
import How from '@/ui/modules/service-how/How';

const Depannage: React.FC = () => {
  return (
    <>
      <section className="module">
        <What
          badge={depannageData.what.badge}
          title={depannageData.what.title}
          subtitle={depannageData.what.subtitle}
        />
      </section>

      <section className="module">
        <Why title="Dépannage">
          {depannageData.why.map((whyItem, index) => (
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
        <How steps={depannageData.steps} />
      </section>

      <section className="module">
        <Prices cards={depannageData.prices} />
      </section>
    </>
  );
};

export default Depannage;