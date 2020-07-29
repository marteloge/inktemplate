import { useState } from "react";
import { Document, Page } from "react-pdf";

import {
  PDFDownloadLink,
  Document as Doc,
  Page as Pagg,
  View,
  Text,
  BlobProvider,
} from "@react-pdf/renderer";

const MyDoc = () => (
  <Doc>
    <Pagg size="A4">
      <View>
        <Text>Hello</Text>
      </View>
    </Pagg>
  </Doc>
);

export const App = () => (
  <div>
    <BlobProvider document={<MyDoc></MyDoc>}>
      {({ blob, url, loading, error }) => {
        // Do whatever you need with blob here
        console.log(url);
        return loading ? (
          <h1>Loading</h1>
        ) : (
          <Test2 link={url} blob={blob}></Test2>
        );
      }}
    </BlobProvider>
  </div>
);

export function Test() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(2);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file="/static/test.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page renderMode="svg" pageNumber={1} />
        <Page renderMode="svg" pageNumber={2} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export const Test2 = (link, blob) => {
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

  console.log("GOT THE LINK", link);
  console.log("GOT THE BLOB", blob);

  return (
    <>
      <Document file={link.link} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};
