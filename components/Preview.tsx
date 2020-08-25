import { imageRoute } from "../helpers/global";

type Props = {
  width: number;
  height: number;
  list: string;
  color: string;
  image: string;
  useDesign: boolean;
};

const Preview = (props: Props) => {
  const { width, height, list, color, image, useDesign } = props;

  return (
    <div>
      {list.endsWith(";") &&
        list
          .slice(0, list.length - 1)
          .split(";")
          .map((c, i) => {
            return (
              <div className="card" key={i}>
                <p>{c.split(",")[0]}</p>
                <p>{c.split(",")[1]}</p>
              </div>
            );
          })}

      <style jsx>{`
        display: flex;

        .card {
          margin-right: 10px;
          width: ${width * 0.5}px;
          height: ${height * 0.5}px;
          background-color: ${useDesign ? "none" : color};
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          background-image: ${useDesign
            ? `url(${imageRoute + image}-small.jpg)`
            : "none"};
        }

        @media (max-width: 850px) {
          .card {
            width: ${width * 0.1}px;
            height: ${height * 0.1}px;
          }
        }
      `}</style>
    </div>
  );
};

export default Preview;
