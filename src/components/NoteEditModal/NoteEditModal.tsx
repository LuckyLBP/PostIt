import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { NoteInterface } from "../Interface/interfaceNote";
import { Textarea } from "../Textarea/Textarea";

export const NoteEditModal = ({
  onClose,
  note,
  setNotes,
  updateNoteInFirestore,
}: Props) => {
  const [message, setMessage] = useState(note.message);

  const onMessageChange = (value: string) => {
    setMessage(value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedMessage = message.trim();
    if (updatedMessage) {
      updateNoteInFirestore(note.id, updatedMessage)
        .then(() => {
          setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((n) =>
              n.id === note.id ? { ...n, message: updatedMessage } : n
            );
            return updatedNotes;
          });
          onClose();
        })
        .catch((error) => {
          console.error("Error updating note: ", error);
        });
    }
  };

  return (
    <div className="editContainer">
      <div className="deleteBackground"></div>
      <form onSubmit={onSubmit}>
        <div className="editCard">
          <header className="editHeader">
            <p className="editTitle">Redigera</p>
            <button
              type="button"
              className="delete"
              aria-label="close"
              onClick={onClose}
            ></button>
          </header>
          <section className="editBody">
            <Textarea value={message} onChange={onMessageChange} />
          </section>

          <footer className="editFooter">
            <button
              type="submit"
              className="saveBtn"
              disabled={!message.trim()}
            >
              Spara
            </button>
            <button type="button" className="cancelBtn">
              Avbryt
            </button>
          </footer>
        </div>
      </form>
    </div>
  );
};

interface Props {
  onClose: () => void;
  note: NoteInterface;
  setNotes: Dispatch<SetStateAction<NoteInterface[]>>;
  updateNoteInFirestore: (noteId: string, newMessage: string) => Promise<void>;
}
