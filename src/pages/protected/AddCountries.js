import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import CountryForm from "../../features/addCountries";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Countries" }));
  }, []);

  return <CountryForm />;
}

export default InternalPage;
