import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import TitleCard from "../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import { getQrCodeData } from "./qrCodeSlice";

const TopSideButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => navigate("/app/qrcodes/create")}
      >
        Add New
      </button>
    </div>
  );
};

function QrCodes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const qrcodes = useSelector((state) => state.qrCode.qrCodes);

  useEffect(() => {
    dispatch(getQrCodeData());
  }, [dispatch]);

  const handleViewClick = (qrcode) => {
    localStorage.setItem("qrcode", JSON.stringify(qrcode));
    navigate(`/app/qrcodes/view`);
  };

  return (
    <>
      <TitleCard title="QR Codes" topMargin="mt-2">
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Branch Name</th>
                <th>Branch Code</th>
                <th>Division</th>
                <th>Region</th>
                <th>Station</th>
                <th>Total Guards</th>
                <th>Day Gurads</th>
                <th>Night Guards</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {qrcodes.map((qrcode, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">
                          {qrcode?.customer?.customerName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{qrcode?.branch?.branchName}</td>
                  <td>{qrcode?.branch?.branchCode}</td>
                  <td>{qrcode?.division?.divisionName}</td>
                  <td>{qrcode?.region?.regionName}</td>
                  <td>{qrcode?.station?.stationName}</td>
                  <td>{qrcode?.branch?.numberOfGuards}</td>
                  <td>{qrcode?.branch?.dayShiftGuards}</td>
                  <td>{qrcode?.branch?.nightShiftGuards}</td>
                  <td className="font-bold">
                    {qrcode.location.lat} <br />
                    {qrcode.location.lng}
                  </td>
                  <td className="text-center flex items-center gap-1">
                    <EyeIcon
                      className="h-6 w-6 text-gray-500 cursor-pointer mr-2"
                      onClick={() => handleViewClick(qrcode)}
                    />
                    <PencilIcon
                      className="h-5 w-5 text-gray-500 cursor-pointer"
                      onClick={() =>
                        navigate(`/app/qrcodes/update/${qrcode._id}`)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default QrCodes;
