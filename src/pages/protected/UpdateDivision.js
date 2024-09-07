import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { useParams } from "react-router-dom";
import DivisionForm from "../../features/addDivisions";

function InternalPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Update Division" }));
  }, []);

  return <DivisionForm Id={id} />;
}

export default InternalPage;
