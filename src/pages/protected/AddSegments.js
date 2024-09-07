import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import SegmentForm from "../../features/addSegments";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Add Segments" }));
  }, []);

  return <SegmentForm />;
}

export default InternalPage;
