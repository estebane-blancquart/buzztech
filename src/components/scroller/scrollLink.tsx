import { Link, useLocation, useNavigate } from 'react-router-dom';

interface ScrollLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ScrollLink = ({ to, children, className, onClick }: ScrollLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: 'instant' });
    if (location.pathname === to) {
      navigate(to, {
        replace: true,
        state: { resetKey: Date.now() },
      });
    } else {
      navigate(to, { state: { resetKey: Date.now() } });
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Link to={to} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default ScrollLink;
