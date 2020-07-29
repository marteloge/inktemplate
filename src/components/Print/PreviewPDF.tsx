import { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
  BlobProvider,
} from "@react-pdf/renderer";

import { Document as DocumentView, Page as PageView } from "react-pdf";

type Text = {
  font: string;
  fontSize: number;
  color: string;
};

type PDFProps = {
  text: Array<string>;
  backgroundImage?: string;
  backgroundColor?: string;
  nameText: Text;
  subText: Text;
};

type StyleProps = {
  cardWidth: number;
  cardHeight: number;
};

const styles = (props: StyleProps) =>
  StyleSheet.create({
    page: {
      height: "100%",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    test: {
      width: props.cardWidth + "cm",
      height: 2 * props.cardHeight + "cm",
      display: "table",
      border: 0.5,
      borderStyle: "dotted",
      borderColor: "grey",
      backgroundColor: "white",
    },
    testFront: {
      backgroundColor: "white",
      width: props.cardWidth + "cm",
      height: props.cardHeight + "cm",
    },
    testBack: {
      backgroundColor: "white",
      width: props.cardWidth + "cm",
      height: props.cardHeight + "cm",
    },
    card: {
      backgroundColor: "white",
      width: props.cardWidth + "pt",
      height: 2 * props.cardHeight + 4 + "cm",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0",
      padding: "0",
    },
    cardBack: {
      width: props.cardWidth + "cm",
      height: props.cardHeight + "cm",
      backgroundColor: "white",
      borderTop: "1cm",
      borderRight: "1pt",
      borderLeft: "1",
      margin: "0",
      padding: "0",
    },
    cardFront: {
      width: props.cardWidth + "cm",
      height: props.cardHeight + "cm",
      backgroundColor: "white",
      borderBottom: "1pt",
      borderRight: "1pt",
      borderLeft: "1pt",
      margin: "0",
      padding: "0",
    },
  });

const PDF = (props: PDFProps) => {
  const width = 8.5 * 0.92;
  const height = 5.5 * 0.92;

  const style = styles({ cardWidth: width, cardHeight: height });
  Font.register({
    family: "Raleway",
    src: "/static/fonts/raleway-v17-latin-regular.ttf",
  });
  Font.register({
    family: "Playfair Display",
    src: "/static/fonts/playfair-display-v21-latin-regular.ttf",
  });

  Font.register({
    family: "Dawning of a New Day",
    src: "/static/fonts/dawning-of-a-new-day-v11-latin-regular.ttf",
  });

  return (
    <Document>
      {[...Array(12 / 6)].map((a, b) => {
        return (
          <Page
            key={"page-" + b}
            size="A4"
            orientation="landscape"
            style={style.page}
          >
            {[...Array(6)].map((e, i) => {
              return (
                <View style={style.test} key={"page-" + i}>
                  <View style={style.testFront}></View>
                  <View>
                    <View style={{ position: "relative" }}>
                      <Image
                        style={{ maxHeight: height - 0.03 + "cm" }}
                        src={props.backgroundImage}
                      ></Image>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: props.nameText.fontSize,
                          fontFamily: "Dawning of a New Day",
                        }}
                      >
                        Janelle
                      </Text>
                      <Text
                        style={{
                          fontSize: props.subText.fontSize,
                          fontFamily: "Raleway",
                        }}
                      >
                        Table 2
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </Page>
        );
      })}
    </Document>
  );
};

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
      <DocumentView
        className="document-view"
        file={link.link}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <PageView
          renderMode="svg"
          renderTextLayer={false}
          scale={1}
          pageNumber={pageNumber}
        />
      </DocumentView>
      <style jsx global>{`
        .wallpaper {
          display: none;
        }
      `}</style>
      <style jsx global>{`
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

const PreviewPDF = (props: PDFProps) => (
  <div className="preview">
    <BlobProvider document={<PDF {...props}></PDF>}>
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

export default PreviewPDF;
