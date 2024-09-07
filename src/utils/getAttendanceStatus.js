export const getAttendanceStatus = (status) => {
  if (status === "Present")
    return <div className="badge badge-success text-white px-3">{status}</div>;
  if (status === "absent")
    return <div className="badge badge-primary">{status}</div>;
  else return <div className="badge badge-ghost">{status}</div>;
};
