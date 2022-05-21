// import * as React from "react";
import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Header from '../User_Pages/Components/Header';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: 31.45631,
            lng: 74.32669,
          }}
        />
      </div>
    );
  }
}

function LoadingContainer(props) {
  return (
    <div className="grid place-items-center h-screen">
      <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin" />
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB3UIxXjy4PIW6ikhu5zTorpmgE_rN2hDk',
  LoadingContainer,
})(MapContainer);
