import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
const { mount } = require("enzyme");

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";
import { Sidebar } from "../../../components/journal/Sidebar";
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
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  </Provider>
);

jest.mock("../../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));

describe("Pruebas en el <SideBar/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de mostrarse startlogout", () => {
    wrapper.find("button").prop("onClick")();
    expect(startLogout).toHaveBeenCalled();
  });
  test("debe de llamar el start new note", () => {
    wrapper.find(".journal__new-entry").prop("onClick")();
    expect(startNewNote).toHaveBeenCalled();
  });
});
