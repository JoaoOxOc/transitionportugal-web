import { ODS_PT_DATA } from './consts/odspt/odsptdata';
export const OdsPtData = ODS_PT_DATA;
export function addAndSortJsonArray(arr, comparerElement, newValue) {
    arr.push(newValue);
    let i = arr.length - 1;
    let item = arr[i];
    while (i > 0 && item[comparerElement] < arr[i - 1][comparerElement]) {
        arr[i] = arr[i - 1];
        i -= 1;
    }
    arr[i] = item;
    return arr;
}
export function getOdsPtDistricts() {
    let districts = [];
    for (let index = 0; index < ODS_PT_DATA.FEATURES.length; index++) {
        const feature = ODS_PT_DATA.FEATURES[index];
        if (!districts.some((element) => element.district_code === feature.properties.district_code)) {
            districts.push({
                distrito: feature.properties.distrito,
                district_code: feature.properties.district_code
            });
        }
    }
    return districts;
}
export function getOdsPtCountiesByDistrict(districtCode) {
    let counties = [];
    for (let index = 0; index < ODS_PT_DATA.FEATURES.length; index++) {
        const feature = ODS_PT_DATA.FEATURES[index];
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