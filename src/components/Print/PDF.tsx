import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import { StyleProps, PDFProps } from "./../../types";

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
  const style = styles({ cardWidth: props.width, cardHeight: props.height });

  Font.register({
    family: props.subText.font,
    src: props.subText.fontSrc,
  });

  Font.register({
    family: props.nameText.font,
    src: props.nameText.fontSrc,
  });

  return (
    <Document>
      {[...Array(Math.ceil(props.text.length / 6))].map((p, pageNum) => {
        return (
          <Page
            key={"page-" + pageNum}
            size="A4"
            orientation="landscape"
            style={style.page}
          >
            {[...Array(6)].map((e, cardNum) => {
              if (pageNum * 6 + cardNum + 1 > props.text.length) {
                return;
              }
              return (
                <View
                  style={style.test}
                  key={"card-" + pageNum + "-" + cardNum}
                >
                  <View style={style.testFront}></View>

                  <View>
                    <View
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {props.backgroundImage ? (
                        <Image
                          style={{
                            minWidth: props.width + "cm",
                            minHeight: props.height + "cm",
                          }}
                          src={props.backgroundImage}
                        ></Image>
                      ) : (
                        <View
                          style={{
                            minWidth: props.width + "cm",
                            minHeight: props.height + "cm",
                            backgroundColor: props.backgroundColor,
                          }}
                        ></View>
                      )}
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
                          fontFamily: props.nameText.font,
                          color: props.nameText.color,
                        }}
                      >
                        {props.text[6 * pageNum + cardNum] &&
                          props.text[6 * pageNum + cardNum].split(",")[0]}
                      </Text>
                      <Text
                        style={{
                          fontSize: props.subText.fontSize,
                          fontFamily: props.subText.font,
                          color: props.subText.color,
                        }}
                      >
                        {props.text[6 * pageNum + cardNum] &&
                          props.text[6 * pageNum + cardNum].split(",")[1]}
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

export default PDF;
