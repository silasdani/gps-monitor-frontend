import ApiService from "../api/ApiService";

class LocationService extends ApiService {
    fetchMyLocations() {
        return super.get("/locations/", ((res) => res.data.data))
    }
}

export default LocationService;
