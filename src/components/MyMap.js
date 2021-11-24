import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { connect } from 'react-redux';
import subprograms from '../utils/subprograms';

export class MyMap extends Component {

    render() {
        const { locations } = this.props;
        const center = locations.length > 0 ? subprograms.gedMidPoint(locations) : { lat: 47.231, lng: 23.5882 }

        return (
            <div className="z-0 relative">
                <MapContainer center={center} zoom={13} scrollWheelZoom={true}
                    style={{ width: '100vw', height: '100vh', position: 'absolute', zIndex: 0 }}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {locations?.map(position =>
                        <Marker position={position}>
                        </Marker>)}
                </MapContainer>
            </div>)
    }
}

const mapStateToProps = (state) => {
    console.warn(Object.values(state.locations)?.map(location => ({
        ...location.attributes,
        lat: Number(location.attributes?.latitude),
        lng: Number(location.attributes?.longitude),
    })))

    const locations = Object.values(state.locations)?.map(location => ({
        ...location.attributes,
        lat: Number(location.attributes?.latitude),
        lng: Number(location.attributes?.longitude),
    }))
    return {
        locations
    }
}

export default connect(mapStateToProps)(MyMap);
