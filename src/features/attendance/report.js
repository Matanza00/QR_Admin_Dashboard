import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import TitleCard from "../../components/Cards/TitleCard";
import { customStyles } from "./style";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  FunnelIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
} from "@heroicons/react/20/solid";
import { getAttendanceData } from "./attendanceSlice";
import { getAttendanceStatus } from "../../utils/getAttendanceStatus";

const TopButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  const navigate = useNavigate();
  const [status, setStatus] = useState([]);
  const handleStatusChange = (e) => {
    setStatus(e);
  };
  const statusOptions = [];

  return (
    <div className="flex p-4 bg-white text-xs">
      <div className="flex absolute inset-y-0 left-0 top-10">
        <div className="ml-3">
          <Select
            styles={customStyles}
            options={statusOptions}
            onChange={(e) => handleStatusChange(e)}
            className="w-[150px] rounded border border-stroke bg-gray h-[40px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            name="Date-from"
            id="date-from"
            placeholder="Date-from"
          />
        </div>
        <div className="ml-3">
          <Select
            styles={customStyles}
            options={statusOptions}
            onChange={(e) => handleStatusChange(e)}
            className="w-[150px] rounded border border-stroke bg-gray h-[40px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
            name="Date-to"
            id="date-to"
            placeholder="Date-To"
          />
        </div>
      </div>

      <div className="ml-3">
        <Select
          styles={customStyles}
          options={statusOptions}
          onChange={(e) => handleStatusChange(e)}
          className="w-[150px] rounded border border-stroke bg-gray h-[40px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          name="Countries"
          id="countries"
          placeholder="Countries"
        />
      </div>
      <div className="ml-3">
        <Select
          styles={customStyles}
          options={statusOptions}
          onChange={(e) => handleStatusChange(e)}
          className="w-[150px] rounded border border-stroke bg-gray h-[40px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          name="Segments"
          id="segment"
          placeholder="Segments"
        />
      </div>
      <div className="ml-3">
        <Select
          styles={customStyles}
          options={statusOptions}
          onChange={(e) => handleStatusChange(e)}
          className="w-[150px] rounded border border-stroke bg-gray h-[40px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          name="Divisions"
          id="division"
          placeholder="Divisions"
        />
      </div>
      <div className="ml-3">
        <Select
          styles={customStyles}
          options={statusOptions}
          onChange={(e) => handleStatusChange(e)}
          className="w-[150px] rounded border border-stroke bg-gray h-[40px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          name="Region"
          id="region"
          placeholder="Region"
        />
      </div>
      <div className="ml-3">
        <Select
          styles={customStyles}
          options={statusOptions}
          onChange={(e) => handleStatusChange(e)}
          className="w-[150px] rounded border border-stroke bg-gray h-[40px] text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          name="Station"
          id="station"
          placeholder="Station"
        />
      </div>
    </div>
  );
};

const Report = () => {
  const removeFilter = () => {};
  const applyFilter = () => {};
  const applySearch = () => {};

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state?.attendance?.attendance);

  useEffect(() => {
    dispatch(getAttendanceData());
  }, [dispatch]);

  function formatDateTime(isoString) {
    const date = new Date(isoString);

    const dateOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    return {
      formattedDate,
      formattedTime,
    };
  }

  return (
    <div>
      <div className="text-xl font-semibold mx-2">Filters</div>
      <TitleCard
        TopSideButtons={
          <TopButtons
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
          />
        }
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Branch</th>
                <th>Region</th>
                <th>Station</th>
                <th>Divisions</th>
                <th>Segments</th>
                <th>Country</th>
                <th>Device Info</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((l, k) => {
                const checkInTime = l.checkIns?.[0];
                const checkOutTime = l.checkIns?.[l.checkIns.length - 1];
                return (
                  <tr key={k}>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-8 h-8">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoh45fFq0p8XNnjr73E-wtaUQwVuJGHGIappdnWtE-jA&s"
                            alt="Avatar"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">
                          {l.user?.employeeName?.split(" ")[0]}
                        </div>
                        <div className="text-sm opacity-50">
                          {l.user?.employeeName?.split(" ")[1]}
                        </div>
                      </div>
                    </td>
                    <td>{l.user?.employeeCode}</td>
                    <td>{l.user?.branch?.branchName}</td>
                    <td>{l.user?.region?.regionName}</td>
                    <td>{l.user?.station?.stationName}</td>
                    <td>
                      {checkInTime && formatDateTime(checkInTime).formattedDate}{" "}
                      <br />{" "}
                      {checkInTime && formatDateTime(checkInTime).formattedTime}
                    </td>
                    <td>
                      {checkOutTime &&
                        formatDateTime(checkOutTime).formattedDate}{" "}
                      <br />{" "}
                      {checkOutTime &&
                        formatDateTime(checkOutTime).formattedTime}
                    </td>
                    <td>QR Code</td>
                    <td className="pl-5 cursor-pointer">
                      <EyeIcon
                        className="h-6 w-6 text-gray-500 cursor-pointer"
                        onClick={() => {
                          localStorage.setItem("deviceInfo", JSON.stringify(l));
                          navigate(`/app/deviceInfo/view`);
                        }}
                      />
                    </td>
                    <td>{getAttendanceStatus(l.status)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                9
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                10
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
