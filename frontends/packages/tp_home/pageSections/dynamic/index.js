/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui';
import parse from 'html-react-parser';
import { Slide } from "react-awesome-reveal";
import dynamic from 'next/dynamic';
const GlassCarouselDynamic = dynamic(() => import("../../components/glassCarousel/glasscarousel"));

import { DynamicPageSectionStyles as styles } from './dynamic.style';

export default function DynamicPageSection({dynamicContent}) {
    let finalContentSections = [];
    if (dynamicContent && dynamicContent.PageSections && dynamicContent.SlidersSections) {
        finalContentSections = dynamicContent.PageSections.concat(dynamicContent.SlidersSections);
    }
    else {
        finalContentSections = dynamicContent.PageSections;
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
        console.log(contentType)
        if(contentType === 'sliders') {
            console.log(dynamicSectionData)
        }
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
                        <></>
                        // <GlassCarouselDynamic slides={dynamicSectionData}/>
                    ) : (
                        <div sx={styles.sectionCard}>{parse(dynamicSectionData, options)}</div>
                    )}
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