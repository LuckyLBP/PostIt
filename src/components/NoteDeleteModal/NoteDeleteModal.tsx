export const NoteDeleteModal = ({
  onClose,
  onDelete,
  DeleteNoteInFirestore,
}: Props) => {
  const handleDelete = async () => {
    if (onDelete) onDelete();
    if (DeleteNoteInFirestore) {
      await DeleteNoteInFirestore();
    }
  };

  return (
    <div className="delContainer">
      <div className="deleteBackground"></div>
      <div className="delCard">
        <header className="delHeader">
          <p className="delCardTitle">Radera Anteckning</p>
          <button
            className="closeBtn"
            aria-label="close"
            onClick={onClose}
            type="button"
          ></button>
        </header>

        <section className="delCardBody">
          <p>Är du säker du vill radera anteckningen?</p>
        </section>

        <footer className="delCardFooter">
          <button className="deleteBtn" onClick={handleDelete}>
            Radera
          </button>
          <button className="cancelBtn" onClick={onClose}>Avbryt</button>
        </footer>
      </div>
    </div>
  );
};

interface Props {
  onClose: () => void;
  onDelete: () => void;
  DeleteNoteInFirestore: () => Promise<void>;
}
