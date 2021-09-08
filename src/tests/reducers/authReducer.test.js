const { authReducer } = require("../../reducers/authReducer");
const { types } = require("../../types/types");

describe("Pruebas en el authReducer", () => {
  test("debe de realizar el login ", () => {
    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: "abc",
        displayName: "Pepito",
      },
    };

    const state = authReducer(initState, action);
    expect(state).toEqual({
      uid: "abc",
      name: "Pepito",
    });
  });

  test("debe de hacer logout", () => {
    const initState = { uid: "abc", name: "Pepito" };

    const action = {
      type: types.logout,
    };

    const state = authReducer(initState, action);
    expect(state).toEqual({});
  });

  test("no debe de hacer cambio en el state", () => {
    const initState = { uid: "abjbjhc", name: "Pepito" };

    const action = {
      type: "jhsdjhsd",
    };

    const state = authReducer(initState, action);
    expect(state).toEqual(initState);
  });
});
