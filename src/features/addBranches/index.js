import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { branchSchema } from "../../utils/Schema";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

// Import the marker images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { formatDate } from "../../utils/Helpers";

const branchTypes = ["Bank", "Govt Inst", "School", "Private"];

const BranchForm = ({ Id }) => {
  const [branchPayload, setBranchPayload] = useState({ ...branchSchema });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [divisions, setDivisions] = useState([]);
  const [regions, setRegions] = useState([]);
  const [stations, setStations] = useState([]);
  const [position, setPosition] = useState(null); // State to track selected position
  const dispatch = useDispatch();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [divisionsData, regionsData, stationsData] = await Promise.all([
          apiCall("/divisions", "GET"),
          apiCall("/regions", "GET"),
          apiCall("/stations", "GET"),
        ]);
        setDivisions(divisionsData.data);
        setRegions(regionsData.data);
        setStations(stationsData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const { data } = await apiCall(`/branches/${Id}`, "GET");
        setBranchPayload({
          ...data,
          branchStartDate: formatDate(data?.branchStartDate),
          latitude: data?.location?.lat,
          longitude: data?.location?.lng,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (Id) fetchBranch();
  }, [Id]);

  const updateFormValue = ({ updateType, value }) => {
    setBranchPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const location = {
        lat: Number(branchPayload.latitude),
        lng: Number(branchPayload.longitude),
      };
      const payload = { ...branchPayload, location };

      // console.log(payload);

      // const { data } = await apiCall(
      //   Id ? `/qr-code/${Id}` : "/qr-code",
      //   Id ? "PATCH" : "POST",
      //   {
      //     branchName: branchPayload.branchName,
      //     branchCode: branchPayload.branchCode,
      //     division: branchPayload.branchDivision,
      //     region: branchPayload.branchRegion,
      //     station: branchPayload.branchStation,
      //     location: {
      //       lat: Number(branchPayload.latitude),
      //       lng: Number(branchPayload.longitude),
      //     },
      //   }
      // );

      const branchData = await apiCall(
        Id ? `/branches/${Id}` : "/branches",
        Id ? "PATCH" : "POST",
        payload
      );

      if (branchData) {
        dispatch(
          showNotification({
            message: Id
              ? "Branch Updated Successfully!"
              : "Branch Added Successfully!",
            status: 1,
          })
        );

        setBranchPayload({ ...branchSchema });
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectLocation = (lat, lng) => {
    setBranchPayload((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const provider = new OpenStreetMapProvider();

  const SearchField = () => {
    const map = useMapEvents({
      click() {
        map.locate();
      },
    });

    useEffect(() => {
      const searchControl = new GeoSearchControl({
        provider,
        style: "bar",
        showMarker: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
      });

      map.addControl(searchControl);
      map.on("geosearch/showlocation", (result) => {
        setPosition(result.location);
      });

      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  };

  // Create a custom icon
  const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <>
      <TitleCard
        title={Id ? "Update Branch" : "Add New Branch"}
        topMargin="mt-2"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <InputText
              type="date"
              labelTitle="Branch Start Date"
              placeholder="Enter Branch Start Date"
              value={branchPayload.branchStartDate}
              updateFormValue={updateFormValue}
              updateType="branchStartDate"
            />
            <InputText
              type="text"
              labelTitle="Branch Code"
              placeholder="Enter Branch Code"
              value={branchPayload.branchCode}
              updateFormValue={updateFormValue}
              updateType="branchCode"
            />
            <InputText
              type="text"
              labelTitle="Branch Name"
              placeholder="Enter Branch Name"
              value={branchPayload.branchName}
              updateFormValue={updateFormValue}
              updateType="branchName"
            />
            <div>
              <label
                htmlFor="branchDivision"
                className="block text-sm font-medium text-gray-700"
              >
                Branch Division
              </label>
              <select
                id="branchDivision"
                name="branchDivision"
                value={branchPayload.branchDivision}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "branchDivision",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Select Division
                </option>
                {divisions.map((division) => (
                  <option key={division._id} value={division._id}>
                    {division.divisionName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="branchRegion"
                className="block text-sm font-medium text-gray-700"
              >
                Branch Region
              </label>
              <select
                id="branchRegion"
                name="branchRegion"
                value={branchPayload.branchRegion}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "branchRegion",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Select Region
                </option>
                {regions.map((region) => (
                  <option key={region._id} value={region._id}>
                    {region.regionName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="branchStation"
                className="block text-sm font-medium text-gray-700"
              >
                Branch Station
              </label>
              <select
                id="branchStation"
                name="branchStation"
                value={branchPayload.branchStation}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "branchStation",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Select Station
                </option>
                {stations.map((station) => (
                  <option key={station._id} value={station._id}>
                    {station.stationName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="branchStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Branch Status
              </label>
              <select
                id="branchStatus"
                name="branchStatus"
                value={branchPayload.branchStatus}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "branchStatus",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <InputText
              type="text"
              labelTitle="Number of Guards"
              placeholder="Enter Number of Guards"
              value={branchPayload.numberOfGuards}
              updateFormValue={updateFormValue}
              updateType="numberOfGuards"
              isNumeric={true}
            />
            <InputText
              type="text"
              labelTitle="Day Shift Guards"
              placeholder="Enter Number of Day Shift Guards"
              value={branchPayload.dayShiftGuards}
              updateFormValue={updateFormValue}
              updateType="dayShiftGuards"
              isNumeric={true}
            />
            <InputText
              type="text"
              labelTitle="Night Shift Guards"
              placeholder="Enter Number of Night Shift Guards"
              value={branchPayload.nightShiftGuards}
              updateFormValue={updateFormValue}
              updateType="nightShiftGuards"
              isNumeric={true}
            />
            <InputText
              type="text"
              labelTitle="Address"
              placeholder="Enter Address"
              value={branchPayload.address}
              updateFormValue={updateFormValue}
              updateType="address"
            />
            <InputText
              type="text"
              labelTitle="Contact Number"
              placeholder="Enter Contact Number"
              value={branchPayload.contactNumber}
              updateFormValue={updateFormValue}
              updateType="contactNumber"
              isNumeric={true}
            />
            <InputText
              type="email"
              labelTitle="Email"
              placeholder="Enter Email"
              value={branchPayload.email}
              updateFormValue={updateFormValue}
              updateType="email"
            />
            {/* <InputText
              type="text"
              labelTitle="Branch Type"
              placeholder="Enter Branch Type"
              value={branchPayload.branchType}
              updateFormValue={updateFormValue}
              updateType="branchType"
            /> */}
            <div>
              <label
                htmlFor="branchDivision"
                className="block text-sm font-medium text-gray-700"
              >
                Branch Type
              </label>
              <select
                id="branchType"
                name="branchType"
                value={branchPayload.branchType}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "branchType",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Select Branch Type
                </option>
                {branchTypes.map((branch) => (
                  <option key={branch._id} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
            <InputText
              type="text"
              labelTitle="Latitude"
              placeholder="Enter Latitude"
              value={branchPayload.latitude}
              updateFormValue={updateFormValue}
              updateType="latitude"
              isNumeric={true}
            />
            <InputText
              type="text"
              labelTitle="Longitude"
              placeholder="Enter Longitude"
              value={branchPayload.longitude}
              updateFormValue={updateFormValue}
              updateType="longitude"
              isNumeric={true}
            />
            {/* <div className="flex flex-col justify-center">
              <label className="mb-2 text-base">
                Branch Google Coordinates
              </label>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Select Location
              </button>
            </div> */}
          </div>
          <div className="mt-16">
            <button className="btn btn-primary float-right" type="submit">
              {Id ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </TitleCard>
      {/* Location Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="modal-header">
              <h5 className="modal-title">Location Picker</h5>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="leaflet-container">
                <MapContainer
                  center={[51.505, -0.09]}
                  zoom={13}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <SearchField />
                  {position && (
                    <Marker
                      position={[position.y, position.x]}
                      icon={customIcon}
                    />
                  )}
                </MapContainer>
              </div>
            </div>
            <div className="modal-footer flex gap-4">
              <button
                type="button"
                className="btn "
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onSelectLocation(position.y, position.x);
                  setIsModalOpen(false);
                }}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BranchForm;
