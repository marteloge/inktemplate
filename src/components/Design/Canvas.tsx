import { Content } from "../../types";

import { imageRoute, calculateResponsiveSize } from "../../global";
import { withTranslation } from "../../../i18n";

type Props = {
  width: number;
  height: number;
  useDesign: boolean;
  selectedDesign: string;
  backgroundColor?: string;
  content?: Array<Content>;
  text?: string;
};

const Canvas = (props: Props) => {
  const {
    width,
    height,
    content,
    selectedDesign,
    useDesign,
    backgroundColor,
  } = props;

  return (
    <div id="preview">
      <div id="canvas">
        {content &&
          content.map((c, i) => (
            <p
              key={i}
              style={{
                fontFamily: c.font,
                fontSize: c.font_size,
                color: c.color,
              }}
            >
              {c.text}
            </p>
          ))}
      </div>

      <style jsx>
        {`
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
          box-shadow: 2px 2px 4px rgb(0,0,0, 0.3);
          background-color: ${!useDesign ? `${backgroundColor}` : "initial"}
        }        
      `}
      </style>
    </div>
  );
};

export default Canvas;
