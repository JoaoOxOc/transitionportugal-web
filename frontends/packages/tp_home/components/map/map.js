/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import { MapStyles as styles } from './map.style';
import 'leaflet/dist/leaflet.css'

export default function Map() {
    const position = [51.505, -0.09]

    return (
        <div sx={styles.map}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} sx={styles.mapContainer}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}