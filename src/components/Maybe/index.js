export default function Maybe({ condition, children }) {
  return <>{condition && children}</>;
}
