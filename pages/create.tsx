import { useState } from "react";
import Layout from "../src/components/Layout";

import Select from "react-select";
import FontPicker from "font-picker-react";

import { withTranslation } from "./../i18n";
import Head from "next/head";
import { read } from "fs";

const Create = ({ t }) => {
  const [selectedFont1, setSelectedFont1] = useState("Dawning of a New Day");
  const [selectedFont2, setSelectedFont2] = useState("Raleway");
  const [text1, setText1] = useState("Janelle");
  const [text2, setText2] = useState("Table 2");

  const width = 400;
  const height = 200;
  const image = "/static/images/test.jpg";

  const options = [
    { value: "dawningofanewday", label: "Dawning of a New Day" },
    { value: "raleway", label: "Raleway" },
    { value: "playfairdisplay", label: "Playfair Display" },
  ];

  const colourStyles = {
    option: (provided, state) => {
      return {
        ...provided,
        fontFamily: state.data.label,
      };
    },
    control: (styles) => ({
      ...styles,
      fontFamily: selectedFont1,
      backgroundColor: "white",
    }),

    // control: {
    //   ,
    // },
  };

  return (
    <Layout>
      <Head>
        <title>{t("meta:create.title")}</title>
        <meta name="description" content={t("meta:create.description")} />
      </Head>
      <h1>{t("create.header")}</h1>

      <div id="control">
        <div>
          <span>Font:</span>

          <Select
            instanceId={"test"}
            value={options.find((i) => i.label === selectedFont1)}
            defaultValue={"Raleway"}
            onChange={(font) => {
              setSelectedFont1(font.label);
            }}
            options={options}
            styles={colourStyles}
          />
        </div>

        <div>
          <span>Text1:</span>{" "}
          <input onChange={(e) => setText1(e.target.value)}></input>
        </div>
        <div>
          <span>Text2:</span>{" "}
          <input onChange={(e) => setText2(e.target.value)}></input>
        </div>
      </div>

      <div id="canvas">
        <p id="text1">{text1}</p>
        <p id="text2">{text2}</p>
      </div>

      <style jsx>{`
        #control {
          display: flex;
          flex-direction: column;
          max-width: 200px;
        }

        .dawningofanewday {
          font-family: "Dawning of a New Day";
        }

        .raleway {
          font-family: "Raleway";
        }

        playfairdisplay {
          font-family: "Playfair Display";
        }

        #canvas {
          height: ${height}px;
          width: ${width}px;

          background-image: url(${image});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          // background-size: contain;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          border: grey 1px solid;
        }

        #text1 {
          font-family: ${selectedFont1};
          font-size: 35px;
        }

        #text2 {
          font-family: ${selectedFont2};
          font-size: 20px;
        }
      `}</style>
    </Layout>
  );
};

Create.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Create);
