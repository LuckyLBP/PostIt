export const Textarea = ({
  value,
  onChange,
  limit = 80,
  placeholder = "Skriv något...",
}: Props) => {
  return (
    <>
      <textarea
        maxLength={limit}
        className="textarea"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <p className="lettersLeft">Tecken kvar: {limit - value.length}</p>
    </>
  );
};

interface Props {
  value: string;
  onChange: (value: string) => void;
  limit?: number;
  placeholder?: string;
}
