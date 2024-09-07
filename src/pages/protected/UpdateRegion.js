import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { useParams } from "react-router-dom";
import RegionForm from "../../features/addRegion";

function InternalPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Update Region" }));
  }, []);

  return <RegionForm Id={id} />;
}

export default InternalPage;
