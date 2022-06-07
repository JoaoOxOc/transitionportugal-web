import { MapContainer, TileLayer, Marker, Popup, LayerGroup } from 'react-leaflet'
import {styled} from '@mui/material';
import MarkerPopup from './popup';
import 'leaflet/dist/leaflet.css'

import "leaflet-geosearch/dist/geosearch.css";
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const CustomMapContainer = styled(MapContainer)(
    ({ theme }) => `
        height: inherit
  `
  );

export default function Map({data}) {
    console.log(data)
    const centerPos = [data[0].lat,data[0].long];

    const createMarkerIcon = function(iconSrc) {
        return (
            new L.Icon({iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41]})
        );
    }

    return (
            <CustomMapContainer center={centerPos} zoom={10} scrollWheelZoom={true}>
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LayerGroup>
                            { data && data.map((data, i) => (
                            <Marker key={i} position={[data.lat,data.long]} icon={createMarkerIcon('/leaflet/dist/images/marker-icon.png')}>
                                <Popup>
                                    <MarkerPopup title={data.marker.title} info={data.marker.info}/>
                                </Popup>
                            </Marker>

                            ))
                                
                            }
                        </LayerGroup>
            </CustomMapContainer>
    );
}