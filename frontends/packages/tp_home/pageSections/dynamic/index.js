/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui';
import parse from 'html-react-parser';

import { DynamicPageSectionStyles as styles } from './dynamic.style';

export default function DynamicPageSection({dynamicContent}) {
    let finalContentSections = [];
    if (dynamicContent && dynamicContent.PageSections && dynamicContent.SlidersSections) {
        finalContentSections = dynamicContent.PageSections.concat(dynamicContent.SlidersSections);
    }
    finalContentSections.sort((a, b) => {
        if (Number(a.SectionIdentifier) < Number(b.SectionIdentifier)) {
            return -1;
          }
          if (Number(a.SectionIdentifier) > Number(b.SectionIdentifier)) {
            return 1;
          }
          // a must be equal to b
          return 0;
    });

    const parseDynamicSection = (dynamicSectionData, index, contentType) => {
        console.log(dynamicSectionData, index, contentType);
        const options = {
            replace: domNode => {
              if (domNode.attribs && domNode.attribs.href) {
                domNode.attribs.target = '_blank';
              }
            }
        };
        return (
            <div sx={styles.parsedSectionContainer}>
                {parse(dynamicSectionData, options)}
                <div sx={styles.sectionContainerBottom}></div>
            </div>
        );
    }

    return (
        <Container sx={styles.dynamicPageSectionContainer}>
            {finalContentSections && finalContentSections.map((section, index) => (
                parseDynamicSection(section.DynamicContent ? section.DynamicContent : section.sliderData,index, section.DynamicContent ? 'text' : 'sliders')
            ))}
        </Container>
    );
}