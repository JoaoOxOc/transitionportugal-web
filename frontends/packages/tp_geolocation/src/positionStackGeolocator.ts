import {AddressData} from './customTypes/addressData';
import {GeolocationData}  from './customTypes/geolocationData';

//https://positionstack.com/?fpr=geekflare
//https://positionstack.com/documentation
export const PositionStackGeolocator = async(addressData: AddressData, apikey: string) : Promise<any> => {
    const response = await fetch("https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=&apiKey=" + apikey, {
        method: 'GET',
        headers: { 
          "Accept": "*/*"
        }
      });
    
    return response;
} 