import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";


export const loadNotes = async (uid) => {
  const notesSnap = await getDocs(collection(getFirestore(), `${uid}/journal/notes`));
  const notes = [];

  notesSnap.forEach((snapHijo) => {
    notes.push({
      id: snapHijo.id,
      ...snapHijo.data(),
    });
  });
  return notes;
};
