import React, { useState, useRef } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import UserPlusIcon from "@heroicons/react/24/outline/UserPlusIcon"; // Import upload icon from Heroicons

const UploadUsers = ({ title }) => {
  const [uploadedUsers, setUploadedUsers] = useState([]);
  const fileInputRef = useRef(null);

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const csv = e.target.result;
      const rows = csv.split("\n");

      const users = rows.map((row, index) => {
        const columns = row.split(",");
        return {
          id: index + 1,
          fullName: columns[0],
          email: columns[1],
        };
      });

      setUploadedUsers(users);
    };

    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <TitleCard title={title} topMargin="mt-2">
      <div className="flex justify-center border border-dotted border-gray-400 p-6 rounded-lg">
        <label
          htmlFor="csv-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <UserPlusIcon className="h-12 w-12 text-blue-500 mb-2" />{" "}
          {/* Upload icon */}
          <span className="text-lg mb-2">
            Click here to choose .csv file
          </span>{" "}
          {/* Text */}
          <button
            className="btn bg-blue-500 text-white"
            style={{ marginTop: "8px" }}
            onClick={handleButtonClick}
          >
            Select File {/* Button */}
          </button>
          <input
            ref={fileInputRef}
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCSVUpload}
          />
        </label>
      </div>
    </TitleCard>
  );
};

export default UploadUsers;
