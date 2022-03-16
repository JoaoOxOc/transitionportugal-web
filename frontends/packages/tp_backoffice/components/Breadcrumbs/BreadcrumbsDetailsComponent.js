import {
    Breadcrumbs,
    Typography
  } from '@mui/material';
  import Link from '../Link';

const BreadcrumbsDetailsComponent = ({ urlDataJson }) => {

    const buildBreadcrumb = (breadcrumbData, index) => {
        if (breadcrumbData.isLink) {
            return (
                <Link key={index} color="inherit" href={breadcrumbData.url} isNextLink={true}>
                    {breadcrumbData.label}
                </Link>
            );
        }
        else if (breadcrumbData.ownPage) {
            return (
                <Typography key={index} color="text.primary">
                    {breadcrumbData.label}
                </Typography>
            );
        }
        else {
            return (
                <Typography key={index} color="text.primary">
                    {breadcrumbData.label}
                </Typography>
            );
        }
    }

    return (
        <Breadcrumbs maxItems={4} aria-label="breadcrumb">
            { urlDataJson.map((breadcrumbData, index) => {
                return buildBreadcrumb(breadcrumbData, index)
            })}
        </Breadcrumbs>
    );
}

export default BreadcrumbsDetailsComponent;