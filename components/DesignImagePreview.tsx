import { cardDesigns } from "../helpers/global";
import { withTranslation } from "../helpers/i18n";

const DesignImagePreview = (props) => {
  const { setSelectedDesign, width, height, t } = props;

  return (
    <div id="preview">
      <h2>{t("product:selectDesign")}</h2>

      <div className="content">
        {cardDesigns.map((imgSrc, index) => (
          <img
            key={index}
            onClick={() => setSelectedDesign(imgSrc)}
            src={"/static/images/" + imgSrc + "-small.jpg"}
          />
        ))}
      </div>

      <style jsx>{`
        .content {
          padding: 0 10px 10px 0;
          box-shadow: 2px 2px 3px rgb(0, 0, 0, 0.1);
          height: 250px;
          overflow-y: scroll;
        }

        .content::-webkit-scrollbar {
          -webkit-appearance: none;
        }

        .content::-webkit-scrollbar:vertical {
          width: 5px;
        }

        .content::-webkit-scrollbar-thumb {
          border-radius: 8px;
          border: 3px solid #f2eeeb;
          background-color: rgb(0, 0, 0, 0.4);
        }

        #preview {
          margin-left: 3%;
        }

        img {
          width: ${width * 0.4}px;
          height: ${height * 0.4}px;
          margin: 1px 2px 1px 0;
          border: 1px solid #f2eeeb;
        }

        img:hover {
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
};

export default withTranslation("common")(DesignImagePreview);