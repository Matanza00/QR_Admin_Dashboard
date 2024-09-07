import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { divisionSchema } from "../../utils/Schema";

const DivisionForm = ({ Id }) => {
  const [divisionPayload, setDivisionPayload] = useState({ ...divisionSchema });
  const [division, setDivision] = useState(null);
  const dispatch = useDispatch();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDivision = async () => {
      try {
        const { data } = await apiCall(`/divisions/${Id}`, "GET");
        setDivision(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (Id) fetchDivision();
  }, [Id]);

  useEffect(() => {
    if (division) {
      setDivisionPayload((prev) => ({
        ...prev,
        divisionName: division.divisionName,
        gmName: division.gmName,
        contactNumber: division.contactNumber,
        email: division.email,
      }));
    }
  }, [division]);

  const updateFormValue = ({ updateType, value }) => {
    setDivisionPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        divisionName: divisionPayload.divisionName,
        gmName: divisionPayload.gmName,
        contactNumber: divisionPayload.contactNumber,
        email: divisionPayload.email,
      };

      const divisionData = await apiCall(
        Id ? `/divisions/${Id}` : "/divisions",
        Id ? "PATCH" : "POST",
        payload
      );

      if (divisionData) {
        dispatch(
          showNotification({
            message: Id
              ? "Division Updated Successfully!"
              : "Division Added Successfully!",
            status: 1,
          })
        );

        setDivisionPayload({ ...divisionSchema });
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
        title={Id ? "Update Division" : "Add New Division"}
        topMargin="mt-2"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <InputText
              type="text"
              labelTitle="Division Name"
              placeholder="Enter Division Name"
              value={divisionPayload.divisionName}
              updateFormValue={updateFormValue}
              updateType="divisionName"
            />
            <InputText
              type="text"
              labelTitle="GM Name"
              placeholder="Enter GM Name"
              value={divisionPayload.gmName}
              updateFormValue={updateFormValue}
              updateType="gmName"
            />
            <InputText
              type="text"
              labelTitle="Contact Number"
              placeholder="Enter Contact Number"
              value={divisionPayload.contactNumber}
              updateFormValue={updateFormValue}
              updateType="contactNumber"
            />
            <InputText
              type="text"
              labelTitle="Email Address"
              placeholder="Enter Email Address"
              value={divisionPayload.email}
              updateFormValue={updateFormValue}
              updateType="email"
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

export default DivisionForm;
