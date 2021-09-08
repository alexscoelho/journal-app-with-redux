const {
  setError,
  removeError,
  startLoading,
  finishLoading,
} = require("../../actions/ui");
const { types } = require("../../types/types");

describe("pruebas en ui - actions", () => {
  test("todas las acciones deben de crearse", () => {
    const action = setError("Help");
    expect(action).toEqual({
      type: types.uiSetError,
      payload: "Help",
    });

    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError,
    });
    expect(startLoadingAction).toEqual({
      type: types.uiStartLoading,
    });
    expect(finishLoadingAction).toEqual({
      type: types.uiFinishLoading,
    });
  });
});
