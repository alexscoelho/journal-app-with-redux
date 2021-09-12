import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
const { mount } = require("enzyme");

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { activeNote } from "../../../actions/notes";
import { JournalEntry } from "../../../components/journal/JournalEntry";

import { NoteScreen } from "../../../components/notes/NoteScreen";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const nota = {
  id: 10,
  date: 10,
  title: "hola",
  body: "mundo",
  url: "https://algunlugar.com/foto.jpg",
};

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <JournalEntry {...nota} />
    </MemoryRouter>
  </Provider>
);

describe("Pruebas en el <JournalEntry /> ", () => {
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de activar la nota", () => {
    wrapper.find(".journal__entry").prop("onClick")();
    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(nota.id, { ...nota })
    );
  });
});
