import ApiService from "../api/ApiService";
import LocationSerializer from '../Serializers/LocationSerializer';

class LocationService extends ApiService {
    constructor() {
        super();
        this.url = '/location';
    }

    fetchMyLocations() {
        return super.get("/locations/", ((res) => res.data.data))
    }
}

export default LocationService;
