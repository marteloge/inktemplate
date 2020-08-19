const Splash = (props) => (
  <div className="splash">
    <h2>{props.content}</h2>
    <style jsx>{`
      .splash {
        width: 100vw;
        height: 100vh;
        position: fixed;
        background-color: rgb(242, 238, 235);
        display: flex;
        top: 0;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1;
      }
    `}</style>
  </div>
);

export default Splash;
