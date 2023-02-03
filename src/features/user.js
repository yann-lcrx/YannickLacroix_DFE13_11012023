import { createAction, createReducer } from "@reduxjs/toolkit";

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

export const nameChangeResolved = createAction(
  "user/name/resolved",
  (firstName, lastName) => ({
    payload: { firstName, lastName },
  })
);

export const nameChangeRejected = createAction(
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

export const updateName = (firstName, lastName) => {
  return async (dispatch, getState) => {
    const state = getState();

    const reqBody = JSON.stringify({
      firstName,
      lastName,
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_PATH}/user/profile`,
        {
          method: "PUT",
          body: reqBody,
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${state.user.jwt}`,
          },
        }
      );

      const data = await res.json();
      dispatch(nameChangeResolved(data.body.firstName, data.body.lastName));
    } catch (error) {
      dispatch(nameChangeRejected(error));
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
      return;
    })
    .addCase(nameChangeResolved, (draft, action) => {
      draft.firstName = action.payload.firstName;
      draft.lastName = action.payload.lastName;
      return;
    })
);
