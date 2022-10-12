import irancell from "../../../../images/mtn.png";
import hamrah from "../../../../images/hamrah.png";
import rightel from "../../../../images/rightel.png";

const imgList = { irancell, hamrah, rightel };
export default function Img({ alt, src, handleOnClick }) {
  return (
    <img
      alt={alt}
      src={imgList[src]}
      className="logo-img"
      onClick={handleOnClick}
    />
  );
}
