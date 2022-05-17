import {
    Typography
  } from '@mui/material';

export default function ViewerHeading({paragraphData}) {
    let variant = "h1";
    switch (paragraphData.level) {
        case 2: variant = "h2"; break;
        case 3: variant = "h3"; break;
        case 4: variant = "h4"; break;
        case 5: variant = "h5"; break;
        case 6: variant = "h6"; break;
    }
    return (
        <Typography variant={variant} dangerouslySetInnerHTML={{__html: paragraphData.text}}></Typography>
    )
}