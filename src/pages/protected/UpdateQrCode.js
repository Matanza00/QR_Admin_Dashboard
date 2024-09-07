import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { useParams } from "react-router-dom";
import UpdateQrCode from "../../features/updateQrCode";

function InternalPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Qr Code" }));
  }, []);

  return <UpdateQrCode Id={id} />;
}

export default InternalPage;
