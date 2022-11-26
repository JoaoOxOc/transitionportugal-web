/** @jsxImportSource theme-ui */
import { useMemo } from "react";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { styled } from "@material-ui/core/styles";
// import Link from '@material-ui/core/Link';
import { Link } from '../generic/link';
import { Container, Flex } from 'theme-ui';
import { useRouter } from 'next/router';
import {GiThreeLeaves} from 'react-icons/gi';
import menuItems from '../menu/mainmenu.data';
import footerMenuItems from '../../pageSections/footer/footer.data';
import {breadcrumbStyles as styles } from './breadcrumbs.style';

import { i18nextHeader } from "@transitionpt/translations";
import { i18nextFooter } from "@transitionpt/translations";

const StyledBreadcrumbs = styled(Breadcrumbs)`
  .MuiBreadcrumbs-li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
  }
`;

export default function BreadcrumbsComponent() {
    const router = useRouter();

    const getPathLabel = (subpath) => {
        let pathData = {};

        pathData = menuItems.filter((item) => {
            item.label = i18nextHeader.t(item.label);
            return item.path === subpath;
        });
        if (!pathData || pathData.length === 0) {
            footerMenuItems.forEach((footerItem) => {
                pathData = footerItem.items.filter(item => {
                    item.label = i18nextFooter.t(item.label);
                    return item.path === subpath;
                });
            });
        }

        return pathData ? pathData[0] : {};
    }

    const breadcrumbs = useMemo(function generateBreadcrumbs() {
        // Remove any query parameters, as those aren't included in breadcrumbs
        const asPathWithoutQuery = router.asPath.split(/[\?#]+/)[0];
    
        // Break down the path between "/"s, removing empty entities
        // Ex:"/my/nested/path" --> ["my", "nested", "path"]
        const asPathNestedRoutes = asPathWithoutQuery.split("/")
                                                     .filter(v => v.length > 0);
    
        // Iterate over the list of nested route parts and build
        // a "crumb" object for each one.
        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
          // We can get the partial nested route for the crumb
          // by joining together the path parts up to this point.
          const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
          // The title will just be the route string for now
          const title = subpath;
          return { href, linkData: getPathLabel(subpath) }; 
        })
    
        // Add in a default "Home" crumb for the top-level
        return [{ href: "/", linkData: {label: "Home", icon: <GiThreeLeaves/>} }, ...crumblist];
    }, [router.asPath]);

    return (
        <>
        {breadcrumbs && breadcrumbs.length > 1 &&
            <Flex style={{paddingTop: '90px', background: 'rgba(255, 255, 255, 0.92)'}}>
                <Container>
                    <StyledBreadcrumbs maxItems={2} style={{padding: '5px 0px 5px 0px'}} aria-label="breadcrumb">
                        {breadcrumbs.map((crumb, idx) => (
                            <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
                        ))}
                    </StyledBreadcrumbs>
                </Container>
                <div sx={styles.bottomLine}/>
            </Flex>
        }
        </>
    );
}

// Each individual "crumb" in the breadcrumbs list
function Crumb({ linkData, href, last=false }) {
    // The last crumb is rendered as normal text since we are already on the page
    if (last) {
      return <Typography color="primary" variant="subtitle1" sx={styles.breadcrumbText}>{linkData.icon} {linkData.label}</Typography>
    }
  
    // All other crumbs will be rendered as links that can be visited 
    return (
        <Link
            path={href}
            aria-label={ linkData.label }
            underline="hover"
            color="inherit"
            style={{padding: '0px', display: 'inline-block'}}
        >
            <span sx={styles.breadcrumbLink}>{linkData.icon} {linkData.label}</span>
        </Link>
    );
}