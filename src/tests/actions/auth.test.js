import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

import "@testing-library/jest-dom";
const { logout, login, startLogout } = require("../../actions/auth");
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
    console.log(actions);
  });
});
