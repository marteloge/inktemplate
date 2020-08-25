import { imageRoute } from "../helpers/global";
import { withTranslation } from "../helpers/i18n";

const Switch = (props) => {
  const { setUseDesign, useDesign, color, image, t } = props;

  return (
    <div id="switch">
      <button className="color" onClick={() => setUseDesign(false)}>
        {t("product:color")}
      </button>
      <button className="pattern" onClick={() => setUseDesign(true)}>
        {t("product:pattern")}
      </button>

      <style jsx>{`
        #switch {
          margin: 0 0 20px 10%;
        }

        #switch button {
          width: 150px;
          height: 80px;
          border-radius: 5px;
          outline: none;
          cursor: pointer;
          border: none;
          padding: 0;
          margin: 0 20px 0 5px;
        }

        #switch button:hover {
          box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.6);
        }

        .pattern {
          box-shadow: ${useDesign ? "4px 4px 4px rgb(0,0,0,0.6)" : "none"};
          background-image: url(${imageRoute + image + "-small.jpg"});
        }

        .color {
          box-shadow: ${!useDesign ? "4px 4px 4px rgb(0,0,0,0.6)" : "none"};
          background-color: ${color};
        }

        @media (max-width: 850px) {
          #switch {
            display: flex;
            margin: 0;
            flex-direction: row;
            width: 95%;
            margin: 5% 0;
            justify-content: start;
          }
          #switch button {
            height: 45px;
            margin: 0;
            margin-right: 3%;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation("common")(Switch);
