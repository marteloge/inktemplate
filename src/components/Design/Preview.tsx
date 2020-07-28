import { TextDesign } from "../../types";

import { imageRoute, calculateResponsiveSize } from "./../../../src/global";

type Props = {
  nameText: TextDesign;
  subText: TextDesign;
  width: number;
  height: number;
  useDesign: boolean;
  selectedDesign: string;
  backgroundColor?: string;
};
const Preview = (props: Props) => {
  const {
    width,
    height,
    nameText,
    subText,
    selectedDesign,
    useDesign,
    backgroundColor,
  } = props;

  return (
    <div id="preview">
      <div id="canvas">
        <p id="text1">{nameText.text}</p>
        <p id="text2">{subText.text}</p>
      </div>
      <style jsx>{`
        #canvas {
          height: ${calculateResponsiveSize(height * 0.75, height)};
          width: ${calculateResponsiveSize(width * 0.75, width)};

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          background-image: ${
            useDesign
              ? `url(${imageRoute + selectedDesign}-small.jpg);`
              : "none;"
          }
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          // border: rgb(0,0,0, 0.1) 1px solid;
          box-shadow: 2px 2px 4px rgb(0,0,0, 0.3);
          background-color: ${!useDesign ? `${backgroundColor}` : "initial"}
        }
        
        #text1 {
          font-family: ${nameText.font};
          color: ${nameText.color};
          font-size: 35px;
        }

        #text2 {
          font-family: ${subText.font};
          color: ${subText.color};
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default Preview;
