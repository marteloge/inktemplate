import { Content } from "../helpers/types";

import { imageRoute, calculateResponsiveSize } from "../helpers/global";

type Props = {
  width: number;
  height: number;
  useDesign: boolean;
  selectedDesign: number;
  backgroundColor?: string;
  content?: Array<Content>;
  text?: string;
  scale: number;
  opacity?: number;
};

const Canvas = (props: Props) => {
  const {
    content,
    selectedDesign,
    useDesign,
    backgroundColor,
    scale,
    opacity,
  } = props;

  const width = props.width * scale;
  const height = props.height * scale;

  return (
    <div className="preview">
      <div id="canvas">
        {useDesign && (
          <img src={`${imageRoute}/template${selectedDesign}-small.jpg`}></img>
        )}
        {!useDesign && <div className="background"></div>}
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
            background-color: white;
          }

          .background {
            height: ${calculateResponsiveSize(height * 0.75, height)};
            width: ${calculateResponsiveSize(width * 0.75, width)};
            background-color: ${backgroundColor};
            opacity: ${opacity || 1};
          }

          #canvas .text {
            position: absolute;
            text-align: center;
          }

          img {
            height: ${calculateResponsiveSize(height * 0.75, height)};
            width: ${calculateResponsiveSize(width * 0.75, width)};
            position: relative;
            opacity: ${opacity || 1};
          }
        `}
      </style>
    </div>
  );
};

export default Canvas;
