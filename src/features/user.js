import { createAction, createReducer } from "@reduxjs/toolkit";

// export const login = createAction("user/login", (jwt, firstName, lastName) => ({
//   payload: { jwt, firstName, lastName },
// }));
export const userloading = createAction("user/loading");
export const loginResolved = createAction("login/resolved", (jwt) => ({
  payload: { jwt },
}));
export const userRejected = createAction("user/rejected", (error) => ({
  payload: { error },
}));

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
      console.log("c'est bon");
    } catch (error) {
      dispatch(userRejected(error));
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
  builder.addCase(loginResolved, (draft, action) => {
    draft.jwt = action.payload.jwt;
    draft.isLoggedIn = true;
    return;
  })
);
