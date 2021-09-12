import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
const { mount } = require("enzyme");

import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import { AppRouter } from "../../routers/AppRouter";
import { login } from "../../actions/auth";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";
import Swal from "sweetalert2";

const firebaseConfigTesting = {
  apiKey: "AIzaSyAgAv0qe9tCTp--181fvNK-8MnC-D3dxuo",
  authDomain: "react-example-f0257.firebaseapp.com",
  projectId: "react-example-f0257",
  storageBucket: "react-example-f0257.appspot.com",
  messagingSenderId: "237530604713",
  appId: "1:237530604713:web:212ba05ddbea8ddf9335b8",
};

initializeApp(firebaseConfigTesting);

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));
jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: "ABC",
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas en <AppRouter/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test("debe de llamar el login si estoy autenticado", async () => {
    const auth = getAuth();
    let user;

    const userCred = await signInWithEmailAndPassword(
      auth,
      "testing@test.com",
      "1234567"
    );
    user = userCred.user;
    console.log(user.uid);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );
  });
});
