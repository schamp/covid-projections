/**
 * This is a next.js compatible replacement for react-router-dom's
 * NavLink, which we use in a couple of places.
 */

import React from 'react';
import Link from './Link';
import { useRouter } from 'next/router';

export interface NavLinkProps extends React.ComponentProps<typeof Link> {
  // function signature to match legacy one, but we don't really use 'match' here
  // not sure if we need it more work necessary to figure this out
  isActive?: (match: any, { pathname }: { pathname: string }) => boolean;
}

const NavLink = (props: NavLinkProps) => {
  const { isActive, children, ...linkOwnProps } = props;

  const router = useRouter();
  // strip any hash, if necessary
  const path = router?.pathname.split('#')[0];
  const match = path === props.href;
  const active = isActive
    ? isActive(undefined, { pathname: router?.pathname })
    : match;
  const style = active ? 'active' : '';

  return (
    <Link {...linkOwnProps}>
      <span className={style}>{children}</span>
    </Link>
  );
};

export default NavLink;
