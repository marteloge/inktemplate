import { imageRoute } from "../../global";

type Props = {
  width: number;
  height: number;
  list: string;
  color: string;
  image: string;
  useDesign: boolean;
};

const Preview = (props: Props) => (
  <div>
    {props.list.endsWith(";") &&
      props.list
        .slice(0, props.list.length - 1)
        .split(";")
        .map((c, i) => {
          console.log(c, i);
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
        width: ${props.width * 0.5}px;
        height: ${props.height * 0.5}px;
        background-color: ${props.useDesign ? "none" : props.color};
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-image: ${props.useDesign
          ? `url(${imageRoute + props.image}-small.jpg)`
          : "none"};
      }
    `}</style>
  </div>
);

export default Preview;
