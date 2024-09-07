import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { qrSchema } from "../../utils/Schema";
import QRCode from "react-qr-code";

const GenerateQrCode = () => {
  const [qrPayload, setQrPayload] = useState({ ...qrSchema });
  const [qrData, setQrData] = useState(null);
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
          divisionsData,
          regionsData,
          stationsData,
          customersData,
          branchesData,
        ] = await Promise.all([
          apiCall("/divisions", "GET"),
          apiCall("/regions", "GET"),
          apiCall("/stations", "GET"),
          apiCall("/customers", "GET"),
          apiCall("/branches", "GET"),
        ]);
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

  const updateFormValue = ({ updateType, value }) => {
    setQrPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const location = {
        lat: Number(qrPayload.lat),
        lng: Number(qrPayload.lng),
      };
      const payload = { ...qrPayload, location };
      const qrData = await apiCall("/qr-code", "POST", payload);

      if (qrData) {
        setQrData(JSON.stringify(payload));

        dispatch(
          showNotification({
            message: "QR Code Generated Successfully!",
            status: 1,
          })
        );

        setQrPayload({ ...qrSchema });
        setTimeout(() => {
          navigate("/app/qrcodes");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Customers", customers);
  console.log("Regions", regions);
  console.log("Stations", stations);
  console.log("Branches", branches);
  console.log("Divisions", divisions);

  return (
    <>
      <TitleCard title="Generate New QR Code" topMargin="mt-2">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                value={qrPayload.customer}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "customer",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer?.customerName}
                  </option>
                ))}
              </select>
            </div>

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
                value={qrPayload.branch}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "branch",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>

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
                value={qrPayload.division}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "division",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Division</option>
                {divisions.map((division) => (
                  <option key={division._id} value={division._id}>
                    {division?.divisionName}
                  </option>
                ))}
              </select>
            </div>

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
                value={qrPayload.region}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "region",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region._id} value={region._id}>
                    {region?.regionName}
                  </option>
                ))}
              </select>
            </div>

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
                value={qrPayload.station}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "station",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Station</option>
                {stations.map((station) => (
                  <option key={station._id} value={station._id}>
                    {station?.stationName}
                  </option>
                ))}
              </select>
            </div>

            <InputText
              type="text"
              labelTitle="Latitude"
              placeholder="Enter Latitude"
              value={qrPayload.lat}
              updateFormValue={updateFormValue}
              updateType="lat"
              isNumeric={true}
            />
            <InputText
              type="text"
              labelTitle="Longitude"
              placeholder="Enter Longitude"
              value={qrPayload.lng}
              updateFormValue={updateFormValue}
              updateType="lng"
              isNumeric={true}
            />
          </div>
          <div className="mt-16">
            <button className="btn btn-primary float-right" type="submit">
              Generate
            </button>
          </div>
        </form>
        {qrData && (
          <div className="mt-8">
            <h2 className="text-center text-xl font-bold">Generated QR Code</h2>
            <div className="flex justify-center mt-4">
              <QRCode value={qrData} size={250} />
            </div>
          </div>
        )}
      </TitleCard>
    </>
  );
};

export default GenerateQrCode;
