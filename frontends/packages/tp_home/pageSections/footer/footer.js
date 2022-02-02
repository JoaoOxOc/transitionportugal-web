/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, Heading, Box, Container, Text } from 'theme-ui';
import { Link } from '../../components/generic/link';
import menuItems from './footer.data';

import { FooterStyles as styles } from './footer.style';

export default function Footer() {
  return (
    <footer sx={styles.footer}>
      <Container sx={styles.footer.container}>
        <Box sx={styles.footer.footerTopArea}>
          {menuItems.map(({ header, items }, i) => (
            <Box sx={styles.footer.menus} key={i}>
              <Heading sx={styles.footer.heading}>{header}</Heading>
              <nav>
                {items.map(({ path, label }, i) => (
                  <Link
                    path={path}
                    key={i}
                    label={label}
                    sx={styles.footer.link}
                  />
                ))}
              </nav>
            </Box>
          ))}
        </Box>
      </Container>
      <Text sx={styles.footer.copyright}>
        All right reserved - Design & Developed by
        <Link path="https://redq.io/" target="_blank">
          RedQ, Inc
        </Link>
      </Text>
    </footer>
  );
}