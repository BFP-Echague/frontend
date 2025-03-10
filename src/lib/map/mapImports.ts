import { env } from "../env";
import { Loader } from "@googlemaps/js-api-loader";


const mapsLoader = new Loader({
    apiKey: env.GOOGLEMAPS_API_KEY_PUBLIC,
    version: "weekly"
});


let mapsLibrary: google.maps.MapsLibrary | null = null;
export async function importMapsLibrary() {
    if (mapsLibrary === null) mapsLibrary = await mapsLoader.importLibrary("maps");
    return mapsLibrary;
}

let markerLibrary: google.maps.MarkerLibrary | null = null;
export async function importMarkerLibrary() {
    if (markerLibrary === null) markerLibrary = await mapsLoader.importLibrary("marker");
    return markerLibrary;
}
