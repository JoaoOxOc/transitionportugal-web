/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Image } from 'theme-ui';
import { Link as PageLink } from './generic/link';
import { Link as ScrollLink } from 'react-scroll';

export default function Logo({ src, path, ...rest }) {
  const linkPath = path ? path : "/";
  console.log(path)
  const renderScrollLink = () => {
    return (
      <ScrollLink
          activeClass="active"
          to={path}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          sx={{
            variant: 'links.logo',
            display: 'flex',
            cursor: 'pointer',
            mr: 15,
          }}
          {...rest}
        >
        <Image src={src} alt="Transição Portugal" />
      </ScrollLink>
    )
  }

  const renderPageLink = () => {
    return (
      <PageLink
          path={linkPath}
          sx={{
            variant: 'links.logo',
            display: 'flex',
            cursor: 'pointer',
            mr: 15,
          }}
          {...rest}
        >
        <Image src={src} alt="Transição Portugal" />
      </PageLink>
    )
  }

  return (
    (path != undefined && path != null)
      ? renderScrollLink()
      : renderPageLink()
  );
}