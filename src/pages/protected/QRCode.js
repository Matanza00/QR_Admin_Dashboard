import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import QrCodes from "../../features/qrCode";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "QR Codes" }));
  }, []);

  return <QrCodes />;
}

export default InternalPage;
