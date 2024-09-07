import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import leadsSlice from "../features/leads/leadSlice";
import userSlice from "../features/user/userSlice";
import attendanceSlice from "../features/attendance/attendanceSlice";
import qrCodeSlice from "../features/qrCode/qrCodeSlice";
import countrySlice from "../features/settings/setups/setupSlices/countrySlice";
import segmentSlice from "../features/settings/setups/setupSlices/segmentSlice";
import divisionSlice from "../features/settings/setups/setupSlices/divisionSlice";
import regionSlice from "../features/settings/setups/setupSlices/regionSlice";
import stationSlice from "../features/settings/setups/setupSlices/stationSlice";
import customerSlice from "../features/settings/setups/setupSlices/customerSlice";
import branchSlice from "../features/settings/setups/setupSlices/branchSlice";
import qrUserSlice from "../features/settings/setups/setupSlices/userSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  user: userSlice,
  attendance: attendanceSlice,
  qrCode: qrCodeSlice,
  country: countrySlice,
  segment: segmentSlice,
  division: divisionSlice,
  region: regionSlice,
  station: stationSlice,
  customer: customerSlice,
  branch: branchSlice,
  qruser: qrUserSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
