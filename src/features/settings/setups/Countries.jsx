import React, { useEffect, useState } from "react";
import moment from "moment";
import TitleCard from "../../../components/Cards/TitleCard";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon";
import TopSideButtons from "../../../components/TopSideButtons";
import { useDispatch, useSelector } from "react-redux";
import { getCountryData } from "./setupSlices/countrySlice";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { showNotification } from "../../common/headerSlice";

// Custom icon for the map marker
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Modal component for displaying the map
const LocationModal = ({ isOpen, onClose, position }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="modal-box">
          <div className="modal-header">
            <h5 className="modal-title">Location</h5>
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <MapContainer
              center={position}
              zoom={8}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position} icon={customIcon} />
            </MapContainer>
          </div>
        </div>
      </div>
    )
  );
};

const Countries = ({ title }) => {
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState([51.505, -0.09]);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state?.country.countries);

  useEffect(() => {
    dispatch(getCountryData());
  }, []);

  const handleDelete = async (index) => {
    try {
      await apiCall(`/countries/${index}`, "DELETE");
      dispatch(getCountryData());
      dispatch(
        showNotification({
          message: "Country Deleted Successfully!",
          status: 1,
        })
      );
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleLocationClick = (lat, lng) => {
    setSelectedPosition([lat, lng]);
    setIsModalOpen(true);
  };

  return (
    <>
      <TitleCard
        title={title}
        TopSideButtons={
          <TopSideButtons
            btnTitle="+ Add New"
            navigateTo="/app/countries/add"
          />
        }
        topMargin="mt-2"
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {countries?.map((country, index) => (
                <tr key={country?._id}>
                  <td>{country.name}</td>
                  <td>
                    <MapPinIcon
                      className="h-6 w-6 text-blue-500 cursor-pointer"
                      onClick={() =>
                        handleLocationClick(
                          country?.location?.coordinates[1],
                          country?.location?.coordinates[0]
                        )
                      }
                    />
                  </td>
                  <td>{moment(country?.createdAt).format("DD MMM YYYY")}</td>
                  <td className="flex items-center space-x-2">
                    <PencilIcon
                      className="h-6 w-6 text-blue-500 cursor-pointer"
                      onClick={() =>
                        navigate(`/app/countries/update/${country?._id}`)
                      }
                    />
                    <TrashIcon
                      className="h-6 w-6 text-red-500 cursor-pointer"
                      onClick={() => handleDelete(country?._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        position={selectedPosition}
      />
    </>
  );
};

export default Countries;
