const Sticky = (props) => {
  return (
    <div className="sticky">
      {props.children}
      <style jsx global>{`
        .sticky {
          position: fixed;
          bottom: 0;
          width: 100%;
          box-shadow: -10px -10px 20px rgb(242, 238, 235, 0.8);
          background-color: rgb(242, 238, 235, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        .sticky button {
          background: none;
          margin: 20px;
          margin: 10px;
        }
      `}</style>
    </div>
  );
};

export default Sticky;
