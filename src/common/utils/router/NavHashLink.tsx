/**
 * This is a next.js compatible replacement for react-router-dom's
 * NavLink, which we use in a couple of places.
 */

import React from 'react';
import Link from './Link';
import { useRouter } from 'next/router';

interface NavHashLinkProps extends React.ComponentProps<typeof Link> {
  isActive?: (pathname: string) => boolean;
  scroll?: (elem: HTMLElement) => void;
  activeClassName?: string;
}

const NavHashLink = (props: NavHashLinkProps) => {
  // FIXME: This whole thing is a hot mess : (
  const { isActive, scroll, children, ...linkOwnProps } = props;

  const router = useRouter();
  // strip any hash, if necessary
  const path = router.pathname.split('#')[0];
  const match = path === props.href;
  const active = isActive ? isActive(router.pathname) : match;
  const style = active ? 'active' : '';

  return (
    <Link {...linkOwnProps}>
      <span className={style}>{children}</span>
    </Link>
  );
};

export default NavHashLink;
