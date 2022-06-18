interface IPhotoTeleport {
    image: {
        mobile: string;
        web:string;
    }
}

export function getImageRequest(url:string):Promise<string[] | undefined> {
    return fetch(`${url}images/`)
        .then(response => response.json())
        .then((response) => {
            if (response) {
                return response.photos.map((photo:IPhotoTeleport) => photo.image.web);
            }
        });
}