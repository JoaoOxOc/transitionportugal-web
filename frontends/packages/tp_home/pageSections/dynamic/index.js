/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui';
import DynamicSectionContent from './section';
import { Slide } from "react-awesome-reveal";
import dynamic from 'next/dynamic';
const GlassCarouselDynamic = dynamic(() => import("../../components/glassCarousel/glasscarousel"));

import { DynamicPageSectionStyles as styles } from './dynamic.style';

export default function DynamicPageSection({dynamicContent}) {
    let finalContentSections = [];
    // if (dynamicContent) {
    //     finalContentSections = dynamicContent.PageSections.concat(dynamicContent.SlidersSections);
    // }
    // else {
    //     finalContentSections = dynamicContent.PageSections;
    // }
    dynamicContent.sort((a, b) => {
        if (Number(a.SectionIdentifier) < Number(b.SectionIdentifier)) {
            return -1;
          }
          if (Number(a.SectionIdentifier) > Number(b.SectionIdentifier)) {
            return 1;
          }
          // a must be equal to b
          return 0;
    });
    console.log("aqui!!!!", dynamicContent);

    const parseDynamicSection = (dynamicSectionData, index, contentType) => {
        const options = {
            replace: domNode => {
              if (domNode.attribs && domNode.attribs.href) {
                domNode.attribs.target = '_blank';
              }
              if (domNode.name === 'oembed') {
                console.log(domNode)
                return <embed src={domNode.attribs.url}></embed>;
              }
            }
        };
        return (
                <div key={index} sx={styles.parsedSectionContainer}>
                    {contentType === 'sliders' ? (
                        <GlassCarouselDynamic slides={dynamicSectionData.Slide} fullWidth={true} customHeight={'inherit !important'}/>
                    ) : (
                        dynamicSectionData.SectionContent.map((element,elementIndex) => (
                            <div key={''+elementIndex+element.SectionIdentifier} sx={styles.sectionCard}>
                                <DynamicSectionContent sectionContent={element.DynamicContent} sectionIndex={elementIndex}/>
                            </div>
                        ))
                    )}
                </div>
        );
    }

    return (
            <Container sx={styles.dynamicPageSectionContainer}>
                {dynamicContent && dynamicContent.map((section, index) => (
                    parseDynamicSection(section, index, section.SectionContent ? 'text' : 'sliders')
                ))}
            </Container>
    );
}