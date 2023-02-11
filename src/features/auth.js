import { createAction, createReducer } from "@reduxjs/toolkit";

export const loginLoading = createAction("auth/loading");

export const loginResolved = createAction("auth/resolved", (jwt) => ({
  payload: { jwt },
}));

export const loginRejected = createAction("auth/rejected", (status, error) => ({
  payload: { status, error },
}));

export const logout = createAction("auth/logout");

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginLoading());

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

      if (res.ok) {
        dispatch(loginResolved(data.body.token));
      } else {
        dispatch(loginRejected(data.status, data.message));
      }
    } catch (error) {
      dispatch(loginRejected(500, error));
    }
  };
};

const initialState = {
  jwt: "",
  isLoggedIn: false,
  error: "",
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(loginLoading, (draft) => {
      draft.error = "";
    })
    .addCase(loginResolved, (draft, action) => {
      draft.jwt = action.payload.jwt;
      draft.isLoggedIn = true;
    })
    .addCase(loginRejected, (draft, action) => {
      draft.error = `Erreur ${action.payload.status}: ${action.payload.error}`;
    })
    .addCase(logout, (draft) => {
      draft.jwt = "";
      draft.isLoggedIn = false;
    })
);
