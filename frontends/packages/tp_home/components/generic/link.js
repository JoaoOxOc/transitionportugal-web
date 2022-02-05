/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, NavLink as MenuLink, Link as A } from 'theme-ui';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

export function NavLink({ path, label, children, ...rest }) {
  return (
    <NextLink href={path}>
      <MenuLink {...rest}>{children ? children : label}</MenuLink>
    </NextLink>
  );
}

export function Link({ path, label, children, ...rest }) {
  return (
    <NextLink {...rest} href={path}>
      <MenuLink {...rest}>{children ? children : label}</MenuLink>
    </NextLink>
  );
}

export const CustomLink = ({ path, children, ...rest }) => {
    const router = useRouter()

    return (
      <a
        href={path}
        onClick={(e) => {
          e.preventDefault()
          router.push(path, undefined, { shallow: true })
        }}
        {...rest}
      >
        {children}
      </a>
    )
}
