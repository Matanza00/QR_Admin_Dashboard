import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { useEffect } from "react";

const LocationModal = ({ onClose, onSelectLocation }) => {
  const [position, setPosition] = useState(null);

  const provider = new OpenStreetMapProvider();

  const SearchField = () => {
    const map = useMapEvents({
      click() {
        map.locate();
      },
    });

    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
      });

      map.addControl(searchControl);
      map.on("geosearch/showlocation", (result) => {
        setPosition(result.location);
      });

      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Select Location</h5>
          <button type="button" className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="leaflet-container">
            <MapContainer
              center={[51.505, -0.09]}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <SearchField />
              {position && <Marker position={[position.y, position.x]} />}
            </MapContainer>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSelectLocation(position.y, position.x)}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
