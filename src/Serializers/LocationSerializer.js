export default class LocationSerializer {
    static deserialize(data) {
        if (Array.isArray(data)) {
            return data.map(({ attributes }) => ({
                ...attributes,
                lat: Number(attributes?.latitude),
                lng: Number(attributes?.longitude),
                latlng: {
                    latitude: Number(attributes?.latitude),
                    longitude: Number(attributes?.longitude),
                },
            }))
        }

        return {
            ...data.attributes,
            lat: Number(data.attributes?.latitude),
            lng: Number(data.attributes?.longitude),
            latlng: {
                latitude: Number(data.attributes?.latitude),
                longitude: Number(data.attributes?.longitude),
            },
        }
    }
}