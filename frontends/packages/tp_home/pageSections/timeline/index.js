/** @jsxImportSource theme-ui */
import { Container } from 'theme-ui';
import parse from 'html-react-parser';
import { Chrono } from "react-chrono";
import DynamicSectionContent from '../../pageSections/dynamic/section';

import { TimelinePageSectionStyles as styles } from './timeline.style';

import { i18nextTimeline } from "@transitionpt/translations";

export default function TimelinePageSection({timelineCardsContent}) {
    const items = [];

    // TODO: put this method in a global plugin
    const parseDate = (dateString) => {
      const [part1, part2, part3] = dateString.split(/[\/|\\|-]/);
      let year, month, day = '';
      if (part1) {
        switch (part1.length) {
          case 4: year = part1; break;
          case 2: !part3 ? (month = Number(part1) - 1) : day = part1; break;
          default: year = '1990';
        }
      }
      if (part2) {
        switch (part2.length) {
          case 4: year = part2; break;
          case 2: month = Number(part2) - 1; break;
          default: month = '01';
        }
      }
      if (part3) {
        switch (part3.length) {
          case 4: year = part3; break;
          case 2: day = part3; break;
          default: day = '01';
        }
      }
      else {
        day = '01';
      }
      return new Date(year, month, day);
    }

    const sortElements = (elements, sortKey, sortDirection) => {
      elements.sort((a, b) => {
        if (Number(a[sortKey]) < Number(b[sortKey])) {
            return -1;
        }
        if (Number(a[sortKey]) > Number(b[sortKey])) {
            return 1;
        }
        if (parseDate(a[sortKey]) < parseDate(b[sortKey])) {
            return -1;
        }
        if (parseDate(a[sortKey]) > parseDate(b[sortKey])) {
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
                  title: 'timeline-title',
                  controls: 'timeline-controls'
                }}
                buttonTexts={{
                    first: i18nextTimeline.t("TIMELINE_NAV.first"),
                    last: i18nextTimeline.t("TIMELINE_NAV.last"),
                    next: i18nextTimeline.t("TIMELINE_NAV.next"),
                    play: i18nextTimeline.t("TIMELINE_NAV.play"),
                    previous: i18nextTimeline.t("TIMELINE_NAV.previous"),
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