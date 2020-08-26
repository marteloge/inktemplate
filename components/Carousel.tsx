import { withTranslation } from "../helpers/i18n";
import { newCanvas } from "../helpers/products";

import Canvas from "./Canvas";
import products from "../pages/products";
import { cardDesigns } from "../helpers/global";

const Carousel = (props) => {
  const { t } = props;

  const texts = [t("product:nameText"), t("product:subText")];

  return (
    <div className="carousel">
      <div className="scroll right">
        <p>{">"}</p>
      </div>
      <div className="scroll left">
        <p>{"<"}</p>
      </div>
      <div className="examples">
        {cardDesigns.map((t, i) => (
          <Canvas
            key={i}
            {...newCanvas({
              texts,
              selectedDesign: "template" + (i + 1),
            })}
          ></Canvas>
        ))}
      </div>

      <style jsx>{`
        .scroll {
          position: absolute;
          padding: 10px;
          width: 2%;
          background-color: #f2eeeb;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px 10px rgb(242, 238, 235);
          z-index: 2;
        }

        .scroll.left {
          left: 0;
          border-top-right-radius: 100px;
          border-bottom-right-radius: 100px;
        }

        .scroll.right {
          right: 0;
          border-top-left-radius: 100px;
          border-bottom-left-radius: 100px;
        }

        .scroll p {
          height: 100%;
          font-size: 20px;
          color: #726a61;
        }

        .carousel {
          width: 100%;
          margin: 5% 0;
          padding-bottom: 1%;
          display: flex;
          overflow-y: scroll;
          justify-content: space-between;
          align-items: center;
        }

        .carousel::-webkit-scrollbar {
          display: none;
        }

        .examples {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default withTranslation("common")(Carousel);
