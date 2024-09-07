import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { stationSchema } from "../../utils/Schema";

const StationForm = () => {
  const [stationPayload, setStationPayload] = useState({ ...stationSchema });
  const [regions, setRegions] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [station, setStation] = useState(null);
  const dispatch = useDispatch();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL parameters

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [regionsData, divisionsData] = await Promise.all([
          apiCall("/regions", "GET"),
          apiCall("/divisions", "GET"),
        ]);

        setRegions(regionsData.data);
        setDivisions(divisionsData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const { data } = await apiCall(`/stations/${id}`, "GET");
        setStation(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) fetchStation();
  }, [id]);

  useEffect(() => {
    if (station) {
      setStationPayload({
        stationName: station.stationName,
        region: station.region,
        division: station.division,
        supervisorName: station.supervisorName,
        supervisorContactNumber: station.supervisorContactNumber,
        supervisorEmail: station.supervisorEmail,
        latitude: station.location?.lat,
        longitude: station.location?.lng,
      });
    }
  }, [station]);

  const updateFormValue = ({ updateType, value }) => {
    setStationPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const location = {
        lat: Number(stationPayload.latitude),
        lng: Number(stationPayload.longitude),
      };
      const payload = { ...stationPayload, location };

      const response = await apiCall(
        id ? `/stations/${id}` : "/stations",
        id ? "PATCH" : "POST",
        payload
      );

      if (response) {
        dispatch(
          showNotification({
            message: id
              ? "Station Updated Successfully!"
              : "Station Added Successfully!",
            status: 1,
          })
        );

        setStationPayload({ ...stationSchema });

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
      <TitleCard
        title={id ? "Update Station" : "Add New Station"}
        topMargin="mt-2"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <InputText
              type="text"
              labelTitle="Station Name"
              placeholder="Enter Station Name"
              value={stationPayload.stationName}
              updateFormValue={updateFormValue}
              updateType="stationName"
            />
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                Region Name
              </label>
              <select
                id="region"
                name="region"
                value={stationPayload.region}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "region",
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
                    {region?.regionName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="division"
                className="block text-sm font-medium text-gray-700"
              >
                Division Name
              </label>
              <select
                id="division"
                name="division"
                value={stationPayload.division}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "division",
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
                    {division?.divisionName}
                  </option>
                ))}
              </select>
            </div>
            <InputText
              type="text"
              labelTitle="OM/Supervisor Name"
              placeholder="Enter OM/Supervisor Name"
              value={stationPayload.supervisorName}
              updateFormValue={updateFormValue}
              updateType="supervisorName"
            />
            <InputText
              type="text"
              labelTitle="OM/Supervisor Contact Number"
              placeholder="Enter OM/Supervisor Contact Number"
              value={stationPayload.supervisorContactNumber}
              updateFormValue={updateFormValue}
              updateType="supervisorContactNumber"
            />
            <InputText
              type="email"
              labelTitle="OM/Supervisor Email Address"
              placeholder="Enter OM/Supervisor Email Address"
              value={stationPayload.supervisorEmail}
              updateFormValue={updateFormValue}
              updateType="supervisorEmail"
            />
            <InputText
              type="text"
              labelTitle="Latitude"
              placeholder="Enter Latitude"
              value={stationPayload.latitude}
              updateFormValue={updateFormValue}
              updateType="latitude"
              isNumeric={true}
            />
            <InputText
              type="text"
              labelTitle="Longitude"
              placeholder="Enter Longitude"
              value={stationPayload.longitude}
              updateFormValue={updateFormValue}
              updateType="longitude"
              isNumeric={true}
            />
          </div>
          <div className="mt-16">
            <button className="btn btn-primary float-right" type="submit">
              {id ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
};

export default StationForm;
