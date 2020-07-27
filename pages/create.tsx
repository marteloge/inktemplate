import { useState } from "react";
import Head from "next/head";

import { withTranslation } from "./../i18n";
import Layout from "../src/components/Layout";
import { TextDesignComponent } from "../src/components/Design/TextDesign";

import { cardDesigns, colorPickerStyles } from "./../src/global";
import { TextDesign, ColorPickerDesign } from "./../src/types";
import ColorPicker from "../src/components/Design/ColorPicker";

const Create = ({ t }) => {
  const width = 400;
  const height = 260;
  const imageRoute = "/static/images/";

  const [useDesign, setUseDesign] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState("template1");

  const [color, setColor] = useState<ColorPickerDesign>({
    color: "#00bcd4",
    colorPickerOpen: false,
  });

  const [nameText, setNameText] = useState<TextDesign>({
    color: "#000",
    font: "Dawning of a New Day",
    text: "Janelle",
    colorPickerOpen: false,
  });

  const [subText, setSubText] = useState<TextDesign>({
    color: "#000",
    font: "Raleway",
    text: "Table 2",
    colorPickerOpen: false,
  });

  return (
    <Layout>
      <Head>
        <title>{t("meta:create.title")}</title>
        <meta name="description" content={t("meta:create.description")} />
      </Head>

      <div className="container">
        <h1>{t("create.header")}</h1>

        <div id="switch">
          <button className="pattern" onClick={() => setUseDesign(true)}>
            Pattern
          </button>
          <button className="color" onClick={() => setUseDesign(false)}>
            Color
          </button>
        </div>

        <div>
          <div id="canvas">
            <p id="text1">{nameText.text}</p>
            <p id="text2">{subText.text}</p>
          </div>
        </div>

        <div id="control">
          <TextDesignComponent design={nameText} handler={setNameText} />
          <TextDesignComponent design={subText} handler={setSubText} />
        </div>

        {useDesign && (
          <div id="design">
            {cardDesigns.map((imgSrc, index) => (
              <img
                key={index}
                onClick={() => setSelectedDesign(imgSrc)}
                src={require("../public/static/images/" +
                  imgSrc +
                  "-small.jpg")}
              />
            ))}
          </div>
        )}

        {!useDesign && (
          <div id="background-color">
            <div
              className="color-display"
              style={colorPickerStyles(color.color).color}
              onClick={() =>
                setColor({ ...color, colorPickerOpen: !color.colorPickerOpen })
              }
            />

            {color.colorPickerOpen && (
              <ColorPicker design={color} handler={setColor} />
            )}

            <p>Background color</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .container {
          margin: 2% 5%;
        }
        .color-display {
          margin-right: 10px;
        }

        #background-color {
          display: flex;
          align-items: center;
        }

        #switch button {
          width: 100px;
          height: 100px;
          border-radius: 100px;
          margin-right: 10px;
          outline: none;
          cursor: pointer;
          border: none;
        }

        #switch button:hover {
          box-shadow: 2px 2px 2px;
        }

        .pattern {
          box-shadow: ${useDesign ? "2px 2px 2px grey" : "none"};
          background-image: url(${imageRoute + cardDesigns[3] + "-small.jpg"});
        }

        .color {
          box-shadow: ${!useDesign ? "2px 2px 2px grey" : "none"};
          background-color: #ff8a65;
        }

        #canvas {
          height: ${height}px;
          width: ${width}px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          ${useDesign &&
          `
            background-image: url(${
              imageRoute + selectedDesign + "-small.jpg"
            });
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          `}

          border: grey 1px solid;

          ${!useDesign &&
          `
            background-color: ${color.color}
          `}
        }
        #text1 {
          font-family: ${nameText.font};
          color: ${nameText.color};
          font-size: 35px;
        }

        #text2 {
          font-family: ${subText.font};
          color: ${subText.color};
          font-size: 20px;
        }

        #design img {
          width: ${width * 0.5}px;
          height: ${height * 0.5}px;
          margin: 1px 2px;
          border: 1px solid white;
        }

        #design img:hover {
          border: 1px solid black;
        }
      `}</style>
    </Layout>
  );
};

Create.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Create);
