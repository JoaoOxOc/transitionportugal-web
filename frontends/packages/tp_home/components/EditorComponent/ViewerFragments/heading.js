import {
    Typography
  } from '@material-ui/core';

export default function ViewerHeading({paragraphData}) {
    let variant = "h1";
    let headingStyle = {};
    switch (paragraphData.level) {
        case 2: {variant = "h2"; headingStyle={fontSize:"2.4rem !important"};} break;
        case 3: {variant = "h3"; headingStyle={fontSize:"2.3rem !important"};} break;
        case 4: {variant = "h4"; headingStyle={fontSize:"2.2rem !important"};} break;
        case 5: {variant = "h5"; headingStyle={fontSize:"2.1rem !important"};} break;
        case 6: {variant = "h6"; headingStyle={fontSize:"2rem !important"};} break;
    }
    return (
        <Typography style={headingStyle} variant={variant} dangerouslySetInnerHTML={{__html: paragraphData.text}}></Typography>
    )
}