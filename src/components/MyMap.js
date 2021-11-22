import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux';
import subprograms from '../utils/subprograms';

export class MyMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: [
                { lat: 47.49855629475769, lng: -122.14184416996333 },
                { lat: 47.359423, lng: -122.021071 },
            ]
        }
    }

    componentDidUpdate() {

    }

    render() {
        const center = !!this.state.locations ? subprograms.gedMidPoint(this.state.locations) : { lat: 47.231, lng: -122.43412 }
        return (
            <div className="z-0">
                <MapContainer center={center} zoom={13} scrollWheelZoom={true}
                    style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: 0 }}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.props.locations?.map(position =>
                        <Marker position={position}>
                        </Marker>)}
                </MapContainer>
            </div>)
    }
}

const mapStateToProps = (state) => {
    const { users } = state;
    const user = Object.values(users)?.find(({ id }) => id == 7);
    const locations = user?.locations;

    return {
        locations
    }
}

export default connect(mapStateToProps)(MyMap);
