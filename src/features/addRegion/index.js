import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { regionSchema } from "../../utils/Schema";

const RegionForm = ({ Id }) => {
  const [regionPayload, setRegionPayload] = useState({ ...regionSchema });
  const [region, setRegion] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const dispatch = useDispatch();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const { data } = await apiCall("/divisions", "GET");
        setDivisions(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDivisions();
  }, []);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const { data } = await apiCall(`/regions/${Id}`, "GET");
        setRegion(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (Id) fetchRegion();
  }, [Id]);

  useEffect(() => {
    if (region) {
      setRegionPayload((prev) => ({
        ...prev,
        regionName: region.regionName,
        division: region.division,
        regionalManager: region.regionalManager,
        rmContactNumber: region.rmContactNumber,
        rmEmail: region.rmEmail,
      }));
    }
  }, [region]);

  const updateFormValue = ({ updateType, value }) => {
    setRegionPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        regionName: regionPayload.regionName,
        division: regionPayload.division,
        regionalManager: regionPayload.regionalManager,
        rmContactNumber: regionPayload.rmContactNumber,
        rmEmail: regionPayload.rmEmail,
      };

      const regionData = await apiCall(
        Id ? `/regions/${Id}` : "/regions",
        Id ? "PATCH" : "POST",
        payload
      );

      if (regionData) {
        dispatch(
          showNotification({
            message: Id
              ? "Region Updated Successfully!"
              : "Region Added Successfully!",
            status: 1,
          })
        );

        setRegionPayload({ ...regionSchema });
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
        title={Id ? "Update Region" : "Add New Region"}
        topMargin="mt-2"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <InputText
              type="text"
              labelTitle="Region Name"
              placeholder="Enter Region Name"
              value={regionPayload.regionName}
              updateFormValue={updateFormValue}
              updateType="regionName"
            />
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
                value={regionPayload.division}
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
              labelTitle="Regional Manager"
              placeholder="Enter Regional Manager"
              value={regionPayload.regionalManager}
              updateFormValue={updateFormValue}
              updateType="regionalManager"
            />
            <InputText
              type="text"
              labelTitle="RM Contact Number"
              placeholder="Enter RM Contact Number"
              value={regionPayload.rmContactNumber}
              updateFormValue={updateFormValue}
              updateType="rmContactNumber"
            />
            <InputText
              type="email"
              labelTitle="RM Email Address"
              placeholder="Enter RM Email Address"
              value={regionPayload.rmEmail}
              updateFormValue={updateFormValue}
              updateType="rmEmail"
            />
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

export default RegionForm;
