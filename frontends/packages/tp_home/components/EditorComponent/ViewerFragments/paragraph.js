import {
    Typography
  } from '@material-ui/core';

export default function ViewerParagraph({paragraphData}) {
    return (
        <Typography dangerouslySetInnerHTML={{__html: paragraphData.text}}></Typography>
    )
}