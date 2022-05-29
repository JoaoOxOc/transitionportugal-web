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
function capitalizeFirstLetter(text) {
    const words = text.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
}
export function getOdsPtDistricts() {
    let districts = [];
    for (let index = 0; index < ODS_PT_DATA.FEATURES.length; index++) {
        const feature = ODS_PT_DATA.FEATURES[index];
        if (!districts.some((element) => element.district_code === feature.properties.district_code)) {
            const newElement = {
                distrito: capitalizeFirstLetter(feature.properties.distrito),
                district_code: feature.properties.district_code
            };
            districts = addAndSortJsonArray(districts, "district_code", newElement);
        }
    }
    return districts;
}
export function getOdsPtCountiesByDistrict(districtCode) {
    let counties = [];
    for (let index = 0; index < ODS_PT_DATA.FEATURES.length; index++) {
        const feature = ODS_PT_DATA.FEATURES[index];
        if (districtCode === feature.properties.district_code) {
            const newElement = {
                concelho: feature.properties.concelho,
                municipality_code: feature.properties.municipality_code
            };
            counties = addAndSortJsonArray(counties, "municipality_code", newElement);
        }
    }
    return counties;
}
//# sourceMappingURL=odsptagreggator.js.map