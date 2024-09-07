import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { segmentSchema } from "../../utils/Schema";

const SegmentForm = ({ Id }) => {
  const [segmentPayload, setSegmentPayload] = useState({ ...segmentSchema });
  const [countries, setCountries] = useState([]);
  const [segment, setSegment] = useState(null);
  const dispatch = useDispatch();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSegment = async () => {
      try {
        const { data } = await apiCall(`/segments/${Id}`, "GET");
        setSegment(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCountries = async () => {
      try {
        const { data } = await apiCall("/countries", "GET");
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (Id) fetchSegment();
    fetchCountries();
  }, [Id]);

  useEffect(() => {
    if (segment) {
      setSegmentPayload((prev) => ({
        ...prev,
        segmentName: segment.segmentName,
        country: segment.country,
        segmentHead: segment.segmentHead,
        contactNumber: segment.contactNumber,
      }));
    }
  }, [segment]);

  const updateFormValue = ({ updateType, value }) => {
    setSegmentPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        segmentName: segmentPayload.segmentName,
        country: segmentPayload.country,
        segmentHead: segmentPayload.segmentHead,
        contactNumber: segmentPayload.contactNumber,
      };

      const segmentData = await apiCall(
        Id ? `/segments/${Id}` : "/segments",
        Id ? "PATCH" : "POST",
        payload
      );

      if (segmentData) {
        dispatch(
          showNotification({
            message: Id
              ? "Segment Updated Successfully!"
              : "Segment Added Successfully!",
            status: 1,
          })
        );

        setSegmentPayload({ ...segmentSchema });
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
      <TitleCard title={Id ? "Update" : "Add New Segment"} topMargin="mt-2">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <InputText
              type="text"
              labelTitle="Segment Name"
              placeholder="Enter Segment Name"
              value={segmentPayload.segmentName}
              updateFormValue={updateFormValue}
              updateType="segmentName"
            />
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={segmentPayload.country}
                onChange={(e) =>
                  updateFormValue({
                    updateType: "country",
                    value: e.target.value,
                  })
                }
                className="mt-1 block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>
            <InputText
              type="text"
              labelTitle="Segment Head"
              placeholder="Enter Segment Head"
              value={segmentPayload.segmentHead}
              updateFormValue={updateFormValue}
              updateType="segmentHead"
            />
            <InputText
              type="text"
              labelTitle="Contact Number"
              placeholder="Enter Contact Number"
              value={segmentPayload.contactNumber}
              updateFormValue={updateFormValue}
              updateType="contactNumber"
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

export default SegmentForm;
