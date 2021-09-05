import Swal from "sweetalert2";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { logoutCleaning } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        Swal.fire("Error", e.message, "error");
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, {
          displayName: name,
        });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => {
        console.log(e);
        Swal.fire("Error", e.message, "error");
      });
  };
};

// thunk, asynchronous
export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

// thunk, asynchronous
export const startLogout = () => {
  const auth = getAuth();
  return async (dispatch) => {
    await auth.signOut();
    dispatch(logout());
    dispatch(logoutCleaning());
  };
};

export const logout = () => ({
  type: types.logout,
});
