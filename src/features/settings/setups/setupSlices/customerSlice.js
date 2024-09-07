import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCustomerData = createAsyncThunk(
  "/customers/content",
  async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get("/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    isLoading: false,
    customers: [],
  },
  reducers: {
    // addNewLead: (state, action) => {
    //     let {newLeadObj} = action.payload
    //     state.leads = [...state.leads, newLeadObj]
    // },
    // deleteLead: (state, action) => {
    //     let {index} = action.payload
    //     state.leads.splice(index, 1)
    // }
  },

  extraReducers: {
    [getCustomerData.pending]: (state) => {
      state.isLoading = true;
    },
    [getCustomerData.fulfilled]: (state, action) => {
      state.customers = action.payload?.data;
      state.isLoading = false;
    },
    [getCustomerData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default customerSlice.reducer;
