import { Content } from "../helpers/types";

import { imageRoute, calculateResponsiveSize } from "../helpers/global";

type Props = {
  width: number;
  height: number;
  useDesign: boolean;
  selectedDesign: string;
  backgroundColor?: string;
  content?: Array<Content>;
  text?: string;
  scale: number;
};

const Canvas = (props: Props) => {
  const { content, selectedDesign, useDesign, backgroundColor, scale } = props;

  const width = props.width * scale;
  const height = props.height * scale;

  return (
    <div className="preview">
      <div id="canvas">
        {useDesign && (
          <img src={`${imageRoute + selectedDesign}-small.jpg`}></img>
        )}
        <div className="text">
          {content &&
            content.map((c, i) => (
              <p
                key={i}
                style={{
                  fontFamily: c.font,
                  fontSize: c.fontSize * scale,
                  color: c.color,
                }}
              >
                {c.text}
              </p>
            ))}
        </div>
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

            box-shadow: 2px 2px 4px rgb(0, 0, 0, 0.3);
            background-color: ${!useDesign ? `${backgroundColor}` : "initial"};
          }

          #canvas .text {
            position: absolute;
            text-align: center;
          }

          img {
            height: ${calculateResponsiveSize(height * 0.75, height)};
            width: ${calculateResponsiveSize(width * 0.75, width)};
            position: relative;
          }
        `}
      </style>
    </div>
  );
};

export default Canvas;
