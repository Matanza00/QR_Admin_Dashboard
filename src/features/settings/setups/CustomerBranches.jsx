import React, { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

// Import Heroicons
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import MapPinIcon from "@heroicons/react/24/outline/MapPinIcon"; // Add MapPinIcon
import TopSideButtons from "../../../components/TopSideButtons";
import { useDispatch, useSelector } from "react-redux";
import { getBranchData } from "./setupSlices/branchSlice";
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

const CustomerBranches = ({ title }) => {
  const navigate = useNavigate();
  const { apiCall } = useApi();
  const dispatch = useDispatch();
  const branches = useSelector((state) => state?.branch?.branches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState([]);

  useEffect(() => {
    dispatch(getBranchData());
  }, []);

  const handleDelete = async (index) => {
    try {
      await apiCall(`/branches/${index}`, "DELETE");
      dispatch(getBranchData());
      dispatch(
        showNotification({
          message: "Branch Deleted Successfully!",
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

  const handleViewClick = (qrcode) => {
    const qrPayload = {
      branchCode: qrcode.branchCode,
      branchName: qrcode.branchName,
      division: qrcode?.branchDivision?.divisionName,
      station: qrcode?.branchStation?.stationName,
      region: qrcode?.branchRegion?.regionName,
      location: qrcode.location,
    };
    localStorage.setItem("qrcode", JSON.stringify(qrPayload));
    navigate(`/app/qrcodes/view`);
  };

  return (
    <TitleCard
      title={title}
      topMargin="mt-2"
      TopSideButtons={
        <TopSideButtons btnTitle="+ Add New" navigateTo="/app/branches/add" />
      }
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Branch Name</th>
              <th>Branch Code</th>
              <th>Branch Type</th>
              <th>Branch Division</th>
              <th>Branch Region</th>
              <th>Branch Station</th>
              <th>Branch Status</th>
              <th>No of Guards</th>
              <th>DayShift Guards</th>
              <th>NightShift Guards</th>
              <th>Address</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Branch Location</th>
              <th>QR Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches?.map((branch, index) => (
              <tr key={branch?._id}>
                <td>{branch?.branchName}</td>
                <td>{branch?.branchCode}</td>
                <td>{branch?.branchType}</td>
                <td>{branch?.branchDivision?.divisionName}</td>
                <td>{branch?.branchRegion?.regionName}</td>
                <td>{branch?.branchStation?.stationName}</td>
                <td>{branch?.branchStatus}</td>
                <td>{branch?.numberOfGuards}</td>
                <td>{branch?.dayShiftGuards}</td>
                <td>{branch?.nightShiftGuards}</td>
                <td>{branch?.address}</td>
                <td>{branch?.email}</td>
                <td>{branch?.contactNumber}</td>
                <td>
                  <MapPinIcon
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                    onClick={() =>
                      handleLocationClick(
                        branch?.location?.lat,
                        branch?.location?.lng
                      )
                    }
                  />
                </td>
                <td>
                  <EyeIcon
                    className="h-6 w-6 text-gray-500 cursor-pointer mr-2"
                    onClick={() => handleViewClick(branch)}
                  />
                </td>
                <td className="flex items-center space-x-2">
                  <PencilIcon
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/app/branches/update/${branch?._id}`)
                    }
                  />
                  <TrashIcon
                    className="h-6 w-6 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(branch?._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-box">
            <div className="modal-header">
              <h5 className="modal-title">Location</h5>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <MapContainer
                center={selectedPosition}
                zoom={8}
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={selectedPosition} icon={customIcon} />
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </TitleCard>
  );
};

export default CustomerBranches;
