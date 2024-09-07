import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { useParams } from "react-router-dom";
import CustomerForm from "../../features/addCustomer";

function InternalPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Main Customer" }));
  }, []);

  return <CustomerForm Id={id} />;
}

export default InternalPage;
