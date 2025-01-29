export interface Dog {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}
export interface DogIDs {
    prev: string | null;
    next: string | null;
    resultIds: string[];
    total: number;
}
export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}
export interface Coordinates {
    lat: number;
    lon: number;
}
export interface Match {
    match: string;
}
export interface AgeRange {
    ageMin: string | number;
    ageMax: string | number;
}
export interface GridSort {
    field: string;
    order: 'asc' | 'desc';
}