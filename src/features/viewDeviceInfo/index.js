import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";

const ViewDeviceInfo = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    setInfo(JSON.parse(localStorage.getItem("deviceInfo")));
  }, []);

  return (
    <>
      {info?.deviceInfo ? (
        <TitleCard title={"Device Information"} topMargin="mt-8">
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {Object.entries(info?.deviceInfo).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <div className="font-bold">{key}</div>
                <div className="ml-2">{value}</div>
              </div>
            ))}
          </div>
        </TitleCard>
      ) : (
        <div>No Device Information Found!</div>
      )}
    </>
  );
};

export default ViewDeviceInfo;
