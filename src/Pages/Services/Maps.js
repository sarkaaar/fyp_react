// import * as React from "react";
import Header from "../User_Pages/Components/Header";

import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%",
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

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3UIxXjy4PIW6ikhu5zTorpmgE_rN2hDk",
})(MapContainer);
