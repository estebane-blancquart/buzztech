import { Link, LinkProps } from 'react-router-dom';
import React from 'react';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const Scroll: React.FC<LinkProps> = (props) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    scrollToTop();
    if (props.onClick) props.onClick(event);
  };

  return <Link {...props} onClick={handleClick} />;
};

export default Scroll;
