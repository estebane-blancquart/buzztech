import React from 'react';
import { Link } from 'react-router-dom';

const Error: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '2rem',
      background: '#171717'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(4rem, 15vw, 8rem)',
        fontWeight: 900,
        lineHeight: 1,
        margin: 0,
        background: 'linear-gradient(135deg, #e8e8e8 0%, #c6c3ff 40%, #9c97ff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        404
      </h1>
      
      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, margin: '1rem 0', color: '#e8e8e8' }}>
        Page non trouvée
      </h2>
      
      <p style={{ color: 'rgba(232, 232, 232, 0.8)', fontSize: '1.1rem', margin: '0.5rem 0 2rem' }}>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      
      <Link 
        to="/"
        style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #9c97ff 0%, #c6c3ff 100%)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          boxShadow: '0 4px 20px rgba(156, 151, 255, 0.3)'
        }}
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default Error;