/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import { Container, Flex, Box, Heading, Text, Image, Button } from 'theme-ui';
import React, { useState } from 'react';

import { StaffTeamCardStyles as styles } from './staffteamcard.style';

export default function StaffTeamCard({
    src,
    alt,
    name,
    job,
    description,
  }) {

    return (
        <div sx={styles.staffteamCard}>
            <Image src={'/about/member-2-512957d04e371f8313a454253ffae88f.png'} alt={'John Carter'}/>
            <div>

            </div>
        </div>
    );
}