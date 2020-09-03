import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import XLSX from "xlsx";

import { Router, withTranslation } from "../helpers/i18n";
import Popup from "./Popup";

const UploadFile = (props) => {
  const { t, open, setOpen, text, setText } = props;
  const [uploadedText, setUploadedText] = useState<string>("");

  const onDrop = useCallback((acceptedFiles) => {
    const file: File = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const arr = e.target.result as Uint8Array;
      let wb = XLSX.read(arr, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];

      setUploadedText(XLSX.utils.sheet_to_csv(sheet));
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: [".csv", ".xsl", ".xlsx"],
  });

  return (
    <Popup open={open} setOpen={setOpen}>
      <div
        className="upload"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          {...getRootProps()}
          style={{
            padding: "5%",
            border: "2px dotted black",
            margin: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input {...getInputProps()} />
          <img src="/static/images/xcel.png"></img>
          <p>{t("upload.dragndrop")}</p>
        </div>

        <div style={{ margin: "30px", textAlign: "center" }}>
          <p>
            {t("upload.question")}
            <br></br>
            <a
              style={{ fontWeight: "bold", textDecoration: "underline" }}
              href="/static/files/InkTemplate.xlsx"
              download="InkTemplate.xlsx"
            >
              {t("upload.download")}
            </a>
          </p>
        </div>

        {uploadedText && (
          <div className="texts">
            <p className="scroll">{uploadedText}</p>
          </div>
        )}

        <div style={{ margin: "20px" }}>
          <button
            disabled={uploadedText.length === 0}
            style={{ marginRight: "20px" }}
            onClick={() => {
              setText(uploadedText);
              setUploadedText("");
              setOpen(false);
              if (!window.location.href.endsWith("#names")) {
                Router.push(window.location.href + "#names");
              } else {
                Router.push(window.location.href);
              }
            }}
          >
            {t("upload.save")}
          </button>
          <button
            onClick={() => {
              setUploadedText("");
              setOpen(false);
              if (!window.location.href.endsWith("#names")) {
                Router.push(window.location.href + "#names");
              } else {
                Router.push(window.location.href);
              }
            }}
          >
            {t("upload.close")}
          </button>
        </div>
      </div>
      <style jsx>{`
        img {
          max-width: 50px;
          margin-right: 10px;
        }

        .texts {
          width: 100%;
          max-width: 500px;
          margin: 20px;
        }

        h4 {
          text-align: center;
        }

        button {
          width: 150px;
        }

        .scroll {
          white-space: pre-line;
          background-color: white;
          border-radius: 10px;
          padding: 20px 20px 0 20px;
          margin: 20px;
          height: 150px;
          overflow-y: scroll;
          padding-bottom: 10px;
        }

        .scroll::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 10px;
        }

        .scroll::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background-color: rgba(0, 0, 0, 0.5);
          -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </Popup>
  );
};

export default withTranslation("")(UploadFile);
