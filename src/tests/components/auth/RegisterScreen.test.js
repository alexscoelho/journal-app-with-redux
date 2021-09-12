import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
const { mount } = require("enzyme");

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    notes: [],
    active: null,
  },
};

let store = mockStore(initState);

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("pruebas en el <RegisterScreen/>", () => {
  const event = { preventDefault: () => {} };
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  test("debe de mostrar el componente haciendo match", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de hacer el dispatch de la accion repectiva", () => {
    const emailField = wrapper.find('input[name="email"]');
    emailField.simulate("change", {
      target: {
        value: "",
        name: "email",
      },
    });
    wrapper.find("form").simulate("submit", { preventDefault() {} });
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  test("debe de mostrar la caja de alerta con el error", () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: "Email no es correcto",
      },
      notes: {
        notes: [],
        active: null,
      },
    };

    const store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
    expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
      initState.ui.msgError
    );
  });
});
