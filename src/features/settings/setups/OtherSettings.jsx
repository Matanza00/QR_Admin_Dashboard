import React from "react";
import TitleCard from "../../../components/Cards/TitleCard";

const OtherSettings = ({ title }) => {
  return (
    <>
      <TitleCard title={title} topMargin="mt-2">
        <div>{title}</div>
      </TitleCard>
    </>
  );
};

export default OtherSettings;
