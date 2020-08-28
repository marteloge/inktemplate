import { imageRoute } from "../helpers/global";
import { withTranslation } from "../helpers/i18n";

const Switch = (props) => {
  const { setUseDesign, setPopup, useDesign, color, image, t } = props;

  return (
    <div id="switch">
      <button className="color" onClick={() => setUseDesign(false)}>
        {t("product:color")}
      </button>
      <button
        className="pattern"
        onClick={() => {
          setPopup(true);
          setUseDesign(true);
        }}
      >
        {t("product:pattern")}
      </button>

      <style jsx>{`
        #switch button {
          width: 48%;
          height: 80px;
          border-radius: 5px;
          outline: none;
          cursor: pointer;
          border: none;
          padding: 0;
        }

        #switch button:hover {
          box-shadow: 4px 4px 4px rgb(0, 0, 0, 0.6);
        }

        .pattern {
          box-shadow: ${useDesign ? "4px 4px 4px rgb(0,0,0,0.6)" : "none"};
          background-image: url(${imageRoute}/template${image}-small.jpg);
          background-position: center;
        }

        .color {
          box-shadow: ${!useDesign ? "4px 4px 4px rgb(0,0,0,0.6)" : "none"};
          background-color: ${color};
        }

        @media (max-width: 850px) {
          #switch {
            margin-top: 5%;
          }

          #switch button {
            height: 60px;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation("common")(Switch);
