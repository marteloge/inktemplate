import { useState } from "react";
import Head from "next/head";

import { withTranslation } from "../helpers/i18n";
import { downloadPdfDocument } from "../components/Download";
import { Draft } from "../helpers/types";

import Layout from "../components/Layout";
import Splash from "../components/Splash";
import dynamic from "next/dynamic";
import NameList from "../components/NameList";
import FileUpload from "../components/FileUploader";
import { createOrUpdateDraft, logEvent } from "../helpers/api";

const PreviewPDF = dynamic(import("../components/PreviewPDF"), {
  ssr: false,
});

const Receipt = (props) => {
  const { order, t } = props;

  const [draft, setDraft] = useState<Draft>(props.draft);
  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const [text, setText] = useState<string>(draft.text);
  const [upload, setUpload] = useState<boolean>(false);

  const changed = text !== draft.text;

  if (savingDraft) {
    return <Splash content={t("splash.saving")}></Splash>;
  }

  if (upload) {
    return (
      <FileUpload
        text={text}
        setText={setText}
        open={upload}
        setOpen={setUpload}
      />
    );
  }

  return (
    <Layout>
      <Head>
        <title>{t("meta:receipt.title")}</title>
        <meta name="description" content={t("meta:receipt.description")} />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="content">
        <div className="intro">
          <h1 className="strike">{t("receipt.header")}</h1>
          <p>{t("receipt.intro", { email: order.customer.email })}</p>
        </div>

        <div className="download">
          <h2>{t("receipt.download.header")}</h2>
          <p>{t("receipt.download.intro")}</p>
          <button
            disabled={changed}
            style={{
              minWidth: "200px",
            }}
            onClick={() => {
              logEvent("receipt_download");
              downloadPdfDocument(draft);
            }}
          >
            {t("receipt.button.download")}
          </button>
          {changed && <p>({t("upload.help")})</p>}
        </div>

        <div className="names">
          <h2>{t("receipt.change")}</h2>
          <NameList className="text" list={text} handler={setText}></NameList>

          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={() => {
                logEvent("receipt_upload");
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
              {t("receipt.button.upload")}
            </button>
            {changed && (
              <button
                onClick={() => {
                  setSavingDraft(true);
                  createOrUpdateDraft(draft.uuid, { ...draft, text }).then(
                    () => {
                      setDraft({ ...draft, text });
                      setSavingDraft(false);
                    }
                  );
                }}
              >
                {t("receipt.button.save")}
              </button>
            )}
            {changed && (
              <button onClick={() => setText(draft.text)}>
                {t("receipt.button.revert")}
              </button>
            )}
          </div>
        </div>

        <div className="pdf">{!changed && <PreviewPDF draft={draft} />}</div>
      </div>

      <style jsx>
        {`
          .intro,
          .names,
          .download {
            margin-bottom: 5%;
          }

          button {
            margin-top: 20px;
            min-width: 200px;
            margin-right: 10px;
          }

          .content {
            padding: 5% 5%;
            max-width: 1030px;
            margin: 0 auto;
            margin-bottom: 10%;
            max-width: 700px;
          }
        `}
      </style>
      <style jsx global>
        {`
          textarea {
            width: 100%;
          }

          .react-pdf__Page__svg {
            max-width: 100vw;
            border-radius: 5px;
            background-color: rgb(242, 238, 235) !important;
          }

          svg {
            max-width: 100vw;
            height: auto;
          }
        `}
      </style>
    </Layout>
  );
};

Receipt.getInitialProps = async ({ query, req }) => {
  console.log(req !== undefined);

  const { order, draft } = await fetch(
    `http://${req.headers.host}/api/checkout/${query.session_id}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    }
  ).then((res) => res.json());

  return {
    order,
    draft,
    namespacesRequired: ["common", "meta"],
  };
};

export default withTranslation("common")(Receipt);
