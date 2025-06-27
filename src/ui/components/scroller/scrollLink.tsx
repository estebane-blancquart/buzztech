// scrollLink.tsx
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface ScrollLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string | undefined;
  onClick?: () => void;
}

const ScrollLink = ({
  to,
  children,
  className,
  onClick,
}: ScrollLinkProps): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent): void => {
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
