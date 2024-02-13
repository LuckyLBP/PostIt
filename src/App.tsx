// Import React
import { useState, useEffect } from "react";

// Import Components
import { Note } from "./components/Note/Note";
import { NoteInterface } from "./components/Interface/interfaceNote";
import { SaveNote } from "./components/SaveNote/SaveNote";
import { NoteDeleteModal } from "./components/NoteDeleteModal/NoteDeleteModal";
import { NoteEditModal } from "./components/NoteEditModal/NoteEditModal";

// Import Firebase/Firestore
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

//////////////////////////

function App() {
  const [Notes, setNotes] = useState<NoteInterface[]>([]);
  const [noteToDelete, setNoteToDelete] = useState<NoteInterface | null>(null);
  const [noteToEdit, setNoteToEdit] = useState<NoteInterface | null>(null);


  // Open Delete Modal
  const onNoteDeleteClick = (note: NoteInterface) => {
    setNoteToDelete(note);
  };

  // Close Delete Modal
  const onDeleteModalClose = () => {
    setNoteToDelete(null);
  };

  // Delete Note
  const onNoteDelete = () => {
    if (!noteToDelete) return;
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter(
        (note) => note.id !== noteToDelete.id
      );
      return updatedNotes;
    });
    setNoteToDelete(null);
  };

  // Edit Note
  const onNoteEditClick = (note: NoteInterface) => {
    setNoteToEdit(note);
  };

  // Close Edit Modal
  const onEditModalClose = () => {
    setNoteToEdit(null);
  };

  // Firebase Firestore - Read Notes
  useEffect(() => {
    const q = query(collection(db, "Notedb"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let notesArray: NoteInterface[] = [];
      querySnapshot.forEach((doc) => {

        // Check if the document has a message field
        if (doc.data().message) {
          notesArray.push({
            id: doc.id,
            message: doc.data().message as string
          });
          console.log(doc.data().message);
        }
      });
      setNotes(notesArray);
    });
    return () => unsubscribe();
  }, []);
  

  // Firebase Firestore - Update Note
  const updateNoteInFirestore = async (noteId: string, newMessage: string) => {
    const noteRef = doc(db, "Notedb", noteId);
    await updateDoc(noteRef, {
      message: newMessage
    });
  };

  // Firebase Firestore - Delete Note
  const deleteNoteFromFirestore = async (noteId: string) => {
    const noteRef = doc(db, "Notedb", noteId);
    try {
      await deleteDoc(noteRef);
      console.log(`Note with ID ${noteId} deleted`);
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="title-container">
          <h1 className="title">Notes App</h1>
        </div>
        <div className="notes">
          {Notes.map((note) => (
            <Note
              key={note.id}
              message={note.message}
              onDelete={() => onNoteDeleteClick(note)}
              onEdit={() => onNoteEditClick(note)}
            />
          ))}
          <div className="note-card">
            <div className="note-content">
              <SaveNote
                setNotes={setNotes}
                saveCallback={() => {}}
              />
            </div>
          </div>
        </div>
        {noteToEdit && (
          <NoteEditModal
            note={noteToEdit}
            onClose={onEditModalClose}
            setNotes={setNotes}
            updateNoteInFirestore={updateNoteInFirestore}
          />
        )}
        {noteToDelete && (
          <NoteDeleteModal
            onClose={onDeleteModalClose}
            onDelete={onNoteDelete}
            DeleteNoteInFirestore={() =>
              deleteNoteFromFirestore(noteToDelete.id)
            }
          />
        )}
      </div>
    </>
  );
}

export default App;
