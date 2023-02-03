import { createAction, createReducer } from "@reduxjs/toolkit";

// export const userloading = createAction("user/loading");
export const loginResolved = createAction("user/login/resolved", (jwt) => ({
  payload: { jwt },
}));

export const loginRejected = createAction("user/login/rejected", (error) => ({
  payload: { error },
}));

export const logout = createAction("user/logout");

export const profileResolved = createAction(
  "user/profile/resolved",
  (firstName, lastName) => ({
    payload: { firstName, lastName },
  })
);

export const profileRejected = createAction(
  "user/profile/rejected",
  (error) => ({
    payload: { error },
  })
);

export const login = (email, password) => {
  return async (dispatch, getState) => {
    const reqBody = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_PATH}/user/login`,
        {
          method: "POST",
          body: reqBody,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );

      const data = await res.json();
      dispatch(loginResolved(data.body.token));
    } catch (error) {
      dispatch(loginRejected(error));
    }
  };
};

export const getProfile = () => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log(state);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_PATH}/user/profile`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${state.user.jwt}`,
          },
        }
      );

      const data = await res.json();
      dispatch(profileResolved(data.body.firstName, data.body.lastName));
    } catch (error) {
      dispatch(profileRejected(error));
    }
  };
};

const initialState = {
  jwt: "",
  firstName: "",
  lastName: "",
  isLoggedIn: false,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(loginResolved, (draft, action) => {
      draft.jwt = action.payload.jwt;
      draft.isLoggedIn = true;
      return;
    })
    .addCase(logout, (draft) => {
      draft.jwt = "";
      draft.isLoggedIn = false;
      return;
    })
    .addCase(profileResolved, (draft, action) => {
      draft.firstName = action.payload.firstName;
      draft.lastName = action.payload.lastName;
    })
);
