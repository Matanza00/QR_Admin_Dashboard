import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQRUserData = createAsyncThunk("/qruser/content", async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("/qrusers", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const qrUserSlice = createSlice({
  name: "qruser",
  initialState: {
    isLoading: false,
    users: [],
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
    [getQRUserData.pending]: (state) => {
      state.isLoading = true;
    },
    [getQRUserData.fulfilled]: (state, action) => {
      state.users = action.payload?.data;
      state.isLoading = false;
    },
    [getQRUserData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default qrUserSlice.reducer;
