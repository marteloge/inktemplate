import { TextDesign } from "../../types";

import { imageRoute } from "./../../../src/global";

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
          height: ${height}px;
          width: ${width}px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          ${useDesign &&
          `
            background-image: url(${
              imageRoute + selectedDesign + "-small.jpg"
            });
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          `}

          border: grey 1px solid;

          ${!useDesign &&
          `
            background-color: ${backgroundColor}
          `}
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
