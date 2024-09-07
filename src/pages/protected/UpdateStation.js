import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { useParams } from "react-router-dom";
import StationForm from "../../features/addStations";

function InternalPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Update Station" }));
  }, []);

  return <StationForm Id={id} />;
}

export default InternalPage;
