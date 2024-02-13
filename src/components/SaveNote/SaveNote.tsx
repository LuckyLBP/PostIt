import { FormEvent, Dispatch, SetStateAction, useState } from "react";
import { NoteInterface } from "../Interface/interfaceNote";
import { Textarea } from "../Textarea/Textarea";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface Props {
  setNotes: Dispatch<SetStateAction<NoteInterface[]>>;
  saveCallback: () => void; 
}

export const SaveNote = ({ saveCallback }: Props) => {
  const [message, setMessage] = useState("");

  const onMessageChange = (value: string) => {
    setMessage(value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim() === "") return;

    // Check if note already exists
    const notesQuery = query(collection(db, "Notedb"), where("message", "==", message.trim()));
    const notesSnapshot = await getDocs(notesQuery);
    if (!notesSnapshot.empty) {
      console.log("Note already exists in Firestore");
      return;
    }

    // Save the note to Firestore
    try {
      const docRef = await addDoc(collection(db, "Notedb"), {
        message: message.trim(),
        id: `note-${Date.now()}`,
      });
      console.log("Note added to Firestore with ID:", Date.now());

      setMessage(""); 
      saveCallback(); 
    } catch (error) {
      console.error("Error saving note to Firestore:", error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Textarea value={message} onChange={onMessageChange} />
      <button type="submit" className="saveBtn" disabled={message.trim() === ""}>
        Spara
      </button>
    </form>
  );
};

export default SaveNote;
