export interface ICityData {
    href:string;
    name:string;
}

export interface ICitiesData {
    count:number;
    cities:ICityData[];
}