import { useState } from "react";
import Head from "next/head";

import { withTranslation, Router } from "../helpers/i18n";
import { downloadPdfDocument } from "../components/Download";
import { Draft } from "../helpers/types";

import Layout from "../components/Layout";
import Splash from "../components/Splash";
import dynamic from "next/dynamic";
import NameList from "../components/NameList";
import { createOrUpdateDraft } from "../helpers/api";

const PreviewPDF = dynamic(import("../components/PreviewPDF"), {
  ssr: false,
});

const Receipt = (props) => {
  const { order, t } = props;

  const [draft, setDraft] = useState<Draft>(props.draft);
  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const [text, setText] = useState<string>(draft.text);

  if (savingDraft) {
    return <Splash content={t("splash.saving")}></Splash>;
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
          <h1>{t("receipt.header")}</h1>
          <p>{t("receipt.intro", { email: order.customer.email })}</p>

          <button onClick={() => downloadPdfDocument(draft)}>
            {t("receipt.button.download")}
          </button>
        </div>

        <div className="names">
          <h2>{t("receipt.change")}</h2>
          <NameList className="text" list={text} handler={setText}></NameList>

          <button
            disabled={text === draft.text}
            onClick={() => {
              setSavingDraft(true);
              createOrUpdateDraft(draft.uuid, { ...draft, text }).then(() => {
                setDraft({ ...draft, text });
                setSavingDraft(false);
              });
            }}
          >
            {t("receipt.button.save")}
          </button>
        </div>

        <div className="pdf">
          <PreviewPDF draft={draft} />
        </div>
      </div>

      <style jsx>
        {`
          .intro,
          .names {
            margin-bottom: 5%;
          }

          button {
            margin-top: 20px;
            min-width: 200px;
          }

          button:disabled {
            background-color: lightgrey;
            border: none;
            color: white;
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
