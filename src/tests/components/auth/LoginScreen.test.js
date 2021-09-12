import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
const { mount } = require("enzyme");
const { LoginScreen } = require("../../../components/auth/LoginScreen");

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe("pruebas en el <LoginScreen/>", () => {
  const event = { preventDefault: () => {} };
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  test("debe de mostrar el componente haciendo match", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de disparar la accion de startGoolgeLogin", () => {
    wrapper.find(".google-btn").prop("onClick")();
    expect(startGoogleLogin).toHaveBeenCalled();
  });
  test("debe de disparar startlogin con respectivos argumentos", () => {
    wrapper.find("form").prop("onSubmit")(event);
    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      "alexson@hotmail.com",
      "123456"
    );
  });
});
