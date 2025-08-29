import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import { API } from "../globals/http";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    status: STATUSES.LOADING,
    token: "",
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setUser, setStatus, setToken } = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data) {
  return async function registerUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/auth/register", data);
      if (response.status === 201) {
        console.log("User register successfully");
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function loginUser(data) {
  return async function loginUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("/auth/login", data);
      if (response.status == 200) {
        dispatch(setUser(response.data));
        dispatch(setToken(response.data.token));
        console.log(response.data.data);

        if (response.data.data) {
          localStorage.setItem("token", response.data.data);
        }
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
      console.log(error.message);
    }
  };
}
