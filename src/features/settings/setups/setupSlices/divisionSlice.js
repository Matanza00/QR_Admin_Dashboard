import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDivisionData = createAsyncThunk(
  "/divisions/content",
  async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get("/divisions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const divisionSlice = createSlice({
  name: "division",
  initialState: {
    isLoading: false,
    divisions: [],
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
    [getDivisionData.pending]: (state) => {
      state.isLoading = true;
    },
    [getDivisionData.fulfilled]: (state, action) => {
      state.divisions = action.payload?.data;
      state.isLoading = false;
    },
    [getDivisionData.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// export const { addNewLead, deleteLead } = attendanceSlice.actions

export default divisionSlice.reducer;
