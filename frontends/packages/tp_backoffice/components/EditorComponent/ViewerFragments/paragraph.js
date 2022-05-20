import {
    Typography
  } from '@mui/material';

export default function ViewerParagraph({paragraphData}) {
    return (
        <Typography dangerouslySetInnerHTML={{__html: paragraphData.text}}></Typography>
    )
}