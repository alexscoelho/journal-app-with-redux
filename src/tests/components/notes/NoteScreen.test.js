import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
const { mount } = require("enzyme");

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { activeNote } from "../../../actions/notes";

import { Sidebar } from "../../../components/journal/Sidebar";
import { NoteScreen } from "../../../components/notes/NoteScreen";

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
    active: {
      id: 123,
      title: "hola",
      body: "mundo",
      date: 0,
    },
  },
};

jest.mock("../../../actions/notes", () => ({
  activeNote: jest.fn(),
}));

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <NoteScreen />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en <NoteScreen />", () => {
  test("debe de mostrarse correctamente ", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("debe de disparar el activeNote", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola de nuevo",
      },
    });
    expect(activeNote).toHaveBeenLastCalledWith(123, {
      body: "mundo",
      title: "Hola de nuevo",
      id: 123,
      date: 0,
    });
  });
});
