import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { useParams } from "react-router-dom";
import UserForm from "../../features/addUsers";

function InternalPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Update User" }));
  }, []);

  return <UserForm Id={id} />;
}

export default InternalPage;
