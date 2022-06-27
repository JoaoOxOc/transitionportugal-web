import { __awaiter } from "tslib";
//https://positionstack.com/?fpr=geekflare
//https://positionstack.com/documentation
export const PositionStackGeolocator = (addressData, apikey) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=&apiKey=" + apikey, {
        method: 'GET',
        headers: {
            "Accept": "*/*"
        }
    });
    return response;
});
//# sourceMappingURL=positionStackGeolocator.js.map