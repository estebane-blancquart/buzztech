import React from 'react';
import Why, { WhyPage } from '@/ui/modules/service-why/Why';
import What from '@/ui/modules/service-what/What';
import Prices from '@/ui/modules/service-prices/Prices';
import How from '@/ui/modules/service-how/How';
import { configurationData } from '@/core/data';

const Configuration: React.FC = () => {
  return (
    <>
      <section className="module">
        <What
          badge={configurationData.what.badge}
          title={configurationData.what.title}
          subtitle={configurationData.what.subtitle}
        />
      </section>

      <section className="module">
        <Why title="Configuration">
          {configurationData.why.map((whyItem, index) => (
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
        <How steps={configurationData.steps} />
      </section>

      <section className="module">
        <Prices cards={configurationData.prices} service={'configuration'} />
      </section>
    </>
  );
};

export default Configuration;
