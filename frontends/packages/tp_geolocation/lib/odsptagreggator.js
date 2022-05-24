import { ODS_PT_DATA } from './consts/odspt/odsptdata';
export var OdsPtData = ODS_PT_DATA;
function addAndSortJsonArray(arr, comparerElement, newValue) {
    arr.push(newValue);
    var i = arr.length - 1;
    var item = arr[i];
    while (i > 0 && item[comparerElement] < arr[i - 1][comparerElement]) {
        arr[i] = arr[i - 1];
        i -= 1;
    }
    arr[i] = item;
    return arr;
}
export function getOdsPtDistricts() {
    var districts = [];
    var _loop_1 = function (index) {
        var feature = ODS_PT_DATA.FEATURES[index];
        if (!districts.some(function (element) { return element.district_code === feature.properties.district_code; })) {
            districts.push({
                distrito: feature.properties.distrito,
                district_code: feature.properties.district_code
            });
        }
    };
    for (var index = 0; index < ODS_PT_DATA.FEATURES.length; index++) {
        _loop_1(index);
    }
    return districts;
}
export function getOdsPtCountiesByDistrict(districtCode) {
    var counties = [];
    for (var index = 0; index < ODS_PT_DATA.FEATURES.length; index++) {
        var feature = ODS_PT_DATA.FEATURES[index];
        if (districtCode === feature.properties.district_code) {
            counties.push({
                concelho: feature.properties.concelho,
                municipality_code: feature.properties.municipality_code
            });
        }
    }
    return counties;
}
//# sourceMappingURL=odsptagreggator.js.map