import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { qrSchema } from "../../utils/Schema";
import QRCode from "react-qr-code";

const UpdateQrCode = ({ Id }) => {
  const [qrPayload, setQrPayload] = useState({ ...qrSchema });
  const [qrData, setQrData] = useState(null);
  const [singleQR, setSingleQR] = useState(null);
  const dispatch = useDispatch();
  const { apiCall } = useApi();
  const navigate = useNavigate();

  const updateFormValue = ({ updateType, value }) => {
    setQrPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const location = {
        lat: parseFloat(qrPayload.lat),
        lng: parseFloat(qrPayload.lng),
      };
      const payload = { ...qrPayload, location };
      const qrData = await apiCall(`/qr-code/${Id}`, "PATCH", payload);

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

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const { data } = await apiCall(`/qr-code/${Id}`);
        if (data) {
          setSingleQR(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQrCode();
  }, [Id]);

  useEffect(() => {
    if (singleQR) {
      setQrPayload({
        ...singleQR,
        lat: singleQR?.location?.lat,
        lng: singleQR?.location?.lng,
      });
    }
  }, [singleQR]);

  return (
    <>
      <TitleCard title="Update QR Code" topMargin="mt-2">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              type="text"
              labelTitle="Customer"
              placeholder="Enter the Customer"
              value={qrPayload.customer}
              updateFormValue={updateFormValue}
              updateType="customer"
            />
            <InputText
              type="text"
              labelTitle="Branch Code"
              placeholder="Enter Branch Code"
              value={qrPayload.branchCode}
              updateFormValue={updateFormValue}
              updateType="branchCode"
            />
            <InputText
              type="text"
              labelTitle="Branch Name"
              placeholder="Enter Branch Name"
              value={qrPayload.branchName}
              updateFormValue={updateFormValue}
              updateType="branchName"
            />
            <InputText
              type="text"
              labelTitle="City"
              placeholder="Enter the city"
              value={qrPayload.city}
              updateFormValue={updateFormValue}
              updateType="city"
            />
            <InputText
              type="text"
              labelTitle="Latitude"
              placeholder="Enter Latitude"
              value={qrPayload.lat}
              updateFormValue={updateFormValue}
              updateType="lat"
              isNumeric={true} // Indicate that this input should only allow numeric values
            />
            <InputText
              type="text"
              labelTitle="Longitude"
              placeholder="Enter Longitude"
              value={qrPayload.lng}
              updateFormValue={updateFormValue}
              updateType="lng"
              isNumeric={true} // Indicate that this input should only allow numeric values
            />
          </div>
          <div className="mt-16">
            <button className="btn btn-primary float-right" type="submit">
              Save
            </button>
          </div>
        </form>
        {qrData && (
          <div className="mt-8">
            <h2 className="text-center text-xl font-bold">Updated QR Code</h2>
            <div className="flex justify-center mt-4">
              <QRCode value={qrData} size={250} />
            </div>
          </div>
        )}
      </TitleCard>
    </>
  );
};

export default UpdateQrCode;
