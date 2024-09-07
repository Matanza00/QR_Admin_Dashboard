import React, { useEffect } from "react";
import TitleCard from "../../../components/Cards/TitleCard";

// Import Heroicons
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TopSideButtons from "../../../components/TopSideButtons";
import { useDispatch, useSelector } from "react-redux";
import { getStationData } from "./setupSlices/stationSlice";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { showNotification } from "../../common/headerSlice";
import { getQRUserData } from "./setupSlices/userSlice";

const Users = ({ title }) => {
  const navigate = useNavigate();
  const { apiCall } = useApi();
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.qruser?.users);

  useEffect(() => {
    dispatch(getQRUserData());
  }, []);

  const handleDelete = async (index) => {
    try {
      await apiCall(`/qrusers/${index}`, "DELETE");
      dispatch(getQRUserData());
      dispatch(
        showNotification({
          message: "User Deleted Successfully!",
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
        <TopSideButtons btnTitle="+ Add New" navigateTo="/app/users/add" />
      }
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Employee Name</th>
              <th>Employee Code</th>
              <th>Segment</th>
              <th>Division</th>
              <th>Region</th>
              <th>Station</th>
              <th>Customer Name</th>
              <th>Branch Name</th>
              <th>Mobile Number</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user?._id}>
                <td>
                  <img
                    src={user.picture}
                    alt="user profile"
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="font-semibold">{user?.employeeName}</td>
                <td className="text-gray-600">{user?.employeeCode}</td>
                <td>{user?.segment?.segmentName}</td>
                <td>{user?.division?.divisionName}</td>
                <td>{user?.region?.regionName}</td>
                <td>{user?.station?.stationName}</td>
                <td>{user?.customer?.customerName}</td>
                <td>{user?.branch?.branchName}</td>
                <td>{user?.mobileNumber}</td>
                <td>{user?.role}</td>
                <td className="font-bold text-gray-500">{user?.userStatus}</td>
                <td className="flex items-center space-x-2">
                  <PencilIcon
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                    onClick={() => navigate(`/app/users/update/${user?._id}`)}
                  />
                  <TrashIcon
                    className="h-6 w-6 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(user?._id)}
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

export default Users;
