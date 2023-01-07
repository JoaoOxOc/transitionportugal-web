/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui';
import parse from 'html-react-parser';
import { Chrono } from "react-chrono";
import DynamicSectionContent from '../../pageSections/dynamic/section';

import { TimelinePageSectionStyles as styles } from './timeline.style';

export default function TimelinePageSection({timelineCardsContent}) {
    const items = [];

    const sortElements = (elements, sortKey, sortDirection) => {
      elements.sort((a, b) => {
        if (Number(a[sortKey]) < Number(b[sortKey])) {
            return -1;
        }
        if (Number(a[sortKey]) > Number(b[sortKey])) {
            return 1;
        }
        const [month, day, year] = a[sortKey].split(/[\/|\\|-]/);
        console.log(new Date(a[sortKey]),Date.parse(a[sortKey]), Date.parse(b[sortKey]))
        if (Date.parse(a[sortKey]) < Date.parse(b[sortKey])) {
            return -1;
        }
        if (Date.parse(a[sortKey]) > Date.parse(b[sortKey])) {
            return 1;
        }
        if (a[sortKey] < b[sortKey]) {
            return -1;
        }
        if (a[sortKey] > b[sortKey]) {
            return 1;
        }
        // a must be equal to b
        return 0;
      });
      return elements;
    }
    sortElements(timelineCardsContent, 'SectionIdentifier', 'asc');
    console.log(timelineCardsContent)

    const buildTimelineTitles = (elements) => {
      elements.forEach((element, index) => {
        if (element.SectionContent && element.SectionContent.length > 1) {
          element.SectionContent.forEach((innerElement, innerIndex) => {
            items.push({
              title: innerElement.SectionIdentifier,
              cardTitle: '',
            });
          });
        }
        else {
          items.push({
            title: element.SectionIdentifier,
            cardTitle: '',
          });
        }
      });
    }
    buildTimelineTitles(timelineCardsContent);
    // const items = [{
    //     title: "May 1940",
    //     cardTitle: "Dunkirk",
    //     url: "http://www.history.com",
    //     cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
    //     cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    //     media: {
    //       type: "IMAGE",
    //       source: {
    //         url: "http://someurl/image.jpg"
    //       }
    //     }
    //   },{
    //     title: "May 1940",
    //     cardTitle: "Dunkirk",
    //     cardSubtitle:
    //       "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
    //     cardDetailedText: ["paragraph1", "paragraph2"],
    //   },{
    //     title: "7 December 1941",
    //     cardTitle: "Pearl Harbor",
    //     media: {
    //       source: {
    //         url: "https://www.youtube.com/embed/f6cz9gtMTeI",
    //         type: "mp4"
    //       },
    //       type: "VIDEO",
    //       name: "Pearl Harbor"
    //     }
    //   }];

    return (
        <Container sx={styles.timelinePageSectionContainer}>
            <div style={{ width: '100%', height: '70vh' }}>
                <Chrono
                items={items} 
                slideShow 
                mode="VERTICAL_ALTERNATING" 
                scrollable={{ scrollbar: true }} 
                enableOutline
                useReadMore={true}
                classNames={{
                  card: 'timeline-glasscard',
                  title: 'timeline-title'
                }}
                buttonTexts={{
                    first: 'Jump to First',
                    last: 'Jump to Last',
                    next: 'Next',
                    previous: 'Previous',
                }}
                theme={{
                    primary: '#0F52BA',
                    secondary: '#0F929F',
                    cardBgColor: 'white',
                    cardForeColor: 'black',
                    titleColor: 'black',
                    titleColorActive: 'white',
                }}
                >
                  {timelineCardsContent && timelineCardsContent.map((section, index) => {
                     sortElements(section.SectionContent, 'SectionIdentifier', 'asc');
                     return section.SectionContent.map((content, contentIndex) => (
                      <DynamicSectionContent sectionContent={content.DynamicContent} sectionIndex={contentIndex}/>
                    ))
                  }
                  )}
                </Chrono>
            </div>
        </Container>
    );
}