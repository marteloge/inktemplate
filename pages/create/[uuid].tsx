import { useState } from "react";
import Head from "next/head";

import { Router, withTranslation } from "../../i18n";

import { TextDesignComponent } from "../../src/components/Design/TextDesign";
import { ColorPickerDesign, Draft, Content } from "../../src/types";
import { colorPickerStyles } from "../../src/global";

import ColorPicker from "../../src/components/Design/ColorPicker";
import Canvas from "../../src/components/Design/Canvas";
import Layout from "../../src/components/Layout";
import Switch from "../../src/components/Design/Switch";
import DesignImagePreview from "../../src/components/Design/DesignImagePreview";
import NameList from "../../src/components/Design/NameList";

const saveDraft = (draft) => {
  return fetch("http://localhost:8000/draft/" + draft.uuid, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(draft),
  });
};

const generatePreview = (draft) => {
  saveDraft(draft).then(() => {
    Router.push("/preview/" + draft.uuid);
  });
};

const Create = (props) => {
  const { t, draft } = props;

  const width = draft.product.width;
  const height = draft.product.height;

  const [selectedDesign, setSelectedDesign] = useState<string>(
    !(draft.background_image || draft.background_color)
      ? "template4"
      : draft.background_image
  );

  const [text, setText] = useState<string>(
    draft.text ? draft.text : "Janelle, Table 1; Harold, Table2; Jeff, Table 3;"
  );

  const [useDesign, setUseDesign] = useState<boolean>(!!selectedDesign);

  const [color, setColor] = useState<ColorPickerDesign>(
    draft.background_color
      ? {
          color: draft.background_color,
          colorPickerOpen: false,
        }
      : {
          color: "#00bcd4",
          colorPickerOpen: false,
        }
  );

  const [content, setContent] = useState<Array<Content>>(
    draft.content.length > 0
      ? draft.content.map((c) => {
          return { ...c, colorPickerOpen: false };
        })
      : [
          {
            name: "nameText",
            color: "#000",
            font: "Dawning of a New Day",
            font_src: "dawning-of-a-new-day-v11-latin-regular",
            font_size: 35,
            text: t("product:nameText"),
          },
          {
            name: "subText",
            color: "#000",
            font: "Raleway",
            font_src: "raleway-v17-latin-regular",
            font_size: 20,
            text: t("product:subText"),
          },
        ]
  );

  const pdfData = {
    id: draft.id,
    uuid: draft.uuid,
    background_image: useDesign ? selectedDesign : null,
    background_color: useDesign ? null : color.color,
    text: text,
    content: content,
  };

  return (
    <Layout>
      <Head>
        <title>{t("meta:create.title")}</title>
        <meta name="description" content={t("meta:create.description")} />
      </Head>
      <div className="sticky">
        <button onClick={() => generatePreview(pdfData)} className="button">
          Preview PDF
        </button>

        {/* <button onClick={() => saveDraft(pdfData)} className="button">
          Save
        </button> */}

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
              content={content}
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
              {content.map((c: Content, i: number) => (
                <TextDesignComponent
                  key={i}
                  index={i}
                  content={c}
                  setContent={setContent}
                  contents={content}
                />
              ))}
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
                  <ColorPicker
                    design={color}
                    color={color.color}
                    colorPickerOpen={color.colorPickerOpen}
                    handler={setColor}
                  />
                )}
                <p>Background color</p>
              </div>
            </div>
          </div>
        </div>
        <div id="bottom">
          <div>
            <NameList list={text} handler={setText} width={width} />
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
            {text
              .slice(0, text.length - 1)
              .split(";")
              .map((t, i) => {
                return (
                  <div key={"canvas-" + i} className="card">
                    <Canvas
                      width={width * 0.6}
                      height={height * 0.6}
                      backgroundColor={color.color}
                      selectedDesign={selectedDesign}
                      useDesign={useDesign}
                      content={content.map((c, i) => {
                        return {
                          ...c,
                          font_size: c.font_size * 0.6,
                          text: t.split(",")[i],
                        };
                      })}
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

Create.getInitialProps = async ({ query }) => {
  const res = await fetch("http://localhost:8000/draft/" + query.uuid, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const draft: Draft = await res.json();

  return {
    draft: draft,
    namespacesRequired: ["common", "meta", "product"],
  };
};

export default withTranslation("common")(Create);
