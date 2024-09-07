import React, { useEffect, useState } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

// Import Heroicons
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TopSideButtons from "../../../components/TopSideButtons";
import { useDispatch, useSelector } from "react-redux";
import { getSegmentData } from "./setupSlices/segmentSlice";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { showNotification } from "../../common/headerSlice";

const Segments = ({ title }) => {
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const segments = useSelector((state) => state?.segment?.segments);

  useEffect(() => {
    dispatch(getSegmentData());
  }, []);

  const handleDelete = async (index) => {
    try {
      await apiCall(`/segments/${index}`, "DELETE");
      dispatch(getSegmentData());
      dispatch(
        showNotification({
          message: "Segment Deleted Successfully!",
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
        <TopSideButtons btnTitle="+ Add New" navigateTo="/app/segments/add" />
      }
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Segment Name</th>
              <th>Country</th>
              <th>Segment Head</th>
              <th>Contact Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {segments?.map((segment, index) => (
              <tr key={segment?._id}>
                <td>{segment?.segmentName}</td>
                <td>{segment?.country?.name}</td>
                <td>{segment?.segmentHead}</td>
                <td>{segment?.contactNumber}</td>
                <td className="flex items-center space-x-2">
                  <PencilIcon
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/app/segments/update/${segment?._id}`)
                    }
                  />
                  <TrashIcon
                    className="h-6 w-6 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(segment?._id)}
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

export default Segments;
