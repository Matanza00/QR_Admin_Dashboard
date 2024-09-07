import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import RegionForm from "../../features/addRegion";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Regions" }));
  }, []);

  return <RegionForm />;
}

export default InternalPage;
