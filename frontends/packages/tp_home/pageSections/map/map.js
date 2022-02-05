/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';

import dynamic from "next/dynamic";
const MapDynamic = dynamic(() => import("../../components/map/map"), {ssr: false});

import { MapSectionStyles as styles } from './map.style';

export default function MapSection() {

    return (
        <section sx={styles.mapsection}>
            <MapDynamic/>
        </section>
    );
}