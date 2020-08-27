import { calculateResponsiveSize } from "../helpers/global";

const NameList = (props) => {
  const { list, handler, t } = props;

  return (
    <div id="names">
      <textarea
        value={list}
        onChange={(e) => handler(e.target.value)}
      ></textarea>

      <style jsx>{`
        #names {
        }

        textarea {
          height: ${calculateResponsiveSize(150, 240)};
          border: none;
          border-radius: 5px;
          padding: 10px;
          box-sizing: border-box;
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

export default NameList;
