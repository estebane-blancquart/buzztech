import { Link, LinkProps, useNavigate } from 'react-router-dom';
import React from 'react';

const Scroll: React.FC<LinkProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); 
    navigate(props.to as string);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 10);
    if (props.onClick) props.onClick(event);
  };

  return <a {...props} href={props.to as string} onClick={handleClick} />;
};

export default Scroll;
