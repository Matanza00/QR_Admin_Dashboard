import React, { useEffect } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

// Import Heroicons
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TopSideButtons from "../../../components/TopSideButtons";
import { useDispatch, useSelector } from "react-redux";
import { getRegionData } from "./setupSlices/regionSlice";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { showNotification } from "../../common/headerSlice";

const Regions = ({ title }) => {
  const navigate = useNavigate();
  const { apiCall } = useApi();
  const dispatch = useDispatch();
  const regions = useSelector((state) => state?.region?.regions);

  useEffect(() => {
    dispatch(getRegionData());
  }, []);

  const handleDelete = async (index) => {
    try {
      await apiCall(`/regions/${index}`, "DELETE");
      dispatch(getRegionData());
      dispatch(
        showNotification({
          message: "Region Deleted Successfully!",
          status: 1,
        })
      );
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <TitleCard
      title={title}
      topMargin="mt-2"
      TopSideButtons={
        <TopSideButtons btnTitle="+ Add New" navigateTo="/app/regions/add" />
      }
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Region Name</th>
              <th>Division Name</th>
              <th>Regional Manager</th>
              <th>RM Contact Number</th>
              <th>RM Email Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {regions?.map((region, index) => (
              <tr key={region._id}>
                <td>{region?.regionName}</td>
                <td>{region?.division?.divisionName}</td>
                <td>{region?.regionalManager}</td>
                <td>{region?.rmContactNumber}</td>
                <td>{region?.rmEmail}</td>

                <td className="flex items-center space-x-2">
                  <PencilIcon
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/app/regions/update/${region?._id}`)
                    }
                  />
                  <TrashIcon
                    className="h-6 w-6 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(region?._id)}
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

export default Regions;
