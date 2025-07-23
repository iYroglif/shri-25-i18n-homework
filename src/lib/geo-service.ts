const DEV_OVERRIDE_REGION_QUERY_PARAM_NAME = "devOverrideRegion";

interface IGeoService {
    getCurrentRegion: (queryString: string) => string;
}

class GeoService implements IGeoService {
    getCurrentRegion(queryString: string): string {
        const queryParams = new URLSearchParams(queryString);
        const overrideRegion = queryParams.get(
            DEV_OVERRIDE_REGION_QUERY_PARAM_NAME
        );

        if (overrideRegion && overrideRegion.trim() !== "") {
            return overrideRegion.toUpperCase();
        }

        return "RU";
    }
}

export const geoService = new GeoService();
