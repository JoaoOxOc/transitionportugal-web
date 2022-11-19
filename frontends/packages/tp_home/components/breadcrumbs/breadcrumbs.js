import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
import { Link } from '../generic/link';
import { Container, Flex } from 'theme-ui';
import { useRouter } from 'next/router';

import { i18nextHeader } from "@transitionpt/translations";

export default function BreadcrumbsComponent() {
    const router = useRouter();

    function generateBreadcrumbs() {
        // Remove any query parameters, as those aren't included in breadcrumbs
        const asPathWithoutQuery = router.asPath.split("?")[0];
    
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
          return { href, text: subpath }; 
        })
    
        // Add in a default "Home" crumb for the top-level
        return [{ href: "/", text: "Home" }, ...crumblist];
    }
    
    // Call the function to generate the breadcrumbs list
    const breadcrumbs = generateBreadcrumbs();

    return (
        <>
        {breadcrumbs && breadcrumbs.length > 1 &&
            <Container  style={{paddingTop:'19px'}}>
                <Breadcrumbs aria-label="breadcrumb">
                    {breadcrumbs.map((crumb, idx) => (
                        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
                    ))}
                </Breadcrumbs>
            </Container>
        }
        </>
    );
}

// Each individual "crumb" in the breadcrumbs list
function Crumb({ text, href, last=false }) {
    // The last crumb is rendered as normal text since we are already on the page
    if (last) {
      return <Typography color="text.primary">{text}</Typography>
    }
  
    // All other crumbs will be rendered as links that can be visited 
    return (
        <Link
            path={href}
            aria-label={ text }
            underline="hover"
            color="inherit"
            style={{padding: '0px'}}
        >
            {text}
        </Link>
    );
}