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
import Popup from "../../components/Popup";

const Create = (props) => {
  const t = props.t;
  const draft: Draft = props.draft;

  const [popup, setPopup] = useState<boolean>(false);

  const [selectedDesign, setSelectedDesign] = useState<number>(
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
    updated: new Date(),
    text,
    content,
  };

  const changeDesign = (design) => {
    setPopup(false);
    setSelectedDesign(design);
  };

  const generatePreviewAndRedirect = (pdfData: Draft) => {
    setLoadPreview(true);
    createOrUpdateDraft(pdfData.uuid, pdfData).then(() => {
      Router.push(
        `/preview/[uuid]?uuid=${pdfData.uuid}`,
        `/preview/${pdfData.uuid}`
      );
    });
  };

  if (loadPreview) {
    return <Splash content={"Preparing your design"}></Splash>;
  }

  if (popup) {
    return (
      <Popup open={popup} setOpen={setPopup}>
        <DesignImagePreview
          setSelectedDesign={changeDesign}
          width={draft.product.width}
          height={draft.product.height}
        />
      </Popup>
    );
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
              setPopup={setPopup}
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
          <div className="name-list">
            <NameList
              list={text}
              handler={setText}
              width={draft.product.width}
            />
          </div>
        </div>

        <div id="render">
          <h2>{t("product:preview")}</h2>
          <div className="cards">
            {text
              .slice(0, text.length - 1)
              .split(";")
              .map((t, i) => {
                return (
                  <div key={"canvas-" + i} className="card">
                    <Canvas
                      scale={0.54}
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

        footer {
          display: none !important;
        }
      `}</style>

      <style jsx>
        {`
          #render {
            margin: 5% 0;
            min-height: 20vh;
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
            padding: 5% 5%;
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
            margin: 5% 0 5% 0;
          }

          .color-display {
            margin-right: 10px;
          }

          #background-color {
            display: flex;
            align-items: center;
            display: ${useDesign ? "none" : "flex"};
          }

          @media (max-width: 850px) {
            .hero {
              flex-direction: column;
            }

            #intro {
              width: 100%;
              justify-content: center;
            }

            #bottom {
              flex-direction: column;
            }

            #preview {
              width: 100%;
            }

            #bottom .name-list {
              order: 2;
              margin-top: 20px;
            }
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
