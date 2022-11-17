/** @jsxImportSource theme-ui */

import { Container, Flex, Box, Heading, Typography, Image, Button } from 'theme-ui';
import React, { useState } from 'react';
import parse from 'html-react-parser';

import { InfoCardStyles as styles } from './infocard.style';

export default function InfoCard({
    label,
    paragraphs,
    imgElement
}) {

    const renderImageWrapper = () => {
        
        console.log(imgElement)
        return (
            (paragraphs != null && paragraphs != undefined)
            ? <Box sx={styles.thumbnail}>
                { imgElement != null &&
                    parse(imgElement[0])
                }
                {renderTextWrapper()}
            </Box>
            : <Box sx={styles.thumbnailonly}>
                { imgElement != null &&
                    parse(imgElement[0])
                }
            </Box>
        );
    }
    
    const renderTextWrapper = () => {
        const paragArray = paragraphs.map((paragraph, i) => 
            parse(paragraph)
        );
        return (
                <Box sx={styles.infoCardContent}>
                    <div sx={styles.infoCardContent.title}>
                    { label != null &&
                        parse(label[0])
                    }
                    </div>
    
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