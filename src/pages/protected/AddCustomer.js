import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import CustomerForm from "../../features/addCustomer";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Main Customer" }));
  }, []);

  return <CustomerForm />;
}

export default InternalPage;
