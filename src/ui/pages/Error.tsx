import React from 'react';
import ScrollLink from '@/ui/components/scroller/scrollLink';

const Error: React.FC = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Page non trouvée</h2>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <ScrollLink to="/">Retour à l'accueil</ScrollLink>
    </div>
  );
};

export default Error;