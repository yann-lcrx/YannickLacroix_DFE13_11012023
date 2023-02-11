import { createAction, createReducer } from "@reduxjs/toolkit";

export const profileLoading = createAction("user/profile/loading");

export const profileResolved = createAction(
  "user/profile/resolved",
  (firstName, lastName) => ({
    payload: { firstName, lastName },
  })
);

export const profileRejected = createAction(
  "user/profile/rejected",
  (status, error) => ({
    payload: { status, error },
  })
);

export const nameChangeLoading = createAction("user/name/loading");

export const nameChangeResolved = createAction(
  "user/name/resolved",
  (firstName, lastName) => ({
    payload: { firstName, lastName },
  })
);

export const nameChangeRejected = createAction(
  "user/name/rejected",
  (status, error) => ({
    payload: { status, error },
  })
);

export const getProfile = () => {
  return async (dispatch, getState) => {
    dispatch(profileLoading());

    const state = getState();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_PATH}/user/profile`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${state.auth.jwt}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        dispatch(profileResolved(data.body.firstName, data.body.lastName));
      } else {
        dispatch(profileRejected(data.status, data.error));
      }
    } catch (error) {
      dispatch(profileRejected(500, error));
    }
  };
};

export const updateName = (firstName, lastName) => {
  return async (dispatch, getState) => {
    dispatch(nameChangeLoading());

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
            Authorization: `Bearer ${state.auth.jwt}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        dispatch(nameChangeResolved(data.body.firstName, data.body.lastName));
      } else {
        dispatch(nameChangeRejected(data.status, data.message));
      }
    } catch (error) {
      dispatch(nameChangeRejected(500, error));
    }
  };
};

const initialState = {
  firstName: "",
  lastName: "",
  profileError: "",
  nameChangeError: "",
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(profileLoading, (draft) => {
      draft.profileError = "";
      draft.nameChangeError = "";
      return;
    })
    .addCase(profileResolved, (draft, action) => {
      draft.firstName = action.payload.firstName;
      draft.lastName = action.payload.lastName;
      return;
    })
    .addCase(profileRejected, (draft, action) => {
      draft.profileError = `Erreur ${action.payload.status} lors de la récupération de l'utilisateur: ${action.payload.error}. Veuillez réessayer.`;
      return;
    })
    .addCase(nameChangeLoading, (draft) => {
      draft.nameChangeError = "";
      return;
    })
    .addCase(nameChangeResolved, (draft, action) => {
      draft.firstName = action.payload.firstName;
      draft.lastName = action.payload.lastName;
      return;
    })
    .addCase(nameChangeRejected, (draft, action) => {
      draft.nameChangeError = `Erreur ${action.payload.status} lors de la modification de l'utilisateur: ${action.payload.error}. Veuillez réessayer.`;
      return;
    })
);
