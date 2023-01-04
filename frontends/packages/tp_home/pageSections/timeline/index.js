/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui';
import parse from 'html-react-parser';
import { Chrono } from "react-chrono";

import { TimelinePageSectionStyles as styles } from './timeline.style';

export default function TimelinePageSection({timelineCardsContent}) {
    console.log(timelineCardsContent)

    const items = [{
        title: "May 1940",
        cardTitle: "Dunkirk",
        url: "http://www.history.com",
        cardSubtitle:"Men of the British Expeditionary Force (BEF) wade out to..",
        cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
        media: {
          type: "IMAGE",
          source: {
            url: "http://someurl/image.jpg"
          }
        }
      },{
        title: "May 1940",
        cardTitle: "Dunkirk",
        cardSubtitle:
          "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
        cardDetailedText: ["paragraph1", "paragraph2"],
      },{
        title: "7 December 1941",
        cardTitle: "Pearl Harbor",
        media: {
          source: {
            url: "https://www.youtube.com/embed/f6cz9gtMTeI",
            type: "mp4"
          },
          type: "VIDEO",
          name: "Pearl Harbor"
        }
      }];

    return (
        <Container sx={styles.timelinePageSectionContainer}>
            <div style={{ width: '100%', height: '70vh' }}>
                <Chrono items={items} slideShow mode="VERTICAL_ALTERNATING" scrollable={{ scrollbar: true }} enableOutline/>
            </div>
        </Container>
    );
}