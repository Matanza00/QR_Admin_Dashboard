import React, { useState } from "react";
import moment from "moment";
import TitleCard from "../../../components/Cards/TitleCard";

// Import Heroicons
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

// Mock data for deactivated users
const DEACTIVATED_USERS = [
  {
    image: "user1.jpg",
    fullName: "John Doe",
    department: "Department A",
    role: "Role A",
    code: "USR001",
    email: "john@example.com",
    mobile: "123-456-7890",
    designation: "Designation A",
    assignedOffice: "Office A",
    lastLogin: moment().subtract(1, "days").format("DD MMM YYYY"),
  },
  {
    image: "user2.jpg",
    fullName: "Jane Smith",
    department: "Department B",
    role: "Role B",
    code: "USR002",
    email: "jane@example.com",
    mobile: "234-567-8901",
    designation: "Designation B",
    assignedOffice: "Office B",
    lastLogin: moment().subtract(2, "days").format("DD MMM YYYY"),
  },
  {
    image: "user3.jpg",
    fullName: "Alice Johnson",
    department: "Department C",
    role: "Role C",
    code: "USR003",
    email: "alice@example.com",
    mobile: "345-678-9012",
    designation: "Designation C",
    assignedOffice: "Office C",
    lastLogin: moment().subtract(3, "days").format("DD MMM YYYY"),
  },
  // Add more mock data as needed
];

const DeactivatedUsers = ({ title }) => {
  const [deactivatedUsers, setDeactivatedUsers] = useState(DEACTIVATED_USERS);

  const handleUpdate = (index) => {
    // Handle the update action (e.g., open a modal for editing)
    console.log("Update deactivated user at index:", index);
  };

  const handleDelete = (index) => {
    // Handle the delete action (e.g., remove the deactivated user from the list)
    setDeactivatedUsers(deactivatedUsers.filter((_, i) => i !== index));
  };

  return (
    <TitleCard title={title} topMargin="mt-2">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Full Name</th>
              <th>Department</th>
              <th>Role</th>
              <th>Code</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Assigned Office</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deactivatedUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={user.image}
                    alt={user.fullName}
                    className="h-8 w-8 rounded-full"
                  />
                </td>
                <td>{user.fullName}</td>
                <td>{user.department}</td>
                <td>{user.role}</td>
                <td>{user.code}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.designation}</td>
                <td>{user.assignedOffice}</td>
                <td>{user.lastLogin}</td>
                <td className="flex items-center space-x-2">
                  <PencilIcon
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                    onClick={() => handleUpdate(index)}
                  />
                  <TrashIcon
                    className="h-6 w-6 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default DeactivatedUsers;
