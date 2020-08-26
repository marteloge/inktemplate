import { calculateResponsiveSize } from "../helpers/global";

const Popup = (props) => {
  const { open, setOpen } = props;

  if (!open) {
    return null;
  }

  return (
    <div className="popup">
      <p className="cross" onClick={() => setOpen(false)}>
        X
      </p>

      {props.children}
      <style jsx>{`
        .cross {
          font-size: ${calculateResponsiveSize(20, 30)};
          margin: 20px 30px;
          position: fixed;
          right: 0;
          cursor: pointer;
        }
        .popup {
          width: 100vw;
          height: 100vh;
          top: 0;
          bottom: 0;
          position: fixed;
          background-color: rgb(256, 256, 256, 0.85);
          z-index: 1000;
          overflow-y: scroll;
          background-color: #f2eeeb;
        }
      `}</style>
      <style jsx global>{``}</style>
    </div>
  );
};

export default Popup;
