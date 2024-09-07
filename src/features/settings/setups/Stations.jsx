import React, { useEffect } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

// Import Heroicons
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TopSideButtons from "../../../components/TopSideButtons";
import { useDispatch, useSelector } from "react-redux";
import { getStationData } from "./setupSlices/stationSlice";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { showNotification } from "../../common/headerSlice";

const Stations = ({ title }) => {
  const navigate = useNavigate();
  const { apiCall } = useApi();
  const dispatch = useDispatch();
  const stations = useSelector((state) => state?.station?.stations);

  useEffect(() => {
    dispatch(getStationData());
  }, []);

  const handleDelete = async (index) => {
    try {
      await apiCall(`/stations/${index}`, "DELETE");
      dispatch(getStationData());
      dispatch(
        showNotification({
          message: "Station Deleted Successfully!",
          status: 1,
        })
      );
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleViewClick = (qrcode) => {
    const qrPayload = {
      station: qrcode?.stationName,
      region: qrcode?.region?.regionName,
      division: qrcode?.division?.divisionName,
      location: qrcode?.location,
    };
    localStorage.setItem("qrcode", JSON.stringify(qrPayload));
    navigate(`/app/qrcodes/view`);
  };

  return (
    <TitleCard
      title={title}
      topMargin="mt-2"
      TopSideButtons={
        <TopSideButtons btnTitle="+ Add New" navigateTo="/app/stations/add" />
      }
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Station Name</th>
              <th>Region Name</th>
              <th>Division Name</th>
              <th>OM/Supervisor Name</th>
              <th>OM/Supervisor Contact Number</th>
              <th>OM/Supervisor Email Address</th>
              <th>QR Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stations?.map((station, index) => (
              <tr key={station?._id}>
                <td>{station?.stationName}</td>
                <td>{station?.region?.regionName}</td>
                <td>{station?.division?.divisionName}</td>
                <td>{station?.supervisorName}</td>
                <td>{station?.supervisorContactNumber}</td>
                <td>{station?.supervisorEmail}</td>
                <td>
                  <EyeIcon
                    className="h-6 w-6 text-gray-500 cursor-pointer mr-2"
                    onClick={() => handleViewClick(station)}
                  />
                </td>
                <td className="flex items-center space-x-2">
                  <PencilIcon
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/app/stations/update/${station?._id}`)
                    }
                  />
                  <TrashIcon
                    className="h-6 w-6 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(station?._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default Stations;
