/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/misc/statuses";
import { APIAuthenticated } from "../globals/http";

const potholeSlice = createSlice({
  name: "pothole",
  initialState: {
    potholes: [],
    singlePothole: null,
    allComments: [],
    status: STATUSES.LOADING,
    votingStatus: STATUSES.IDLE, // Separate status for voting operations
  },
  reducers: {
    setPotholes(state, action) {
      state.potholes = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSinglePothole(state, action) {
      state.singlePothole = action.payload;
    },
    setAllComments(state, action) {
      state.allComments = action.payload;
    },
    setVotingStatus(state, action) {
      state.votingStatus = action.payload;
    },
    updatePotholeVotes(state, action) {
      const { potholeId, upvotes, downvotes } = action.payload;

      // Update votes in potholes array
      state.potholes = state.potholes.map((pothole) =>
        pothole._id === potholeId
          ? { ...pothole, votes: { upvotes, downvotes } }
          : pothole
      );

      // Update votes in singlePothole if it's the same pothole
      if (state.singlePothole && state.singlePothole._id === potholeId) {
        state.singlePothole = {
          ...state.singlePothole,
          votes: { upvotes, downvotes },
        };
      }
    },
  },
});

export const {
  setPotholes,
  setStatus,
  setSinglePothole,
  setAllComments,
  setVotingStatus,
  updatePotholeVotes,
} = potholeSlice.actions;
export default potholeSlice.reducer;

export function fetchPotholes() {
  return async function fetchPotholesThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get("/potholes");
      if (response.status === 200) {
        dispatch(setPotholes(response.data.data));
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function fetchSinglePothole(id) {
  return async function fetchSinglePotholeThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get(`/potholes/${id}`);
      if (response.status === 200) {
        dispatch(setSinglePothole(response.data.data));
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function fetchAllComment(id) {
  return async function fetchAllCommentThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get(`/potholes/${id}/comments`);
      if (response.status === 200) {
        dispatch(setAllComments(response.data.data));
        dispatch(setStatus(STATUSES.SUCCESS));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function voteOnPothole({ potholeId, voteType }) {
  return async function voteOnPotholeThunk(dispatch, getState) {
    dispatch(setVotingStatus(STATUSES.LOADING));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await APIAuthenticated.put(
        `/potholes/${potholeId}/vote`,
        { voteType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const { upvotes, downvotes } = response.data.data;

        // Update the votes in the state
        dispatch(
          updatePotholeVotes({
            potholeId,
            upvotes,
            downvotes,
          })
        );

        dispatch(setVotingStatus(STATUSES.SUCCESS));
        return response.data;
      } else {
        throw new Error("Failed to process vote");
      }
    } catch (error) {
      console.error("Voting error:", error.message);
      dispatch(setVotingStatus(STATUSES.ERROR));
      throw error;
    }
  };
}
