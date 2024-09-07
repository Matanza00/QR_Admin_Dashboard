import React, { useEffect } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

// Import Heroicons
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TopSideButtons from "../../../components/TopSideButtons";
import { getDivisionData } from "./setupSlices/divisionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { showNotification } from "../../common/headerSlice";

const Divisions = ({ title }) => {
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const divisions = useSelector((state) => state?.division?.divisions);

  useEffect(() => {
    dispatch(getDivisionData());
  }, []);

  const handleDelete = async (index) => {
    try {
      await apiCall(`/divisions/${index}`, "DELETE");
      dispatch(getDivisionData());
      dispatch(
        showNotification({
          message: "Division Deleted Successfully!",
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
        <TopSideButtons btnTitle="+ Add New" navigateTo="/app/divisions/add" />
      }
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Division Name</th>
              <th>GM Name</th>
              <th>Contact Number</th>
              <th>Email Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {divisions.map((division, index) => (
              <tr key={division._id}>
                <td>{division?.divisionName}</td>
                <td>{division?.gmName}</td>

                <td>{division?.contactNumber}</td>
                <td>{division?.email}</td>
                <td className="flex items-center space-x-2">
                  <PencilIcon
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/app/divisions/update/${division?._id}`)
                    }
                  />
                  <TrashIcon
                    className="h-6 w-6 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(division?._id)}
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

export default Divisions;
