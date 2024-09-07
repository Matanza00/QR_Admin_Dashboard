import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import GenerateQrCode from "../../features/generateQrCode";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Qr Code" }));
  }, []);

  return <GenerateQrCode />;
}

export default InternalPage;
