import { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import UseMainLayout from "../../layouts/UserMainLayout";
import { useLocation } from "react-router-dom";

// export class MapContainer extends Component {
//   componentDidMount() {
//     let latitude = localStorage.getItem("latitude");
//     let longitude = localStorage.getItem("longitude");
//     let clinicName = localStorage.getItem("clinicName");
//     let clinicAddress = localStorage.getItem("clinicAddress");
//     this.setState({
//       location: { latitude, longitude, clinicName, clinicAddress },
//     });
//   }
//   componentWillUnmount() {
//     localStorage.clear();
//   }

function Maps(props) {
  const location = useLocation();
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState();
  const [singleLocationData, setSingleLocationData] = useState();

  const onMarkerClick = (props, marker) => {
    setActiveMarker(marker);
    setSelectedPlace(props.title);
    setShowingInfoWindow(true);
  };

  const onMapClicked = () => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker({});
    }
  };

  useEffect(() => {
    setSingleLocationData(location?.state);
  }, [location]);

  return (
    <UseMainLayout>
      {singleLocationData ? (
        <Map
          className="relative h-full w-full"
          google={props.google}
          zoom={16}
          center={{
            lat: singleLocationData.latitude,
            lng: singleLocationData.longitude,
          }}
          onClick={onMapClicked}
        >
          <Marker
            title={singleLocationData.clinicName}
            name={singleLocationData.clinicName}
            position={{
              lat: singleLocationData.latitude,
              lng: singleLocationData.longitude,
            }}
            onClick={onMarkerClick}
          />
          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <div>
              <h1 className="font-bold" >{selectedPlace}</h1>
            </div>
          </InfoWindow>
        </Map>
      ) : (
        <Map
          className="relative h-full w-full"
          google={props.google}
          zoom={11}
          initialCenter={{ lat: 31.45631, lng: 74.32669 }}
          onClick={onMapClicked}
        >
          <Marker
            title="General Veterinary Hospital Lahore, Pakistan"
            name="General Veterinary Hospital Lahore, Pakistan"
            position={{ lat: 31.55792, lng: 74.41614 }}
            onClick={onMarkerClick}
          />
          <Marker
            title="Pets and Vets Clinic"
            name="Pets and Vets Clinic"
            position={{ lat: 31.48277, lng: 74.39716 }}
            onClick={onMarkerClick}
          />
          <Marker
            title="KM Pets Hospital MuslimTown"
            name="KM Pets Hospital MuslimTown"
            position={{ lat: 31.51734, lng: 74.32079 }}
            onClick={onMarkerClick}
          />
          <Marker
            title="Asim Pets Clinic (Defence)"
            name="Asim Pets Clinic (Defence)"
            position={{ lat: 31.47152, lng: 74.38868 }}
            onClick={onMarkerClick}
          />

          <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
            <div>
              <h1 className="font-bold">{selectedPlace}</h1>
            </div>
          </InfoWindow>
        </Map>
      )}
    </UseMainLayout>
  );
}

function LoadingContainer() {
  return (
    <div className="grid h-screen place-items-center">
      <div className="h-20 w-20 animate-spin rounded-full border-t-4 border-b-4 border-green-900" />
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB3UIxXjy4PIW6ikhu5zTorpmgE_rN2hDk",
  LoadingContainer,
})(Maps);
