import ApiService from "../api/ApiService";

class LocationService extends ApiService {
    fetchMyLocations() {
        return super.get(`/locations`, res => res.data.data)
    }

    fetchUserLocations(id) {
        return super.get(`/locations/${id}`, res => res.data.data)
    }

    fetchUserLocationsByDate(id, date) {
        return super.post(`/user_locations/${id}`, { date }, res => res.data.data)
    }
}

export default LocationService;
