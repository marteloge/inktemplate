import { useState } from "react";
import Head from "next/head";

import { withTranslation } from "./../i18n";

import { TextDesignComponent } from "../src/components/Design/TextDesign";
import { TextDesign, ColorPickerDesign, PDFProps } from "./../src/types";
import { colorPickerStyles, fonts, toTextArray } from "./../src/global";

import ColorPicker from "../src/components/Design/ColorPicker";
import Canvas from "../src/components/Design/Canvas";
import Layout from "../src/components/Layout";
import Switch from "../src/components/Design/Switch";
import DesignImagePreview from "../src/components/Design/DesignImagePreview";
import NameList from "../src/components/Design/NameList";

import { Router } from "./../i18n";

const toLocalStore = (key, value) => {
  localStorage.setItem(key, value);
};

const generatePreview = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  Router.push("/generate");
};

const Create = ({ t }) => {
  const width = 400;
  const height = 256;

  const [useDesign, setUseDesign] = useState<boolean>(true);
  const [selectedDesign, setSelectedDesign] = useState<string>("template4");
  const [content, setContent] = useState<string>(
    "Janelle, Table 1; Harold, Table2; Jeff, Table 3;"
  );

  const [color, setColor] = useState<ColorPickerDesign>({
    color: "#00bcd4",
    colorPickerOpen: false,
  });

  const [nameText, setNameText] = useState<TextDesign>({
    color: "#000",
    font: "Dawning of a New Day",
    fontSrc: "/static/fonts/dawning-of-a-new-day-v11-latin-regular.ttf",
    text: "Janelle",
    colorPickerOpen: false,
    fontSize: 35,
  });

  const [subText, setSubText] = useState<TextDesign>({
    color: "#000",
    font: "Raleway",
    text: "Table 2",
    fontSrc: "/static/fonts/raleway-v17-latin-regular.ttf",
    colorPickerOpen: false,
    fontSize: 20,
  });

  const pdfData: PDFProps = {
    width: 8.5 * 0.92,
    height: 5.5 * 0.92,
    nameText: nameText,
    subText: subText,
    backgroundColor: useDesign ? null : color.color,
    backgroundImage: useDesign ? selectedDesign : null,
    text: toTextArray(content),
  };

  return (
    <Layout>
      <Head>
        <title>{t("meta:create.title")}</title>
        <meta name="description" content={t("meta:create.description")} />
      </Head>
      <div className="sticky">
        {/* <Link href="/generate">
          
        </Link> */}

        <button
          onClick={() => generatePreview("card", pdfData)}
          className="button"
        >
          Preview PDF
        </button>
        <a className="button" href="#render">
          Preview Print
        </a>
      </div>

      <div className="content">
        <h1>{t("create.header")}</h1>
        <p>
          Create your own design for your print! Maybe you find some nice
          designs from our library? Play with fonts, text and colors to get your
          own custom design! Click on the preview button when you are ready.
        </p>
        <div className="hero">
          <div id="preview">
            <Canvas
              nameText={nameText}
              subText={subText}
              width={width}
              height={height}
              useDesign={useDesign}
              backgroundColor={color.color}
              selectedDesign={selectedDesign}
            />
          </div>
          <div id="intro">
            <Switch
              setUseDesign={setUseDesign}
              useDesign={useDesign}
              color={color.color}
              image={selectedDesign}
            />
            <div>
              <TextDesignComponent
                id="1"
                design={nameText}
                handler={setNameText}
              />
              <TextDesignComponent
                id="2"
                design={subText}
                handler={setSubText}
              />
            </div>

            <div>
              <div id="background-color">
                <div
                  className="color-display"
                  style={colorPickerStyles(color.color).color}
                  onClick={() =>
                    setColor({
                      ...color,
                      colorPickerOpen: !color.colorPickerOpen,
                    })
                  }
                />

                {color.colorPickerOpen && (
                  <ColorPicker design={color} handler={setColor} />
                )}

                <p>Background color</p>
              </div>
            </div>
          </div>
        </div>
        <div id="bottom">
          <div>
            <NameList list={content} handler={setContent} width={width} />
          </div>
          <div>
            {useDesign && (
              <DesignImagePreview
                setSelectedDesign={setSelectedDesign}
                width={width}
                height={height}
              />
            )}
          </div>
        </div>

        <div id="render">
          <h2>Preview print</h2>
          <div className="cards">
            {content
              .slice(0, content.length - 1)
              .split(";")
              .map((c, i) => {
                return (
                  <div key={"canvas-" + i} className="card">
                    <Canvas
                      width={width * 0.6}
                      height={height * 0.6}
                      backgroundColor={color.color}
                      selectedDesign={selectedDesign}
                      useDesign={useDesign}
                      nameText={{
                        ...nameText,
                        fontSize: nameText.fontSize * 0.6,
                        text: c.split(",")[0],
                      }}
                      subText={{
                        ...subText,
                        fontSize: subText.fontSize * 0.6,
                        text: c.split(",")[1],
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .container {
          background-color: rgb(238, 233, 231, 0.8);
        }
      `}</style>

      <style jsx>
        {`
          @font-face {
            font-family: "Petit Formal Script";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/petit-formal-script-v8-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/petit-formal-script-v8-latin-regular.woff")
                format("woff"),
              url("/static/fonts/petit-formal-script-v8-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Molle";
            font-style: italic;
            font-weight: 400;
            src: url("/static/fonts/molle-v9-latin-italic.woff2")
                format("woff2"),
              url("/static/fonts/molle-v9-latin-italic.woff") format("woff"),
              url("/static/fonts/molle-v9-latin-italic.ttf") format("truetype");
          }
          @font-face {
            font-family: "Clicker Script";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/clicker-script-v8-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/clicker-script-v8-latin-regular.woff")
                format("woff"),
              url("/static/fonts/clicker-script-v8-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Snowburst One";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/snowburst-one-v8-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/snowburst-one-v8-latin-regular.woff")
                format("woff"),
              url("/static/fonts/snowburst-one-v8-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Ranga";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/ranga-v6-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/ranga-v6-latin-regular.woff") format("woff"),
              url("/static/fonts/ranga-v6-latin-regular.ttf") format("truetype");
          }
          @font-face {
            font-family: "Space Mono";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/space-mono-v5-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/space-mono-v5-latin-regular.woff")
                format("woff"),
              url("/static/fonts/space-mono-v5-latin-regular.ttf")
                format("truetype");
          }
          /* katibeh-regular - latin */
          @font-face {
            font-family: "Katibeh";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/katibeh-v7-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/katibeh-v7-latin-regular.woff") format("woff"),
              url("/static/fonts/katibeh-v7-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Bungee Hairline";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/bungee-hairline-v6-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/bungee-hairline-v6-latin-regular.woff")
                format("woff"),
              url("/static/fonts/bungee-hairline-v6-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Ma Shan Zheng";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/ma-shan-zheng-v5-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/ma-shan-zheng-v5-latin-regular.woff")
                format("woff"),
              url("/static/fonts/ma-shan-zheng-v5-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Barriecito";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/barriecito-v3-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/barriecito-v3-latin-regular.woff")
                format("woff"),
              url("/static/fonts/barriecito-v3-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Bellota";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/bellota-v2-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/bellota-v2-latin-regular.woff") format("woff"),
              url("/static/fonts/bellota-v2-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Almendra Display";
            font-style: normal;
            font-weight: 400;

            src: url("/static/fonts/almendra-display-v11-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/almendra-display-v11-latin-regular.woff")
                format("woff"),
              url("/static/fonts/almendra-display-v11-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Cedarville Cursive";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/cedarville-cursive-v11-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/cedarville-cursive-v11-latin-regular.woff")
                format("woff"),
              url("/static/fonts/cedarville-cursive-v11-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Homemade Apple";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/homemade-apple-v10-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/homemade-apple-v10-latin-regular.woff")
                format("woff"),
              url("/static/fonts/homemade-apple-v10-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Rock Salt";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/rock-salt-v10-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/rock-salt-v10-latin-regular.woff")
                format("woff"),
              url("/static/fonts/rock-salt-v10-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Annie Use Your Telescope";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/annie-use-your-telescope-v10-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/annie-use-your-telescope-v10-latin-regular.woff")
                format("woff"),
              url("/static/fonts/annie-use-your-telescope-v10-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Chewy";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/chewy-v11-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/chewy-v11-latin-regular.woff") format("woff"),
              url("/static/fonts/chewy-v11-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Lora";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/lora-v16-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/lora-v16-latin-regular.woff") format("woff"),
              url("/static/fonts/lora-v16-latin-regular.ttf") format("truetype");
          }

          @font-face {
            font-family: "Open Sans Condensed";
            font-style: normal;
            font-weight: 300;
            src: url("/static/fonts/open-sans-condensed-v14-latin-300.woff2")
                format("woff2"),
              url("/static/fonts/open-sans-condensed-v14-latin-300.woff")
                format("woff"),
              url("/static/fonts/open-sans-condensed-v14-latin-300.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Open Sans";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/open-sans-v17-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/open-sans-v17-latin-regular.woff")
                format("woff"),
              url("/static/fonts/open-sans-v17-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Handlee";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/handlee-v8-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/handlee-v8-latin-regular.woff") format("woff"),
              url("/static/fonts/handlee-v8-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Marck Script";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/marck-script-v10-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/marck-script-v10-latin-regular.woff")
                format("woff"),
              url("/static/fonts/marck-script-v10-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Arapey";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/arapey-v8-latin-regular.eot?#iefix")
                format("embedded-opentype"),
              url("/static/fonts/arapey-v8-latin-regular.woff2") format("woff2"),
              url("/static/fonts/arapey-v8-latin-regular.woff") format("woff"),
              url("/static/fonts/arapey-v8-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Poiret One";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/poiret-one-v8-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/poiret-one-v8-latin-regular.woff")
                format("woff"),
              url("/static/fonts/poiret-one-v8-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Prata";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/prata-v11-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/prata-v11-latin-regular.woff") format("woff"),
              url("/static/fonts/prata-v11-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Sacramento";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/sacramento-v7-latin-regular.eot?#iefix")
                format("embedded-opentype"),
              url("/static/fonts/sacramento-v7-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/sacramento-v7-latin-regular.woff")
                format("woff"),
              url("/static/fonts/sacramento-v7-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Great Vibes";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/great-vibes-v7-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/great-vibes-v7-latin-regular.woff")
                format("woff"),
              url("/static/fonts/great-vibes-v7-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Courgette";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/courgette-v7-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/courgette-v7-latin-regular.woff")
                format("woff"),
              url("/static/fonts/courgette-v7-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Satisfy";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/satisfy-v10-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/satisfy-v10-latin-regular.woff") format("woff"),
              url("/static/fonts/satisfy-v10-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Amatic SC";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/amatic-sc-v13-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/amatic-sc-v13-latin-regular.woff")
                format("woff"),
              url("/static/fonts/amatic-sc-v13-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Shadows Into Light";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/shadows-into-light-v9-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/shadows-into-light-v9-latin-regular.woff")
                format("woff"),
              url("/static/fonts/shadows-into-light-v9-latin-regular.ttf")
                format("truetype");
          }

          @font-face {
            font-family: "Pacifico";
            font-style: normal;
            font-weight: 400;

            src: url("/static/fonts/pacifico-v16-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/pacifico-v16-latin-regular.woff")
                format("woff"),
              url("/static/fonts/pacifico-v16-latin-regular.ttf")
                format("truetype");
          }

          @font-face {
            font-family: "Indie Flower";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/indie-flower-v11-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/indie-flower-v11-latin-regular.woff")
                format("woff"),
              url("/static/fonts/indie-flower-v11-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Dancing Script";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/dancing-script-v15-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/dancing-script-v15-latin-regular.woff")
                format("woff"),
              url("/static/fonts/dancing-script-v15-latin-regular.ttf")
                format("truetype");
          }
          @font-face {
            font-family: "Quicksand";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/quicksand-v21-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/quicksand-v21-latin-regular.woff")
                format("woff"),
              url("/static/fonts/quicksand-v21-latin-regular.ttf")
                format("truetype");
          }

          @font-face {
            font-family: "Anton";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/anton-v11-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/anton-v11-latin-regular.woff") format("woff"),
              url("/static/fonts/anton-v11-latin-regular.ttf")
                format("truetype");
          }

          @font-face {
            font-family: "Lobster";
            font-style: normal;
            font-weight: 400;
            src: url("/static/fonts/lobster-v22-latin-regular.woff2")
                format("woff2"),
              url("/static/fonts/lobster-v22-latin-regular.woff") format("woff"),
              url("/static/fonts/lobster-v22-latin-regular.ttf")
                format("truetype");
          }
          #render {
            margin: 5% 0;
            min-height: 40vh;
          }
          .cards {
            display: flex;
            flex-wrap: wrap;
          }

          .card {
            margin-right: 3px;
            margin-top: 3px;
          }

          #bottom {
            display: flex;
          }

          .content {
            padding: 3% 5%;
            max-width: 1030px;
            margin: 0 auto;
            margin-bottom: 10%;
          }

          .sticky {
            position: fixed;
            bottom: 0;
            width: 100%;

            box-shadow: -10px -10px 20px rgb(242, 238, 235, 0.8);
            background-color: rgb(242, 238, 235, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .button {
            margin: 10px;
            padding: 15px 25px;
            background: none;
            border: 1px solid rgb(0, 0, 0, 0.5);
            cursor: pointer;
            border-radius: 5px;
          }

          .sticky button {
            margin: 20px;
          }

          #intro {
            padding: 0 20px;
          }

          #intro h1 {
            margin: 0;
          }

          #intro p {
            margin: 10px 0;
          }

          .hero {
            display: flex;
            align-items: center;
            margin: 5% 0 2% 0;
          }

          .color-display {
            margin-right: 10px;
          }

          #background-color {
            display: flex;
            align-items: center;
            visibility: ${useDesign ? "hidden" : "initial"};
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
