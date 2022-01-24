/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Image } from 'theme-ui';
import { Link } from './generic/link';

export default function Logo({ src, ...rest }) {
  return (
      <Link
        path="/"
        sx={{
          variant: 'links.logo',
          display: 'flex',
          cursor: 'pointer',
          mr: 15,
        }}
        {...rest}
      >
        <Image src={src} alt="Transição Portugal" />
      </Link>
  );
}