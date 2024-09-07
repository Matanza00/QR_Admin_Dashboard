import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  FunnelIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
} from "@heroicons/react/20/solid";
import SearchBar from "../../components/Input/SearchBar";
import { getAttendanceData } from "./attendanceSlice";
import { getAttendanceStatus } from "../../utils/getAttendanceStatus";
import { useNavigate } from "react-router-dom";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
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
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);
  const navigate = useNavigate();

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {filterParam != "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div>
      <div
        className="dropdown dropdown-bottom dropdown-end mx-5"
        onClick={() => navigate("/app/attendance/report")}
      >
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <ClipboardDocumentListIcon
            class="w-5 mr-2"
            navigateTo="/app/attendance/report"
          />
          " Reports
        </label>
      </div>
    </div>
  );
};

function Attendance() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state?.attendance?.attendance);

  useEffect(() => {
    dispatch(getAttendanceData());
  }, [dispatch]);

  const removeFilter = () => {
    // setTrans(RECENT_TRANSACTIONS)
  };

  const applyFilter = (params) => {
    // let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.location == params })
    // setTrans(filteredTransactions)
  };

  // Search according to name
  const applySearch = (value) => {
    // let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
    // setTrans(filteredTransactions)
  };

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
    <>
      <TitleCard
        title="Attendance"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
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
                <th>Check In</th>
                <th>Check Out</th>
                <th>Notes</th>
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
    </>
  );
}

export default Attendance;
