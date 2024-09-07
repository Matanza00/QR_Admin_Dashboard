import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import UserForm from "../../features/addUsers";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Users" }));
  }, []);

  return <UserForm />;
}

export default InternalPage;
