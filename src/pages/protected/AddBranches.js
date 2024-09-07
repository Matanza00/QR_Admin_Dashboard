import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import BranchForm from "../../features/addBranches";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Customer Branches" }));
  }, []);

  return <BranchForm />;
}

export default InternalPage;
