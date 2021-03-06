import { useState } from "react";
import Head from "next/head";

import { Router, withTranslation } from "../../helpers/i18n";
import { ColorPickerDesign, Draft, Content } from "../../helpers/types";
import { colorPickerStyles, newUUID } from "../../helpers/global";
import { getDraft, createOrUpdateDraft, logEvent } from "../../helpers/api";

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
import { newDraft } from "../../helpers/products";
import { downloadPdfDocument } from "../../components/Download";

import FileUploader from "../../components/FileUploader";

const Create = (props) => {
  const t = props.t;
  const draft: Draft = props.draft;

  const [text, setText] = useState<string>(draft.text);
  const [useDesign, setUseDesign] = useState<boolean>(draft.useDesign);
  const [color, setColor] = useState<ColorPickerDesign>(draft.backgroundColor);
  const [opacity, setOpacity] = useState<number>(draft.opacity * 100);

  const [content, setContent] = useState<Array<Content>>(draft.content);
  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const [loadPreview, setLoadPreview] = useState(false);
  const [loadNewPrint, setLoadNewPrint] = useState<boolean>(false);
  const [selectedDesign, setSelectedDesign] = useState<number>(
    draft.backgroundImage
  );

  const [popup, setPopup] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);

  const pdfData: Draft = {
    ...draft,
    useDesign,
    backgroundImage: selectedDesign,
    backgroundColor: color,
    opacity: opacity / 100,
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
    return <Splash content={t("splash.preparing")}></Splash>;
  }

  if (loadNewPrint) {
    return <Splash confetti content={t("splash.create")}></Splash>;
  }

  if (upload) {
    return (
      <FileUploader
        text={text}
        open={upload}
        setOpen={setUpload}
        setText={setText}
      />
    );
  }

  if (draft.paid) {
    return (
      <Popup open={true}>
        <div
          className="paid"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>{t("create.popup.paid")}</h2>
          <p>{t("create.popup.info")}</p>
          <br></br>
          <br></br>

          <Canvas
            useDesign={draft.useDesign}
            width={draft.product.width}
            height={draft.product.height}
            selectedDesign={draft.backgroundImage}
            backgroundColor={draft.backgroundColor.color}
            content={[
              { ...draft.content[0], text: t("product:nameText") },
              { ...draft.content[1], text: t("product:subText") },
            ]}
            scale={1}
          ></Canvas>
          <br></br>
          <br></br>
          <p>{t("create.popup.new")}</p>
          <br></br>
          <br></br>

          <div className="buttons">
            <button
              style={{ marginRight: "10px" }}
              onClick={() => {
                setLoadNewPrint(true);
                const uuid = newUUID();
                const start = new Date();

                createOrUpdateDraft(uuid, newDraft("PLACECARD", uuid)).then(
                  (uuid) => {
                    setTimeout(() => {
                      Router.push(
                        `/create/[uuid]?uuid=${uuid}`,
                        `/create/${uuid}`
                      ).then(() => Router.reload());
                    }, 2000 - (new Date().getTime() - start.getTime()));
                  }
                );
              }}
            >
              {t("create.button.create")}
            </button>
            <button
              onClick={() => {
                logEvent("create_download");
                downloadPdfDocument(draft);
              }}
            >
              {t("create.button.download")}
            </button>
          </div>
        </div>
      </Popup>
    );
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
        <meta name="robots" content="noindex" />
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
            logEvent("create_save");
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
              opacity={opacity / 100}
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
            <div className="opacity">
              <input
                type="range"
                min="1"
                max="100"
                value={opacity}
                onChange={(i) => setOpacity(parseInt(i.target.value))}
              />
            </div>

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
        <div className="name-list">
          <h2>{t("product:textHeader")}</h2>
          <NameList list={text} handler={setText} width={draft.product.width} />
          <button
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
            onClick={() => {
              logEvent("create_upload");
              setUpload(true);
            }}
          >
            <img
              src="/static/images/xcel.png"
              style={{
                width: "20px",
                marginRight: "10px",
              }}
            ></img>
            Upload from file
          </button>
        </div>
        <div id="render">
          <h2>{t("product:preview")}</h2>
          <div className="cards">
            {text
              .slice(0, text.length)
              .split("\n")
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
                      opacity={opacity / 100}
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
        footer {
          display: none !important;
        }

        textarea {
          width: 100%;
        }

        div.preview,
        div.preview {
          opacity: ${opacity} !important;
        }

        #switch {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
      `}</style>

      <style jsx>
        {`
          .opacity {
            display: flex;
            margin: 5% 0;
          }

          input[type="range"] {
            width: 100%;
            background: #f2eeeb;
            -webkit-appearance: none;
          }

          input[type="range"]::-webkit-slider-runnable-track {
            width: 100%;
            height: 5px;
            background: #ddd;
            border: none;
            border-radius: 3px;
          }

          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            border: none;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            // background: #32c0b0;
            background: darkslategray;
            margin-top: -4px;
            cursor: pointer;
          }

          input[type="range"]:focus {
            outline: none;
          }

          input[type="range"]:focus::-webkit-slider-runnable-track {
            background: #ccc;
          }

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
            }

            #preview {
              width: 100%;
            }

            .name-list {
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
