/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { EcoMapStyles as styles } from './ecomap.style';

// import Leaf from './leaf';
// import Ballon from './ballon';

// import DoughnutEcoMap from '../../public/ecomap/doughnut_economy.jpeg';
import LeafClover from '../../public/ecomap/four-leaf-clover.png';

export default function EcoMap() {
    return (
        <div sx={styles.ecoMapContainer}>
            <div sx={styles.ecoMapInnerContainer}>
                <div sx={styles.imageDiv} style={{
                backgroundImage:
                    "url(" + LeafClover + ")",
                }}></div>
                {/* <Leaf leafWidth={'50px'} posRight={[null,null,null,null,null,'500px', '650px']}/> */}
            </div>
            {/* <Box sx={styles.ecoMapWrapper}>
            </Box> */}
        </div>
    );
}