import { useState } from "react";
import Head from "next/head";

import { Router, withTranslation } from "../../helpers/i18n";
import { ColorPickerDesign, Draft, Content } from "../../helpers/types";
import { colorPickerStyles } from "../../helpers/global";
import { getDraft, createOrUpdateDraft } from "../../helpers/api";

import TextDesignComponent from "../../components/TextDesign";
import ColorPicker from "../../components/ColorPicker";
import Canvas from "../../components/Canvas";
import Layout from "../../components/Layout";
import Switch from "../../components/Switch";
import DesignImagePreview from "../../components/DesignImagePreview";
import NameList from "../../components/NameList";
import Sticky from "../../components/Sticky";
import Splash from "../../components/Splash";

const Create = (props) => {
  const t = props.t;
  const draft: Draft = props.draft;

  const [selectedDesign, setSelectedDesign] = useState<string>(
    draft.backgroundImage
  );
  const [text, setText] = useState<string>(draft.text);
  const [useDesign, setUseDesign] = useState<boolean>(draft.useDesign);
  const [color, setColor] = useState<ColorPickerDesign>(draft.backgroundColor);
  const [content, setContent] = useState<Array<Content>>(draft.content);
  const [savingDraft, setSavingDraft] = useState<boolean>(false);

  const [loadPreview, setLoadPreview] = useState(false);

  const pdfData: Draft = {
    ...draft,
    useDesign,
    backgroundImage: selectedDesign,
    backgroundColor: color,
    text,
    content,
  };

  const generatePreviewAndRedirect = (pdfData: Draft) => {
    setLoadPreview(true);
    createOrUpdateDraft(pdfData.uuid, pdfData).then(() => {
      Router.push("/preview/[uuid]", "/preview/" + pdfData.uuid);
    });
  };

  if (loadPreview) {
    return <Splash content={"Preparing your design"}></Splash>;
  }

  return (
    <Layout>
      <Head>
        <title>{t("meta:create.title")}</title>
        <meta name="description" content={t("meta:create.description")} />
      </Head>

      <Sticky>
        <button
          onClick={() => generatePreviewAndRedirect(pdfData)}
          className="button"
        >
          {t("product:create.button.previewPDF")}
        </button>
        <a className="button" href="#render">
          {t("product:create.button.previewPrint")}
        </a>
        <button
          onClick={() => {
            setSavingDraft(true);
            createOrUpdateDraft(pdfData.uuid, pdfData).then(() =>
              setSavingDraft(false)
            );
          }}
          disabled={savingDraft}
          className="button"
        >
          {savingDraft
            ? t("product:create.button.savingDraft")
            : t("product:create.button.saveDraft")}
        </button>
      </Sticky>

      <div className="content">
        <h1>{t("create.header")}</h1>
        <p>{t("create.intro")}</p>
        <div className="hero">
          <div id="preview">
            <Canvas
              scale={1}
              content={content}
              width={draft.product.width}
              height={draft.product.height}
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
                <p>{t("product:backgroundColor")}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="bottom">
          <div>
            <NameList
              list={text}
              handler={setText}
              width={draft.product.width}
            />
          </div>
          <div>
            {useDesign && (
              <DesignImagePreview
                setSelectedDesign={setSelectedDesign}
                width={draft.product.width}
                height={draft.product.height}
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
                      scale={0.6}
                      width={draft.product.width}
                      height={draft.product.height}
                      backgroundColor={color.color}
                      selectedDesign={selectedDesign}
                      useDesign={useDesign}
                      content={content.map((c, i) => {
                        return {
                          ...c,
                          fontSize: c.fontSize,
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
  const draft = await getDraft(query.uuid);

  return {
    draft: draft,
    namespacesRequired: ["common", "meta", "product"],
  };
};

export default withTranslation("common")(Create);

//TODO: If paid for - should not be able to save draft
