export type AddressData = {
    houseNumber: string;
    street: string;
    postalCode: string;
    town: string;
    city: string;
    county: string;
    country: string;
  };

export type GeolocationData = {
    IsError: boolean;
    ErrorMessage: string;
    Latitude: number;
    Longitude: number;
    Label: string;
    Street: string;
    PostalCode: string;
    District: string;
    City: string;
    County: string;
    Country: string;
  };

function parseAddressDataToText(addressData: AddressData): string {
    let searchText = "";
    let hasNumber = false;
    let hasStreet = false;
    let hasPostalCode = false;
    let hasCity = false;
    let hasCounty = false;
    if (addressData) {
        if (addressData.houseNumber) {
            hasNumber = true;
            searchText += addressData.houseNumber;
        }
        if (addressData.street) {
            hasStreet = true;
            const addPlus = hasNumber ? "+" : "";
            searchText += addPlus + addressData.street;
        }
        if (addressData.postalCode) {
            hasPostalCode = true;
            const addComma = hasStreet || hasNumber ? "%20" : "";
            searchText += addComma + addressData.postalCode;
        }
        if (addressData.city) {
            hasCity = true;
            const addComma = hasPostalCode || hasStreet || hasNumber ? "%20" : "";
            searchText += addComma + addressData.city;
        }
        if (addressData.county) {
            hasCounty = true;
            const addComma = hasCity || hasPostalCode || hasStreet || hasNumber ? "%20" : "";
            searchText += addComma + addressData.county;
        }
        if (addressData.country) {
            const addComma = hasCounty || hasCity || hasPostalCode || hasStreet || hasNumber ? "%20" : "";
            searchText += addComma + addressData.country;
        }
    }
    return searchText;
}

const buildGeolocationResult = async(response: Response) : Promise<GeolocationData> => {
    let resultErrorBody = "";
    if (!response.ok) {
        resultErrorBody = await response.text();
    }
      
    const hereGeoData = await response.json();
    let position : any = {};
    let hereAddress : any = {};
    
    if (hereGeoData && hereGeoData.Response && hereGeoData.Response.View) {
        if (hereGeoData.Response.View[0] && hereGeoData.Response.View[0].Result && hereGeoData.Response.View[0].Result[0]) {
            if (hereGeoData.Response.View[0].Result[0].Location) {
                position = hereGeoData.Response.View[0].Result[0].Location.DisplayPosition;
                hereAddress = hereGeoData.Response.View[0].Result[0].Location.Address;
            }
        }
    }
    
    const geolocationData : GeolocationData = {
        IsError: !response.ok,
        ErrorMessage: resultErrorBody,
        Latitude: position.Latitude,
        Longitude: position.Longitude,
        Label: hereAddress.Label,
        Street: hereAddress.Street,
        PostalCode: hereAddress.PostalCode,
        District: hereAddress.District,
        City: hereAddress.City,
        County: hereAddress.County,
        Country: hereAddress.Country
    };
    return geolocationData;
}

export const hereGeolocator = async(addressData: AddressData, apikey: string) : Promise<GeolocationData> => {
    const searchText: string = parseAddressDataToText(addressData);
    const response = await fetch("https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=" + searchText + "&apiKey=" + apikey, {
        method: 'GET',
        headers: { 
          "Accept": "*/*"
        }
      });
    
    return await buildGeolocationResult(response);
}