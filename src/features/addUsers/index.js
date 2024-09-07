import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { userSchema } from "../../utils/Schema";

const roles = [
  "HOC",
  "Project Coordinator",
  "GM",
  "KPO",
  "RM/OM",
  "Supervisor",
  "Security Guard",
];

const UserForm = ({ Id }) => {
  const [userPayload, setUserPayload] = useState({ ...userSchema });
  const [segments, setSegments] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [regions, setRegions] = useState([]);
  const [stations, setStations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [branches, setBranches] = useState([]);
  const dispatch = useDispatch();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          segmentsData,
          divisionsData,
          regionsData,
          stationsData,
          customersData,
          branchesData,
        ] = await Promise.all([
          apiCall("/segments", "GET"),
          apiCall("/divisions", "GET"),
          apiCall("/regions", "GET"),
          apiCall("/stations", "GET"),
          apiCall("/customers", "GET"),
          apiCall("/branches", "GET"),
        ]);
        setSegments(segmentsData.data);
        setDivisions(divisionsData.data);
        setRegions(regionsData.data);
        setStations(stationsData.data);
        setCustomers(customersData.data);
        setBranches(branchesData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await apiCall(`/qrusers/${Id}`, "GET");
        setUserPayload(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (Id) fetchUser();
  }, [Id]);

  const updateFormValue = ({ updateType, value }) => {
    setUserPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a copy of userPayload
      const userPayloadCopy = { ...userPayload };

      // Conditionally delete the password property
      if (Id) {
        delete userPayloadCopy.password;
      }

      // Make the API call with the modified payload
      const { data } = await apiCall(
        Id ? `/qrusers/${Id}` : "/qrusers",
        Id ? "PATCH" : "POST",
        userPayloadCopy
      );

      if (data) {
        dispatch(
          showNotification({
            message: Id
              ? "User Updated Successfully!"
              : "User Added Successfully!",
            status: 1,
          })
        );

        setUserPayload({ ...userSchema });
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TitleCard title={Id ? "Update User" : "Add New User"} topMargin="mt-2">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <InputText
              type="text"
              labelTitle="Employee Name"
              placeholder="Enter Employee Name"
              value={userPayload.employeeName}
              updateFormValue={updateFormValue}
              updateType="employeeName"
            />
            <InputText
              type="text"
              labelTitle="Employee Code"
              placeholder="Enter Employee Code"
              value={userPayload.employeeCode}
              updateFormValue={updateFormValue}
              updateType="employeeCode"
            />
            {/* Segments */}
            <div>
              <label
                htmlFor="segment"
                className="block text-sm font-medium text-gray-700"
              >
                Segment
              </label>
              <select
                id="segment"
                name="segment"
                value={userPayload.segment}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "segment",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected hidden>
                  Select Segment
                </option>
                {segments.map((segment) => (
                  <option key={segment._id} value={segment._id}>
                    {segment.segmentName}
                  </option>
                ))}
              </select>
            </div>
            {/* Divisions */}
            <div>
              <label
                htmlFor="division"
                className="block text-sm font-medium text-gray-700"
              >
                Division
              </label>
              <select
                id="division"
                name="division"
                value={userPayload.division}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "division",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected hidden>
                  Select Division
                </option>
                {divisions.map((division) => (
                  <option key={division._id} value={division._id}>
                    {division.divisionName}
                  </option>
                ))}
              </select>
            </div>
            {/* Regions */}
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                Region
              </label>
              <select
                id="region"
                name="region"
                value={userPayload.region}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "region",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected hidden>
                  Select Region
                </option>
                {regions.map((region) => (
                  <option key={region._id} value={region._id}>
                    {region.regionName}
                  </option>
                ))}
              </select>
            </div>
            {/* Stations */}
            <div>
              <label
                htmlFor="station"
                className="block text-sm font-medium text-gray-700"
              >
                Station
              </label>
              <select
                id="station"
                name="station"
                value={userPayload.station}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "station",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected hidden>
                  Select Station
                </option>
                {stations.map((station) => (
                  <option key={station._id} value={station._id}>
                    {station.stationName}
                  </option>
                ))}
              </select>
            </div>
            {/* Customers */}
            <div>
              <label
                htmlFor="customer"
                className="block text-sm font-medium text-gray-700"
              >
                Customer
              </label>
              <select
                id="customer"
                name="customer"
                value={userPayload.customer}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "customer",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected hidden>
                  Select Customer
                </option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.customerName}
                  </option>
                ))}
              </select>
            </div>
            {/* Branches */}
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700"
              >
                Branch
              </label>
              <select
                id="branch"
                name="branch"
                value={userPayload.branch}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "branch",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected hidden>
                  Select Branch
                </option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>

            <InputText
              type="text"
              labelTitle="Mobile Number"
              placeholder="Enter Mobile Number"
              value={userPayload.mobileNumber}
              updateFormValue={updateFormValue}
              updateType="mobileNumber"
              isNumeric={true}
            />

            {!Id && (
              <InputText
                type="password"
                labelTitle="Password"
                placeholder="Enter Password"
                value={userPayload.password}
                updateFormValue={updateFormValue}
                updateType="password"
              />
            )}

            {/* Add file input field for picture */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={userPayload.role}
                onChange={(e) =>
                  updateFormValue({ updateType: "role", value: e.target.value })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected hidden>
                  Select Role
                </option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="userStatus"
                className="block text-sm font-medium text-gray-700"
              >
                User Status
              </label>
              <select
                id="userStatus"
                name="userStatus"
                value={userPayload.userStatus}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "userStatus",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled selected hidden>
                  Select User Status
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="mt-16">
            <button className="btn btn-primary float-right" type="submit">
              {Id ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
};

export default UserForm;
