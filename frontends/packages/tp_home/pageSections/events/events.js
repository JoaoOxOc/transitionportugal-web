/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import { Slide } from "react-awesome-reveal";
import Carousel from "react-multi-carousel";
import SwipeButtonGroup from '../../components/events/swipebuttongroup';
import EventCard from '../../components/events/eventcard';

import useEventsBannerData from '../../hooks/useEventsBannerData';

import { CarouselStyles as useStyles } from './events.style';
import { EventsStyles as styles } from './events.style';
import { CarouselResponsive as responsive } from './events.style';

import "react-multi-carousel/lib/styles.css";

export default function Events() {
    const classes = useStyles();
    const {data, loading, error} = useEventsBannerData('');

    return (
        <section id="events" sx={styles.events}>
            <Container sx={styles.eventsContainer}>
                { data != null &&
                    <Slide direction='left'>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        arrows={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={false}
                        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                        additionalTransfrom={0}
                        autoPlaySpeed={3000}
                        centerMode={false}
                        keyBoardControl={true}
                        customTransition="transform 400ms ease-in-out 0s"
                        transitionDuration={400}
                        containerClass={classes.carouselContainer}
                        // removeArrowOnDeviceType={["tablet", "mobile"]}
                        // deviceType={this.props.deviceType}
                        dotListClass="custom-dot-list-style"
                        // itemClass={classes.sliderImageItem}
                        renderButtonGroupOutside
                        customButtonGroup={<SwipeButtonGroup />}
                        minimumTouchDrag={80}
                    >
                    { data.map(({id, title, picture, orgName, date, tag, place},i) => (
                            <EventCard
                                key={i}
                                src={picture}
                                alt={title}
                                postLink={'/event/'+id}
                                title={title}
                                orgName={orgName}
                                date={date}
                                tag={tag}
                                place={place}
                            />
                    ))}
                </Carousel>
                </Slide>
                }
            </Container>
        </section>
    );
}