import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
// import Setups from "../../features/settings/setups";

// Import Heroicons
import GlobeAltIcon from "@heroicons/react/24/outline/GlobeAltIcon";
import BuildingOfficeIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";
import MapIcon from "@heroicons/react/24/outline/MapIcon";
// import OfficeBuildingIcon from "@heroicons/react/24/outline/OfficeBuildingIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import UserMinusIcon from "@heroicons/react/24/outline/UserMinusIcon";
import UserPlusIcon from "@heroicons/react/24/outline/UserPlusIcon";
// import CloudUploadIcon from "@heroicons/react/24/outline/CloudUploadIcon";
import CogIcon from "@heroicons/react/24/outline/CogIcon";
import Countries from "../../features/settings/setups/Countries";
import Segments from "../../features/settings/setups/Segments";
import Divisions from "../../features/settings/setups/Divisions";
import Regions from "../../features/settings/setups/Regions";
import Stations from "../../features/settings/setups/Stations";
import MainCustomer from "../../features/settings/setups/MainCustomer";
import CustomerBranches from "../../features/settings/setups/CustomerBranches";
import DeactivatedUsers from "../../features/settings/setups/DeactivatedUsers";
import UploadUsers from "../../features/settings/setups/UploadUsers";
// import UploadOffices from "../../features/settings/setups/UploadOffices";
// import OtherSettings from "../../features/settings/setups/OtherSettings";
import Users from "../../features/settings/setups/Users";

function InternalPage() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Countries");

  useEffect(() => {
    dispatch(setPageTitle({ title: "Setups" }));
  }, [dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="tabs flex gap-2 flex-wrap">
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Countries" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Countries")}
        >
          <GlobeAltIcon className="h-6 w-6" />
          <span className="ml-2">Countries</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Segments" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Segments")}
        >
          <BuildingOfficeIcon className="h-6 w-6" />
          <span className="ml-2">Segments</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Divisions" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Divisions")}
        >
          <MapIcon className="h-6 w-6" />
          <span className="ml-2">Divisions</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Regions" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Regions")}
        >
          <CogIcon className="h-6 w-6" />
          <span className="ml-2">Regions</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Stations" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Stations")}
        >
          <UserGroupIcon className="h-6 w-6" />
          <span className="ml-2">Stations</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Main Customers" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Main Customers")}
        >
          <UsersIcon className="h-6 w-6" />
          <span className="ml-2">Main Customer</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Customer Branches" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Customer Branches")}
        >
          <UsersIcon className="h-6 w-6" />
          <span className="ml-2">Customer Branches</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Users" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Users")}
        >
          <UsersIcon className="h-6 w-6" />
          <span className="ml-2">Users</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "De-activated Users" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("De-activated Users")}
        >
          <UserMinusIcon className="h-6 w-6" />
          <span className="ml-2">De-activated Users</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Upload Users" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Upload Users")}
        >
          <UserPlusIcon className="h-6 w-6" />
          <span className="ml-2">Upload Users</span>
        </a>

        {/* <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Upload Offices" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Upload Offices")}
        >
          <UserPlusIcon className="h-6 w-6" />
          <span className="ml-2">Upload Offices</span>
        </a>
        <a
          className={`tab tab-bordered flex items-center border btn bg-white ${
            activeTab === "Other Settings" ? "tab-active" : ""
          }`}
          onClick={() => handleTabClick("Other Settings")}
        >
          <CogIcon className="h-6 w-6" />
          <span className="ml-2">Other Settings</span>
        </a> */}
      </div>

      <div className="mt-4">
        {activeTab === "Countries" && <Countries title={activeTab} />}
        {activeTab === "Segments" && <Segments title={activeTab} />}
        {activeTab === "Divisions" && <Divisions title={activeTab} />}
        {activeTab === "Regions" && <Regions title={activeTab} />}
        {activeTab === "Stations" && <Stations title={activeTab} />}
        {activeTab === "Main Customers" && <MainCustomer title={activeTab} />}
        {activeTab === "Customer Branches" && (
          <CustomerBranches title={activeTab} />
        )}
        {activeTab === "De-activated Users" && (
          <DeactivatedUsers title={activeTab} />
        )}
        {activeTab === "Upload Users" && <UploadUsers title={activeTab} />}
        {activeTab === "Users" && <Users title={activeTab} />}
        {/* {activeTab === "Upload Offices" && <UploadOffices title={activeTab} />}
        {activeTab === "Other Settings" && <OtherSettings title={activeTab} />} */}
      </div>
    </>
  );
}

export default InternalPage;
