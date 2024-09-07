export const qrSchema = {
  customer: null,
  branch: null,
  division: null,
  station: null,
  region: null,
  lat: null,
  lng: null,
};

export const countrySchema = {
  name: "",
  location: {
    type: "Point",
    coordinates: [0, 0],
  },
  lat: null,
  lng: null,
};

export const segmentSchema = {
  segmentName: "",
  country: "",
  segmentHead: "",
  contactNumber: "",
};

export const divisionSchema = {
  divisionName: "",
  gmName: "",
  contactNumber: "",
  email: "",
};
export const regionSchema = {
  regionName: "",
  division: "",
  regionalManager: "",
  rmContactNumber: "",
  rmEmail: "",
};

export const stationSchema = {
  stationName: "",
  region: "",
  division: "",
  supervisorName: "",
  supervisorContactNumber: "",
  supervisorEmail: "",
  longitude: null,
  latitude: null,
};
export const mainCustomerSchema = {
  customerCode: "",
  customerName: "",
  customerAddress: "",
  customerContactNumber: "",
};

export const branchSchema = {
  branchStartDate: "",
  branchCode: "",
  branchName: "",
  branchDivision: "",
  branchRegion: "",
  branchStation: "",
  branchStatus: "",
  numberOfGuards: "",
  dayShiftGuards: "",
  nightShiftGuards: "",
  latitude: null,
  longitude: null,
  address: "",
  contactNumber: "",
  email: "",
  branchType: "",
};

export const userSchema = {
  employeeName: "",
  employeeCode: "",
  segment: null,
  division: null,
  region: null,
  station: null,
  customer: null,
  branch: null,
  mobileNumber: "",
  password: "",
  role: "",
  userStatus: "",
};
