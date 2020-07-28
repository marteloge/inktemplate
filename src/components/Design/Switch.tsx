import { imageRoute } from "./../../global";

type Props = {
  setUseDesign: Function;
  useDesign: boolean;
  color: string;
  image: string;
};
const Switch = (props: Props) => (
  <div id="switch">
    <button className="color" onClick={() => props.setUseDesign(false)}>
      Color
    </button>
    <button className="pattern" onClick={() => props.setUseDesign(true)}>
      Pattern
    </button>

    <style jsx>{`
      #switch {
        margin: 0 0 20px 10%;
      }

      #switch button {
        width: 150px;
        height: 80px;
        border-radius: 10px;
        outline: none;
        cursor: pointer;
        border: none;
        padding: 0;
        margin: 0 20px 0 5px;
        border: 1px solid rgb(0, 0, 0, 0.1);
      }

      #switch button:hover {
        box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.6);
        border: 1px solid rgb(0, 0, 0, 0.6);
      }

      .pattern {
        box-shadow: ${props.useDesign ? "4px 4px 4px rgb(0,0,0,0.6)" : "none"};
        background-image: url(${imageRoute + props.image + "-small.jpg"});
      }

      .color {
        box-shadow: ${!props.useDesign ? "4px 4px 4px rgb(0,0,0,0.6)" : "none"};
        background-color: ${props.color};
      }
    `}</style>
  </div>
);

export default Switch;
