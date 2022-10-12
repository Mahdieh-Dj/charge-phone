import { useState, memo } from "react";

function RadioBtn({ name, index, children, checked }) {
  const [value, setValue] = useState(checked ? 1 : 0);
  function handleChange() {
    setValue((prev) => !prev);
  }
  return (
    <>
      <input
        type={"radio"}
        name={name}
        id={`${name}_${index}`}
        className="input-hidden"
        checked={checked}
        value={value}
        onChange={handleChange}
      />
      <label htmlFor={`${name}_${index}`}>{children}</label>
    </>
  );
}
export default memo(RadioBtn);
