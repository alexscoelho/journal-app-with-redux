import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);
  const handleSave = () => {
    dispatch(startSaveNote(active));
  };
  return (
    <div className='notes__appbar'>
      <span>28 de Agosto</span>

      <div>
        <button className='btn'>Picture</button>
        <button onClick={handleSave} className='btn'>
          Save
        </button>
      </div>
    </div>
  );
};
