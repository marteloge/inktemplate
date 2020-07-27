import { CSSProperties, useState } from "react";
import { BlockPicker, Color } from "react-color";
import Head from "next/head";
import Select from "react-select";

import { withTranslation } from "./../i18n";
import Layout from "../src/components/Layout";

const Create = ({ t }) => {
  const [useDesign, setUseDesign] = useState(true);
  const [selectedDesign, setSelectedDesign] = useState("template1");
  const [color, setColor] = useState<Color>("#00bcd4");
  const [openColor, setOpenColor] = useState<boolean>(false);

  const [selectedFont1, setSelectedFont1] = useState("Dawning of a New Day");
  const [text1, setText1] = useState("Janelle");
  const [text1Color, setText1Color] = useState<Color>("#000");
  const [openText1Color, setOpenText1Color] = useState<boolean>(false);

  const [selectedFont2, setSelectedFont2] = useState("Raleway");
  const [text2, setText2] = useState("Table 2");
  const [text2Color, setText2Color] = useState<Color>("#000");
  const [openText2Color, setOpenText2Color] = useState<boolean>(false);

  const width = 400;
  const height = 260;
  const imageRoute = "/static/images/";

  const options = [
    { value: "dawningofanewday", label: "Dawning of a New Day" },
    { value: "raleway", label: "Raleway" },
    { value: "playfairdisplay", label: "Playfair Display" },
    { value: "comicsansms", label: "Comic Sans MS" },
    { value: "impact", label: "Impact" },
    { value: "arial", label: "Arial" },
    { value: "trebuchetms", label: "Trebuchet MS" },
  ];

  type StylesDictionary = {
    [Key: string]: CSSProperties;
  };

  const styles1: StylesDictionary = {
    color: {
      width: "36px",
      height: "36px",
      borderRadius: "36px",
      background: `${text1Color}`,
      cursor: "pointer",
    },
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer",
    },
    popover: {
      position: "absolute",
      zIndex: 2,
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  };

  const styles2: StylesDictionary = {
    color: {
      width: "36px",
      height: "36px",
      borderRadius: "36px",
      background: `${text2Color}`,
      cursor: "pointer",
    },
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer",
    },
    popover: {
      position: "absolute",
      zIndex: 2,
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  };

  const styles: StylesDictionary = {
    color: {
      width: "36px",
      height: "36px",
      borderRadius: "36px",
      background: `${color}`,
      cursor: "pointer",
      marginRight: "10px",
    },
    swatch: {
      padding: "5px",
      background: "#fff",
      borderRadius: "1px",
      boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
      display: "inline-block",
      cursor: "pointer",
    },
    popover: {
      position: "absolute",
      zIndex: 2,
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  };

  const design = [
    "template1",
    "template2",
    "template3",
    "template4",
    "template5",
    "template6",
    "template7",
    "template8",
    "template9",
    "template10",
    "template11",
  ];

  const colourStyles = (font) => {
    return {
      option: (provided, state) => {
        return {
          ...provided,
          fontFamily: state.data.label,
        };
      },
      control: (styles) => ({
        ...styles,
        fontFamily: font,
        backgroundColor: "white",
        minWidth: "200px",
      }),
    };
  };

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

        <div id="canvas">
          <p id="text1">{text1}</p>
          <p id="text2">{text2}</p>
        </div>

        <div id="control">
          <div>
            <div
              className="color-display"
              style={styles1.color}
              onClick={() => {
                setOpenText1Color(!openText1Color);
              }}
            />

            {openText1Color && (
              <div style={styles1.popover}>
                <div
                  style={styles1.cover}
                  onClick={() => setOpenText1Color(!openText1Color)}
                />
                <BlockPicker
                  triangle="hide"
                  color={text1Color}
                  onChangeComplete={(color) => {
                    setText1Color(color.hex);
                    setOpenText1Color(false);
                  }}
                />
              </div>
            )}

            <input
              id="text1-input"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
            ></input>

            <Select
              className="select"
              instanceId="select-font-1"
              value={options.find((i) => i.label === selectedFont1)}
              onChange={(font) => {
                setSelectedFont1(font.label);
              }}
              options={options}
              styles={colourStyles(selectedFont1)}
            />
          </div>
          <div>
            <div
              className="color-display"
              style={styles2.color}
              onClick={() => {
                setOpenText2Color(!openText2Color);
              }}
            />

            {openText2Color && (
              <div style={styles2.popover}>
                <div
                  style={styles2.cover}
                  onClick={() => setOpenText2Color(!openText2Color)}
                />
                <BlockPicker
                  triangle="hide"
                  color={text2Color}
                  onChangeComplete={(color) => {
                    setText2Color(color.hex);
                    setOpenText2Color(false);
                  }}
                />
              </div>
            )}

            <input
              id="text2-input"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
            ></input>

            <Select
              className="select"
              instanceId="select-font-2"
              value={options.find((i) => i.label === selectedFont2)}
              onChange={(font) => {
                setSelectedFont2(font.label);
              }}
              options={options}
              styles={colourStyles(selectedFont2)}
            />
          </div>
        </div>

        {useDesign && (
          <div id="design">
            {design.map((imgSrc, index) => (
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
              style={styles.color}
              onClick={() => {
                setOpenColor(!openColor);
              }}
            />

            {openColor && (
              <div style={styles.popover}>
                <div
                  style={styles.cover}
                  onClick={() => setOpenColor(!openColor)}
                />
                <BlockPicker
                  triangle="hide"
                  color={color}
                  onChangeComplete={(color) => {
                    setColor(color.hex);
                    setOpenColor(false);
                  }}
                />
              </div>
            )}

            <p>Background color</p>
          </div>
        )}
      </div>

      <style jsx>
        {`
          .container {
            margin: 20px;
          }

          #control {
            width: 100%;
            margin: 20px;
          }

          #design {
            margin: 20px;
          }

          #switch {
            margin: 20px;
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
            background-image: url(${imageRoute + design[3] + "-small.jpg"});
          }

          .color {
            box-shadow: ${!useDesign ? "2px 2px 2px grey" : "none"};
            background-color: #ff8a65;
          }

          #background-color {
            margin: 20px;
          }

          #background-color {
            display: flex;
            align-items: center;
          }

          #text1-control,
          #text2-control {
          }

          #control > div {
            display: flex;
          }

          input {
            margin: 0 10px;
          }

          #canvas {
            height: ${height}px;
            width: ${width}px;
            margin: 20px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            ${useDesign &&
            `
              background-image: url(${imageRoute + selectedDesign + ".jpg"});
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            `}

            border: grey 1px solid;

            ${!useDesign &&
            `
              background-color: ${color}
            `}
          }

          #text1 {
            font-family: ${selectedFont1};
            color: ${text1Color};
            font-size: 35px;
          }

          #text2 {
            font-family: ${selectedFont2};
            color: ${text2Color};
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
        `}
      </style>
    </Layout>
  );
};

Create.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Create);
