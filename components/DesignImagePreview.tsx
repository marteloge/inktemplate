import { cardDesigns } from "../helpers/global";
import { withTranslation } from "../helpers/i18n";

const DesignImagePreview = (props) => {
  const { setSelectedDesign, width, height, t } = props;

  return (
    <div className="designs">
      {cardDesigns.map((imgSrc, index) => (
        <img
          src={`/static/templates/${imgSrc}-small.jpg`}
          className="img"
          key={index}
          onClick={() => {
            setSelectedDesign(imgSrc);
          }}
        />
      ))}
      <style jsx>{`
        .designs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 5%;
        }

        img {
          width: ${width * 0.37}px;
          height: ${height * 0.37}px;
          margin: 1px 2px 1px 0;
          border: 1px solid #f2eeeb;
        }
      `}</style>
    </div>
  );
};

export default withTranslation("common")(DesignImagePreview);
