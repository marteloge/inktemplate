import { withTranslation } from "../helpers/i18n";
import { useState } from "react";
import { filters } from "../helpers/global";

const DesignImagePreview = (props) => {
  const { setSelectedDesign, width, height, t } = props;

  const [filter, setFilter] = useState("abstract");

  return (
    <div className="designs">
      <div className="filters">
        {Object.getOwnPropertyNames(filters).map((f, i) => (
          <button
            className={filter === f ? "selected" : ""}
            key={i}
            onClick={() => setFilter(f)}
          >
            {t(`product:filter.${f}`)}
          </button>
        ))}
      </div>
      <div className="images">
        {filters[filter].map((imgNum, index) => (
          <img
            src={`/static/templates/template${imgNum}-small.jpg`}
            className="img"
            key={index}
            onClick={() => {
              setSelectedDesign(imgNum);
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .designs {
          display: flex;
          justify-content: center;
          flex-direction: column;
          padding: 5%;
          padding-bottom: 80px;
        }

        .filters,
        .images {
          margin: 1% 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        img {
          width: ${width * 0.37}px;
          height: ${height * 0.37}px;
          margin: 1px 2px 1px 0;
          border: 1px solid #f2eeeb;
          cursor: pointer;
        }

        button {
          border: none;
          margin-right: 5px;
        }

        .selected,
        button:hover {
          background-color: transparent;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};

export default withTranslation(["common", "product"])(DesignImagePreview);
