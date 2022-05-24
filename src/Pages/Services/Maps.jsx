// import * as React from "react";
import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import UseMainLayout from "../../layouts/UserMainLayout";

const mapStyles = {
  position: "relative",
  width: "100%",
  height: "100%",
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    var points = [
      { lat: 31.55798, lng: 74.41612 },
      { lat: 31.48277, lng: 74.39716 },
      { lat: 31.51754, lng: 74.32085 },
      { lat: 31.4716, lng: 74.38873 },
    ];
    var bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i]);
    }
    return (
      <UseMainLayout>
        <div>
          <Map
            google={this.props.google}
            onClick={this.onMapClicked}
            zoom={12}
            style={mapStyles}
            initialCenter={{
              lat: 31.45631,
              lng: 74.32669,
            }}
            onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
          >
            <Marker
              title="General Veterinary Hospital Lahore, Pakistan"
              name="General Veterinary Hospital Lahore, Pakistan"
              position={{ lat: 31.55792, lng: 74.41614 }}
              onClick={this.onMarkerClick}
            />
            <Marker
              title="Pets and Vets Clinic"
              name="Pets and Vets Clinic"
              position={{ lat: 31.48277, lng: 74.39716 }}
              onClick={this.onMarkerClick}
            />
            <Marker
              title="KM Pets Hospital MuslimTown"
              name="KM Pets Hospital MuslimTown"
              position={{ lat: 31.51734, lng: 74.32079 }}
              onClick={this.onMarkerClick}
            />
            <Marker
              title="Asim Pets Clinic (Defence)"
              name="Asim Pets Clinic (Defence)"
              position={{ lat: 31.47152, lng: 74.38868 }}
              onClick={this.onMarkerClick}
            />

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </UseMainLayout>
    );
  }
}

function LoadingContainer(props) {
  return (
    <div className="grid h-screen place-items-center">
      <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-green-900" />
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3UIxXjy4PIW6ikhu5zTorpmgE_rN2hDk",
  LoadingContainer,
})(MapContainer);
