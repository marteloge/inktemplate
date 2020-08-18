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
          height: 240px;
          border: none;
          border-radius: 5px;
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default withTranslation("common")(NameList);
