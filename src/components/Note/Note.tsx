
export const Note = ({message, onEdit, onDelete}: Props) => {
  return (
    <div className="note">
        <div className="warning">
            <button className="deleteBtnFront" onClick={onDelete} type="button">X</button>
            {message.split('\n').map((text, index) => text === '' ? (
                <p key={index} style={{height: '16px'}}/>
            ) : (
                <p key={index}>{text}</p>
            ))}
            <div>
                <button className="editBtn" onClick={onEdit} type="button">Redigera</button>
            </div>
        </div>
    </div>
  )
}

interface Props {
    message: string;
    onDelete: () => void;
    onEdit: () => void;
}