import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { countrySchema } from "../../utils/Schema";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

// Import the marker images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const CountryForm = ({ Id }) => {
  const [countryPayload, setCountryPayload] = useState({ ...countrySchema });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState(null); // State to track selected position
  const [country, setCountry] = useState(null);
  const dispatch = useDispatch();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const { data } = await apiCall(`/countries/${Id}`, "GET");
        setCountry(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (Id) fetchCountry();
  }, [Id]);

  useEffect(() => {
    if (country) {
      setCountryPayload(
        Id
          ? (prev) => ({
              ...prev,
              lat: country?.location?.coordinates[1],
              lng: country?.location?.coordinates[0],
              name: country?.name,
            })
          : {}
      );
    }
  }, [country]);

  const updateFormValue = ({ updateType, value }) => {
    setCountryPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const location = {
        type: "Point",
        coordinates: [countryPayload.lng, countryPayload.lat],
      };
      const payload = { name: countryPayload.name, location };
      const countryData = await apiCall(
        Id ? `/countries/${Id}` : "/countries",
        Id ? "PATCH" : "POST",
        payload
      );

      if (countryData) {
        dispatch(
          showNotification({
            message: Id
              ? "Country Updated Successfully!"
              : "Country Added Successfully!",
            status: 1,
          })
        );

        setCountryPayload({ ...countrySchema });
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectLocation = (lat, lng) => {
    setCountryPayload((prev) => ({
      ...prev,
      lat: lat,
      lng: lng,
    }));
  };

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

  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <TitleCard title={Id ? "Update" : "Add New Country"} topMargin="mt-2">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <InputText
              type="text"
              labelTitle="Country Name"
              placeholder="Enter the Country Name"
              value={countryPayload.name}
              updateFormValue={updateFormValue}
              updateType="name"
            />
            <div className="flex flex-col justify-center">
              <label className="mb-1">Location</label>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Select Location
              </button>
            </div>
          </div>
          <div className="mt-16">
            <button className="btn btn-primary float-right" type="submit">
              {Id ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </TitleCard>
      {/* Location Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="modal-header">
              <h5 className="modal-title">Location Picker</h5>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
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
                  {position && (
                    <Marker
                      position={[position.y, position.x]}
                      icon={customIcon}
                    />
                  )}
                </MapContainer>
              </div>
            </div>
            <div className="modal-footer flex gap-4">
              <button
                type="button"
                className="btn "
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onSelectLocation(position.y, position.x);
                  setIsModalOpen(false);
                }}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CountryForm;
