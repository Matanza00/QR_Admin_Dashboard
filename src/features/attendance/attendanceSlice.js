import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAttendanceData = createAsyncThunk(
  "/attendance/content",
  async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get("/attendance/all-attendance/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    isLoading: false,
    attendance: [],
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
    [getAttendanceData.pending]: (state) => {
      state.isLoading = true;
    },
    [getAttendanceData.fulfilled]: (state, action) => {
      state.attendance = action.payload?.data;
      state.isLoading = false;
    },
    [getAttendanceData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default attendanceSlice.reducer;
