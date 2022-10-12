export default function Heading(props) {
  const style = {
    color: props.color ? props.color : "black",
  };
  return (
    <div>
      <props.variant style={style}>{props.text}</props.variant>
    </div>
  );
}
