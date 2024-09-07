// All components mapping with path for internal routes

import { lazy } from "react";
const ViewDeviceInfo = lazy(() => import("../features/viewDeviceInfo"));
const Setups = lazy(() => import("../pages/protected/Setups"));
const ViewQrCode = lazy(() => import("../features/viewQrCode"));
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Attendance = lazy(() => import("../pages/protected/Attendence"));
const QrCodes = lazy(() => import("../pages/protected/QRCode"));
const GenerateQrCode = lazy(() => import("../pages/protected/GenerateQrCode"));
const AddCountries = lazy(() => import("../pages/protected/AddCountries"));
const UpdateCountry = lazy(() => import("../pages/protected/UpdateCountry"));
const AddSegments = lazy(() => import("../pages/protected/AddSegments"));
const UpdateSegment = lazy(() => import("../pages/protected/UpdateSegment"));
const AddDivisions = lazy(() => import("../pages/protected/AddDivisions"));
const UpdateDivision = lazy(() => import("../pages/protected/UpdateDivision"));
const AddRegion = lazy(() => import("../pages/protected/AddRegion"));
const UpdateRegion = lazy(() => import("../pages/protected/UpdateRegion"));
const AddStations = lazy(() => import("../pages/protected/AddStations"));
const UpdateStation = lazy(() => import("../pages/protected/UpdateStation"));
const AddCustomer = lazy(() => import("../pages/protected/AddCustomer"));
const UpdateCustomer = lazy(() => import("../pages/protected/UpdateCustomer"));
const AddBranches = lazy(() => import("../pages/protected/AddBranches"));
const UpdateBranch = lazy(() => import("../pages/protected/UpdateBranch"));
const AddUser = lazy(() => import("../pages/protected/AddUsers"));
const UpdateUser = lazy(() => import("../pages/protected/UpdateUser"));
const UpdateQrCode = lazy(() => import("../pages/protected/UpdateQrCode"));
const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Blank = lazy(() => import("../pages/protected/Blank"));
const Charts = lazy(() => import("../pages/protected/Charts"));
const Leads = lazy(() => import("../pages/protected/Leads"));
const Integration = lazy(() => import("../pages/protected/Integration"));
const Calendar = lazy(() => import("../pages/protected/Calendar"));
const Team = lazy(() => import("../pages/protected/Team"));
const Transactions = lazy(() => import("../pages/protected/Attendence"));
const Bills = lazy(() => import("../pages/protected/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings")
);
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));
const Reports = lazy(() => import("../pages/protected/Report"));

const routes = [
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/attendance", // the url
    component: Attendance, // view rendered
  },
  {
    path: "/attendance/report", // the url
    component: Reports, // view rendered
  },
  // {
  //   path: "/qrcodes", // the url
  //   component: QrCodes, // view rendered
  // },
  // {
  //   path: "/qrcodes/create",
  //   component: GenerateQrCode,
  // },
  // {
  //   path: "/qrcodes/update/:id",
  //   component: UpdateQrCode,
  // },
  {
    path: "/qrcodes/view",
    component: ViewQrCode,
  },
  {
    path: "/deviceInfo/view",
    component: ViewDeviceInfo,
  },
  {
    path: "/countries/add",
    component: AddCountries,
  },
  {
    path: "/countries/update/:id",
    component: UpdateCountry,
  },
  {
    path: "/segments/add",
    component: AddSegments,
  },
  {
    path: `/segments/update/:id`,
    component: UpdateSegment,
  },
  {
    path: "/divisions/add",
    component: AddDivisions,
  },
  {
    path: "/divisions/update/:id",
    component: UpdateDivision,
  },
  {
    path: "/regions/add",
    component: AddRegion,
  },
  {
    path: "/regions/update/:id",
    component: UpdateRegion,
  },
  {
    path: "/stations/add",
    component: AddStations,
  },
  {
    path: "/stations/update/:id",
    component: UpdateStation,
  },
  {
    path: "/maincustomer/add",
    component: AddCustomer,
  },
  {
    path: "/maincustomer/update/:id",
    component: UpdateCustomer,
  },
  {
    path: "/branches/add",
    component: AddBranches,
  },
  {
    path: "/branches/update/:id",
    component: UpdateBranch,
  },
  {
    path: "/users/add",
    component: AddUser,
  },
  {
    path: "/users/update/:id",
    component: UpdateUser,
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/settings-setups",
    component: Setups,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes;
