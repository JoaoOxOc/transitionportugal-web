export declare type AddressData = {
    houseNumber: string;
    street: string;
    postalCode: string;
    town: string;
    city: string;
    county: string;
    country: string;
};
export declare type GeolocationData = {
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
export declare const hereGeolocator: (addressData: AddressData, apikey: string) => Promise<GeolocationData>;
export declare const hereGeolocatorSync: (addressData: AddressData, apikey: string) => Promise<unknown>;
//# sourceMappingURL=hereGeolocator.d.ts.map