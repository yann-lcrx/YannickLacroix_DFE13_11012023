import { createAction, createReducer } from "@reduxjs/toolkit";

export const loginResolved = createAction("auth/resolved", (jwt) => ({
  payload: { jwt },
}));

export const loginRejected = createAction("auth/rejected", (error) => ({
  payload: { error },
}));

export const logout = createAction("auth/logout");

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

const initialState = {
  jwt: "",
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
);
