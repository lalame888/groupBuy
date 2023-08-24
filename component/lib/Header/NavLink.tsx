import Link from 'next/link';
import { CSSProperties, useState } from 'react';

interface NavLinkProps {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}
export function NavLink(props: NavLinkProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const navLinkStyle: CSSProperties = {
    flexFlow: 'column',
    fontSize: '17px',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: '50px',
    whiteSpace: 'nowrap',
    minWidth: '140px',
    userSelect: 'none',
    color: '#212529',
    textDecoration: 'none',
  };
  const usingLinkStyle: CSSProperties = {
    ...navLinkStyle,
    backgroundColor: 'white',
  };
  return (
    <Link
      href={`${props.to}`}
      style={props.isActive || isHover ? usingLinkStyle : navLinkStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {props.children}
    </Link>
  );
}
