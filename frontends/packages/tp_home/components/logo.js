/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Image } from 'theme-ui';
import { useRouter } from 'next/router';
import { Link as PageLink, CustomLink } from './generic/link';
import { Link as ScrollLink } from 'react-scroll';

export default function Logo({ src, path, ...rest }) {
  const router = useRouter();
  const linkPath = path ? path : "/";
  
  
  const renderScrollLink = () => {
    if (router.pathname.split('/')[1] != '') {
      return (<CustomLink 
            path={"/#" + path}
            aria-label='Transição Portugal Logo'
            sx={{
              variant: 'links.logo',
              display: 'flex',
              cursor: 'pointer',
              mr: 15,
            }}
            {...rest}
        >
          <Image src={src} alt="Transição Portugal" />
      </CustomLink>);
    }
    else {
      return (
        <ScrollLink
            activeClass="active"
            aria-label='Transição Portugal Logo'
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
  }

  const renderPageLink = () => {
    return (
      <PageLink
          path={linkPath}
          aria-label='Transição Portugal Logo'
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