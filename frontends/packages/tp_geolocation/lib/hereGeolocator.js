import { __awaiter } from "tslib";
function parseAddressDataToText(addressData) {
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
const buildGeolocationResult = (response) => __awaiter(void 0, void 0, void 0, function* () {
    let resultErrorBody = "";
    if (!response.ok) {
        resultErrorBody = yield response.text();
    }
    const hereGeoData = yield response.json();
    let position = {};
    let hereAddress = {};
    if (hereGeoData && hereGeoData.Response && hereGeoData.Response.View) {
        if (hereGeoData.Response.View[0] && hereGeoData.Response.View[0].Result && hereGeoData.Response.View[0].Result[0]) {
            if (hereGeoData.Response.View[0].Result[0].Location) {
                position = hereGeoData.Response.View[0].Result[0].Location.DisplayPosition;
                hereAddress = hereGeoData.Response.View[0].Result[0].Location.Address;
            }
        }
    }
    const geolocationData = {
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
});
export const hereGeolocator = (addressData, apikey) => __awaiter(void 0, void 0, void 0, function* () {
    const searchText = parseAddressDataToText(addressData);
    const response = yield fetch("https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=" + searchText + "&apiKey=" + apikey, {
        method: 'GET',
        headers: {
            "Accept": "*/*"
        }
    });
    return yield buildGeolocationResult(response);
});
export const hereGeolocatorSync = (addressData, apikey) => {
    const resultPromise = new Promise((resolve, reject) => {
        resolve(hereGeolocator(addressData, apikey));
    });
    return resultPromise;
};
//# sourceMappingURL=hereGeolocator.js.map