import { useState } from "react";
import { BlobProvider } from "@react-pdf/renderer";

import PDF from "./PDF";
import { Document, Page } from "react-pdf";
import { PDFProps, Draft } from "./../../types";

const PDFNavigator = (link, blob) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <div className="viewer">
      <div className="navigator">
        <div className="navbar">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
      <Document
        className="document-view"
        file={link.link}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          renderMode="svg"
          renderTextLayer={false}
          scale={1}
          pageNumber={pageNumber}
        />
      </Document>
      <style jsx global>{`
        .wallpaper {
          display: none;
        }
        .navigator {
          width: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }

        .navbar {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .navigator button {
          padding: 10px 20px;
          background: white;
          border-radius: 5px;
          outline: none;
          box-shadow: none;
          border: 1px solid black;
          cursor: pointer;
          margin: 5px 20px 5px 20px;
        }
        .viewer {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

type Props = {
  draft: Draft;
};
const PreviewPDF = (props: Props) => {
  const { draft } = props;
  return (
    <div className="preview">
      <BlobProvider document={<PDF {...draft}></PDF>}>
        {({ blob, url, loading, error }) => {
          return loading ? (
            <div>
              <h1>Painting your PDF</h1>
            </div>
          ) : (
            <div>
              <PDFNavigator link={url} blob={blob}></PDFNavigator>
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
};

export default PreviewPDF;
