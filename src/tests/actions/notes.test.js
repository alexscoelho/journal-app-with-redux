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

import { doc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { startNewNote } from "../../actions/notes";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: {
    uid: "TESTING",
  },
});

describe("Pruebas con las acciones de notes", () => {
  test("debe de crear una nueva nota startNewNote", async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });

    const documentId = actions[0].payload.id;
    const uid = store.getState().auth.uid;
    await deleteDoc(doc(getFirestore(), `${uid}/journal/notes/${documentId}`));
  });
});
