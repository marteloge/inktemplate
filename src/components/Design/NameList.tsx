import { calculateResponsiveSize } from "../../global";

type Props = {
  list: string;
  handler: Function;
  width: number;
};

const NameList = (props: Props) => (
  <div id="names">
    <h2>Provide text for print</h2>
    <textarea
      value={props.list}
      onChange={(e) => props.handler(e.target.value)}
    ></textarea>

    <style jsx>{`
      #names {
      }

      textarea {
        width: ${calculateResponsiveSize(props.width * 0.75, props.width)};
        height: 240px;
        border: none;
        border-radius: 5px;
        padding: 10px;
      }
    `}</style>
  </div>
);

export default NameList;
