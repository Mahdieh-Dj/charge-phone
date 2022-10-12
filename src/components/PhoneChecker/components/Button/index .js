export function Button({ text, className, handleOnClick }) {
  return (
    <button className={className} onClick={handleOnClick}>
      {text}
    </button>
  );
}
