import React from 'react';
import { useRouter } from 'next/router';
import Link from './Link';

export interface HashLinkProps extends React.ComponentProps<typeof Link> {
  // function signature to match legacy one, but we don't really use 'match' here
  // not sure if we need it more work necessary to figure this out
  scroll?: (el: HTMLElement) => void;
  smooth?: boolean;
  activeClassName?: string;
}

const HashLink = (props: HashLinkProps) => {
  const { scroll, children, ...linkOwnProps } = props;

  // FIXME: this is a hot mess and doesn't even implement HashLink:w
  const router = useRouter();
  // strip any hash, if necessary
  const path = router?.pathname.split('#')[0];
  const match = path === props.href;
  //const active = isActive ? isActive(undefined, { pathname: router?.pathname }) : match;
  //const style = active ? 'active' : '';

  return (
    <Link {...linkOwnProps}>
      <span>{children}</span>
    </Link>
  );
};

export default HashLink;
