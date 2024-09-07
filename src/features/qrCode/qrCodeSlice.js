import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getQrCodeData = createAsyncThunk("/qrcode/content", async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get("/qr-code", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const qrCodeSlice = createSlice({
  name: "qrcode",
  initialState: {
    isLoading: false,
    qrCodes: [],
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
    [getQrCodeData.pending]: (state) => {
      state.isLoading = true;
    },
    [getQrCodeData.fulfilled]: (state, action) => {
      state.qrCodes = action.payload.data;
      state.isLoading = false;
    },
    [getQrCodeData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default qrCodeSlice.reducer;
