/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Typography, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { InfoCardStyles as styles } from './infocard.style';

export default function InfoCard({
    label,
    paragraphs,
    imgPath
}) {

    const renderImageWrapper = () => {
        return (
            (paragraphs != null && paragraphs != undefined)
            ? <Box sx={styles.thumbnail}>
                { imgPath != null &&
                    <Image src={imgPath} alt={label} />
                }
                {renderTextWrapper()}
            </Box>
            : <Box sx={styles.thumbnailonly}>
                { imgPath != null &&
                    <Image src={imgPath} alt={label} />
                }
            </Box>
        );
    }
    
    const renderTextWrapper = () => {
        const paragArray = paragraphs.map((paragraph, i) => 
            <p key={i}>{paragraph}</p>);
        return (
                <Box sx={styles.infoCardContent}>
                    <Heading sx={styles.infoCardContent.title}>
                        {label}
                    </Heading>
    
                    <Flex sx={styles.infoCardParagraphs}>
                        {paragArray}
                    </Flex>
                </Box>
        );
    }
    return (
        <Flex sx={styles.infocard}>
            {renderImageWrapper()}
        </Flex>
    );
}