/** * @jest-environment node */

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

import {
  doc,
  deleteDoc,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
} from "../../actions/notes";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TESTING",
  },
};

let store = mockStore(initState);

describe("Pruebas con las acciones de notes", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
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

  test("startloadingnotes debe cargar las notas", async () => {
    await store.dispatch(startLoadingNotes("TESTING"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
    };
    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test("startSaveNote debe de actualizar la nota ", async () => {
    const note = {
      id: "5mUdK9pOiFyNXPmL7ldr",
      title: "Nuevo Title",
      body: "body",
    };

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    expect(actions[0].type).toBe(types.notesUpdated);

    const notes = [];
    const docRef = await getDocs(
      collection(getFirestore(), `TESTING/journal/notes`)
    );

    docRef.forEach((snapHijo) => {
      notes.push({
        id: snapHijo.id,
        ...snapHijo.data(),
      });
    });

    const currentNote = notes.filter((_note) => _note.id === note.id);
    expect(currentNote[0].title).toBe(note.title);
  });
});
