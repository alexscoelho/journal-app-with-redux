import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { activeNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title } = formValues;
  const dispatch = useDispatch();

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);

  return (
    <div className='notes__main-content'>
      <NotesAppBar />

      <div className='notes__content'>
        <input
          type='text'
          placeholder='Some awesome title'
          className='notes__title-input'
          value={title}
          onChange={handleInputChange}
          name='title'
        />

        <textarea
          placeholder='What happened today?'
          className='notes__textarea'
          value={body}
          onChange={handleInputChange}
          name='body'
        ></textarea>
        {note.url && (
          <div className='notes__image'>
            <img
              src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
              alt='note'
            />
          </div>
        )}
      </div>
    </div>
  );
};
