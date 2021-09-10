import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import { initializeApp } from "firebase/app";

const firebaseConfigTesting = {
  apiKey: "AIzaSyAgAv0qe9tCTp--181fvNK-8MnC-D3dxuo",
  authDomain: "react-example-f0257.firebaseapp.com",
  projectId: "react-example-f0257",
  storageBucket: "react-example-f0257.appspot.com",
  messagingSenderId: "237530604713",
  appId: "1:237530604713:web:212ba05ddbea8ddf9335b8",
};

initializeApp(firebaseConfigTesting);

import "@testing-library/jest-dom";
const {
  logout,
  login,
  startLogout,
  startLoginEmailPassword,
} = require("../../actions/auth");
const { types } = require("../../types/types");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe("Pruebas con la acciones de Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test("login y logout crean la accion respectiva", () => {
    const logoutAction = logout();
    expect(logoutAction).toEqual({
      type: types.logout,
    });

    const loginAction = login("Test", "Murcielago");
    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid: "Test",
        displayName: "Murcielago",
      },
    });
  });

  test("debe de realizar startLogout ", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout,
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("debe de iniciar startLoginEmailPassword ", async () => {
    await store.dispatch(startLoginEmailPassword("test@test.com", "1234567"));
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "RKh0BNhc2DMRHkHUPRuG82cCa7n2",
        displayName: null,
      },
    });
  });
});
