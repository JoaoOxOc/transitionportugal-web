/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

//import LeafClover from '../../public/ecomap/four-leaf-clover.png';
import StarImg from '../../public/ecomap/Star_icon_stylized.svg';

import { LeafStyles as styles } from './leaf.style';

export default function Leaf({leafWidth, leafHeight, posRight, posLeft, posTop, posBottom}) {
    const styleProps = {
        width: leafWidth,
        posRight: posRight,
        posLeft: posLeft
    };
    const classes = styles(styleProps);

    return (
        <div sx={styles.LeafContainer}>
            <div sx={classes.LeafWrapper}>
                <Image sx={styles.LeafImage} src={StarImg} width={leafWidth} height={leafHeight} alt='4 Leaf Clover'/>
            </div>
        </div>
    );
}