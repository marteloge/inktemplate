import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import { Draft, Content } from "../helpers/types";

const styles = (draft: Draft) => {
  const { backgroundColor, print } = draft;
  const { printWidth, printHeight } = draft.print;

  return StyleSheet.create({
    page: {
      height: "100%",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    card: {
      width: printWidth + "cm",
      height: print.twosided
        ? 2 * parseFloat(printHeight) + "cm"
        : parseFloat(printHeight) + "cm",
      display: "table",
      border: 0.5,
      borderStyle: "dotted",
      borderColor: "grey",
      backgroundColor: "white",
    },
    back: {
      backgroundColor: "white",
      width: printWidth + "cm",
      height: printHeight + "cm",
      paddingTop: 5,
      fontSize: 15,
    },
    front: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      minWidth: printWidth + "cm",
      minHeight: printHeight + "cm",
      maxHeight: printHeight + "cm",
      backgroundColor: "white",
    },
    background: {
      minWidth: printWidth + "cm",
      minHeight: printHeight + "cm",
      backgroundColor: backgroundColor.color,
      opacity: draft.opacity || 1,
    },
    overlay: {
      backgroundColor: "white",
      opacity: 1 - (draft.opacity || 0),
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
    },
    content: {
      width: "100%",
      height: "100%",
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  });
};

const PDF = (draft: Draft) => {
  let style = styles(draft);

  draft.content.forEach((content: Content) => {
    Font.register({
      family: content.font,
      src: "/static/fonts/" + content.fontSrc + ".ttf",
    });

    style = {
      ...style,
      [content.name]: {
        fontSize: content.fontSize * 0.6,
        fontFamily: content.font,
        color: content.color,
      },
    };
  });

  const text = draft.text.split("\n");
  const printPerPage = draft.print.printPerPage || 6;

  return (
    <Document>
      {[...Array(Math.ceil(text.length / printPerPage))].map((p, pageNum) => {
        return (
          <Page
            key={"page-" + pageNum}
            size={draft.print.paperSize || "A4"}
            orientation={draft.print.orientation || "landscape"}
            style={style.page}
          >
            {[...Array(printPerPage)].map((e, cardNum) => {
              if (pageNum * printPerPage + cardNum + 1 > text.length) {
                return;
              }
              return (
                <View
                  style={style.card}
                  key={"card-" + pageNum + "-" + cardNum}
                >
                  {draft.print.twosided && (
                    <View style={style.back}>
                      {!draft.paid && (
                        <Text
                          style={{
                            textAlign: "center",
                            transform: "rotate(-180deg)",
                          }}
                        >
                          www.inktemplate.com
                        </Text>
                      )}
                    </View>
                  )}
                  <View>
                    <View style={style.front}>
                      {draft.useDesign ? (
                        <View>
                          <Image
                            style={style.image}
                            src={`/static/templates/template${draft.backgroundImage}.jpg`}
                          ></Image>
                          <View style={style.overlay}></View>
                        </View>
                      ) : (
                        <View style={style.background}></View>
                      )}
                    </View>
                    <View style={style.content}>
                      <Text style={style.nameText}>
                        {text[printPerPage * pageNum + cardNum].split(",")[0]}
                      </Text>
                      <Text style={style.subText}>
                        {text[printPerPage * pageNum + cardNum].split(",")[1]}
                      </Text>

                      {!draft.paid && !draft.print.twosided && (
                        <Text
                          style={{
                            position: "absolute",
                            textAlign: "center",
                            width: "100%",
                            height: "100%",
                            fontSize: 7,
                            bottom: 0,
                            top: "92%",
                          }}
                        >
                          www.inktemplate.com
                        </Text>
                      )}
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
