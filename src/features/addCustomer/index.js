import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import InputText from "../../components/Input/InputText";
import { showNotification } from "../common/headerSlice";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { mainCustomerSchema } from "../../utils/Schema";

const CustomerForm = () => {
  const [customerPayload, setCustomerPayload] = useState({
    ...mainCustomerSchema,
  });
  const [customer, setCustomer] = useState(null);
  const dispatch = useDispatch();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL parameters

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data } = await apiCall(`/customers/${id}`, "GET");
        setCustomer(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  useEffect(() => {
    if (customer) {
      setCustomerPayload({
        customerCode: customer.customerCode,
        customerName: customer.customerName,
        customerAddress: customer.customerAddress,
        customerContactNumber: customer.customerContactNumber,
      });
    }
  }, [customer]);

  const updateFormValue = ({ updateType, value }) => {
    setCustomerPayload((prev) => ({ ...prev, [updateType]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiCall(
        id ? `/customers/${id}` : "/customers",
        id ? "PATCH" : "POST",
        customerPayload
      );

      if (response) {
        dispatch(
          showNotification({
            message: id
              ? "Customer Updated Successfully!"
              : "Customer Added Successfully!",
            status: 1,
          })
        );

        setCustomerPayload({ ...mainCustomerSchema });

        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TitleCard
        title={id ? "Update Customer" : "Add New Customer"}
        topMargin="mt-2"
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <InputText
              type="text"
              labelTitle="Customer Name"
              placeholder="Enter Customer Name"
              value={customerPayload.customerName}
              updateFormValue={updateFormValue}
              updateType="customerName"
            />
            <InputText
              type="text"
              labelTitle="Customer Code"
              placeholder="Enter Customer Code"
              value={customerPayload.customerCode}
              updateFormValue={updateFormValue}
              updateType="customerCode"
            />
            <InputText
              type="text"
              labelTitle="Customer Address"
              placeholder="Enter Customer Address"
              value={customerPayload.customerAddress}
              updateFormValue={updateFormValue}
              updateType="customerAddress"
            />
            <InputText
              type="text"
              labelTitle="Customer Contact Number"
              placeholder="Enter Customer Contact Number"
              value={customerPayload.customerContactNumber}
              updateFormValue={updateFormValue}
              updateType="customerContactNumber"
              isNumeric={true}
            />
          </div>
          <div className="mt-16">
            <button className="btn btn-primary float-right" type="submit">
              {id ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
};

export default CustomerForm;
