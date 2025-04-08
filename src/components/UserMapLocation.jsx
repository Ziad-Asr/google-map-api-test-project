import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  DrawingManager,
  Polygon,
  Marker,
} from "@react-google-maps/api";

const libraries = ["drawing"];
// Put this in .env file
const apiKey = "AIzaSyDgTEeI-xdjzUd5dVRPnY5I87LDxO8r78Y";

const UserMapLocation = ({
  center,
  onPress,
  zoneData,
  viewOnly,
  generalLocations,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  const [polygon, setPolygon] = useState(null);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (loadError) {
      console.error("Error loading Google Maps:", loadError);
      setMapError(loadError.message);
    }
  }, [loadError]);

  const onPolygonComplete = (newPolygon) => {
    if (polygon) {
      polygon.setMap(null);
    }

    setPolygon(newPolygon);

    const path = newPolygon.getPath();
    const coordinates = path.getArray().map((latLng) => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }));

    onPress(coordinates);
  };

  if (mapError) {
    return <div className="map-error">Error loading map: {mapError}</div>;
  }

  return (
    <div
      className="d-flex flex-column"
      style={{ width: "100%", height: "100%" }}
    >
      {!isLoaded ? (
        <div>Loading Google Maps...</div>
      ) : (
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="mapContainer"
          onLoad={() => console.log("Map loaded successfully")}
          onError={(error) => {
            console.error("Map error:", error);
            setMapError("Error rendering map");
          }}
        >
          {generalLocations &&
            generalLocations.map((location, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(location.Latitude),
                  lng: parseFloat(location.Longitude),
                }}
              />
            ))}

          {!viewOnly && (
            <DrawingManager
              onPolygonComplete={onPolygonComplete}
              options={{
                drawingMode: "polygon",
                drawingControl: true,
                drawingControlOptions: {
                  position: window.google.maps.ControlPosition.TOP_CENTER,
                  drawingModes: ["polygon"],
                },
                polygonOptions: {
                  fillColor: "blue",
                  fillOpacity: 0.4,
                  strokeColor: "blue",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                },
              }}
            />
          )}
          {zoneData &&
            zoneData.map((zone) => (
              <Polygon
                key={zone.id}
                paths={zone.coordinates}
                options={{
                  fillColor: zone.active ? "green" : "red",
                  fillOpacity: 0.4,
                  strokeColor: zone.active ? "green" : "red",
                  strokeOpacity: 1,
                  strokeWeight: 2,
                }}
              />
            ))}
        </GoogleMap>
      )}
    </div>
  );
};

export default UserMapLocation;
