import React from "react";
import Link from "next/link";

const NextLink = React.forwardRef((props, ref) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  );
});

export default NextLink;
