
import React, { useEffect } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

/**
 * more about: https://www.npmjs.com/package/leaflet-geosearch
 * 
 * @param {*} param0 
 * @returns 
 */
const SearchField = ({ apiKey }) => {
  const provider = new OpenStreetMapProvider ();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    autoComplete: true, // optional: true|false  - default true
    autoCompleteDelay: 250, // optional: number      - default 250
    style: 'bar',
    marker: {
      // optional: L.Marker    - default L.Icon.Default
      icon: new L.Icon({iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow, iconSize: [25, 41], iconAnchor: [12, 41]}),
      draggable: false,
    }
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

export default SearchField;