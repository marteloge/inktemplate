import { cardDesigns } from "./../../global";

type Props = {
  setSelectedDesign: Function;
  width: number;
  height: number;
};

const DesignImagePreview = (props: Props) => (
  <div>
    {cardDesigns.map((imgSrc, index) => (
      <img
        key={index}
        onClick={() => props.setSelectedDesign(imgSrc)}
        src={require("../../../public/static/images/" + imgSrc + "-small.jpg")}
      />
    ))}

    <style jsx>{`
      img {
        width: ${props.width * 0.5}px;
        height: ${props.height * 0.5}px;
        margin: 1px 2px;
        border: 1px solid white;
      }

      img:hover {
        border: 1px solid black;
      }
    `}</style>
  </div>
);

export default DesignImagePreview;
