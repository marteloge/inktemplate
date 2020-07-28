import { Dispatch } from "react";

import { cardDesigns, imageRoute } from "./../../global";

type Props = {
  setUseDesign: Function;
  useDesign: boolean;
};
const Switch = (props: Props) => (
  <div id="switch">
    <button className="pattern" onClick={() => props.setUseDesign(true)}>
      Pattern
    </button>
    <button className="color" onClick={() => props.setUseDesign(false)}>
      Color
    </button>
    <style jsx>{`
      #switch button {
        width: 100px;
        height: 100px;
        border-radius: 100px;
        margin-right: 10px;
        outline: none;
        cursor: pointer;
        border: none;
      }

      #switch button:hover {
        box-shadow: 3px 3px 3px rgb(0, 0, 0, 0.5);
      }

      .pattern {
        box-shadow: ${props.useDesign ? "3px 3px 3px rgb(0,0,0,0.3)" : "none"};
        background-image: url(${imageRoute + cardDesigns[3] + "-small.jpg"});
      }

      .color {
        box-shadow: ${!props.useDesign ? "3px 3px 3px rgb(0,0,0,0.3)" : "none"};
        background-color: #2fc1b0;
      }
    `}</style>
  </div>
);

export default Switch;
