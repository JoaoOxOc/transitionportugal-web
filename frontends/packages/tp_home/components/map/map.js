/** @jsxImportSource theme-ui */

import { MapContainer, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet'
import SearchField from './searchfield';
import { MapStyles as styles } from './map.style';
import MarkerPopup from './popup';
import 'leaflet/dist/leaflet.css'

import "leaflet-geosearch/dist/geosearch.css";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

import usePartnerData from '../../hooks/usePartnerData';

export default function Map() {
    const {data, loading, error} = usePartnerData('');
    const centerPos = [39.88471155936208, -8.313099356151904];

    const createMarkerIcon = function(iconSrc) {
        return (
            new L.Icon({iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41]})
        );
    }

    return (
        <div sx={styles.map}>
            <MapContainer center={centerPos} zoom={7} scrollWheelZoom={true} sx={styles.mapContainer}>
                
            <SearchField/>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LayerGroup>
                            { data && data.map((data, i) => (
                            <Marker key={i} position={[data.lat,data.long]} icon={createMarkerIcon('/leaflet/dist/images/marker-icon.png')}>
                                <Popup>
                                    <MarkerPopup/>
                                </Popup>
                            </Marker>

                            ))
                                
                            }
                        </LayerGroup>
            </MapContainer>
        </div>
    );
}