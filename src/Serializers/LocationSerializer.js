export default class LocationSerializer {
    static deserialize(data) {
        if (Array.isArray(data)) {
            return data.map(({ attributes }) => ({
                ...attributes,
                latitude: Number(attributes?.latitude),
                longitude: Number(attributes?.longitude),
                latlng: {
                    latitude: Number(attributes?.latitude),
                    longitude: Number(attributes?.longitude),
                },
            }))
        }

        return {
            ...data.attributes,
            latitude: Number(data.attributes?.latitude),
            longitude: Number(data.attributes?.longitude),
            latlng: {
                latitude: Number(data.attributes?.latitude),
                longitude: Number(data.attributes?.longitude),
            },
        }
    }
}