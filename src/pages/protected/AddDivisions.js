import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import DivisionForm from "../../features/addDivisions";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Divisions" }));
  }, []);

  return <DivisionForm />;
}

export default InternalPage;
