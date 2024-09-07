import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import { useParams } from "react-router-dom";
import SegmentForm from "../../features/addSegments";

function InternalPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Update Segment" }));
  }, []);

  return <SegmentForm Id={id} />;
}

export default InternalPage;
