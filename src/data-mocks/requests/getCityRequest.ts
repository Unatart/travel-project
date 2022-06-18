import {ICitiesData} from "./ICityRequest";


export function getCitiesRequest():Promise<ICitiesData | undefined> {
    return fetch('https://api.teleport.org/api/urban_areas/')
        .then(response => response.json())
        .then((response) => {
            if (response) {
                return {
                    count: response.count,
                    cities: response._links['ua:item']
                } as unknown as ICitiesData;
            }
        });
}