import React, { useEffect, useState } from "react";
import moment from "moment";
import TitleCard from "../../../components/Cards/TitleCard";

// Import Heroicons
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import TopSideButtons from "../../../components/TopSideButtons";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerData } from "./setupSlices/customerSlice";
import { useNavigate } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import { showNotification } from "../../common/headerSlice";

const MainCustomer = ({ title }) => {
  const navigate = useNavigate();
  const { apiCall } = useApi();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state?.customer?.customers);

  useEffect(() => {
    dispatch(getCustomerData());
  }, []);

  const handleDelete = async (index) => {
    try {
      await apiCall(`/customers/${index}`, "DELETE");
      dispatch(getCustomerData());
      dispatch(
        showNotification({
          message: "Main Customer Deleted Successfully!",
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
        <TopSideButtons
          btnTitle="+ Add New"
          navigateTo="/app/maincustomer/add"
        />
      }
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Customer Code</th>
              <th>Customer Address</th>
              <th>Customer Contact Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer, index) => (
              <tr key={customer?._id}>
                <td>{customer?.customerName}</td>
                <td>{customer?.customerCode}</td>
                <td>{customer?.customerAddress}</td>
                <td>{customer?.customerContactNumber}</td>
                <td className="flex items-center space-x-2">
                  <PencilIcon
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/app/maincustomer/update/${customer?._id}`)
                    }
                  />
                  <TrashIcon
                    className="h-6 w-6 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(customer?._id)}
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

export default MainCustomer;
