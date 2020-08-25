import { calculateResponsiveSize } from "../helpers/global";
import { withTranslation } from "../helpers/i18n";

const NameList = (props) => {
  const { list, handler, width, t } = props;

  return (
    <div id="names">
      <h2>{t("product:textHeader")}</h2>
      <textarea
        value={list}
        onChange={(e) => handler(e.target.value)}
      ></textarea>

      <style jsx>{`
        #names {
        }

        textarea {
          width: ${calculateResponsiveSize(width * 0.75, width)};
          height: ${calculateResponsiveSize(150, 240)};
          border: none;
          border-radius: 5px;
          padding: 10px;
        }
        @media (max-width: 850px) {
          width: 100%;

          textarea {
            width: 94%;
          }
        }
      `}</style>
    </div>
  );
};

export default withTranslation("common")(NameList);
