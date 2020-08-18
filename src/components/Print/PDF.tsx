import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import { Draft, Content } from "../../types";
import { toTextArray } from "../../global";

const styles = (draft: Draft) => {
  const { backgroundColor } = draft;
  const { printWidth, printHeight } = draft.product;

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
      height: 2 * parseFloat(printHeight) + "cm",
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
    },
    background: {
      minWidth: printWidth + "cm",
      minHeight: printHeight + "cm",
      backgroundColor: backgroundColor.color,
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

  const text = toTextArray(draft.text);

  return (
    <Document>
      {[...Array(Math.ceil(text.length / 6))].map((p, pageNum) => {
        return (
          <Page
            key={"page-" + pageNum}
            size="A4"
            orientation="landscape"
            style={style.page}
          >
            {[...Array(6)].map((e, cardNum) => {
              if (pageNum * 6 + cardNum + 1 > text.length) {
                return;
              }
              return (
                <View
                  style={style.card}
                  key={"card-" + pageNum + "-" + cardNum}
                >
                  <View style={style.back}>
                    <Text
                      style={{
                        textAlign: "center",
                        transform: "rotate(-180deg)",
                      }}
                    >
                      www.inktemplate.com
                    </Text>
                  </View>
                  <View>
                    <View style={style.front}>
                      {draft.useDesign ? (
                        <Image
                          style={style.image}
                          src={`/static/images/${draft.backgroundImage}.jpg`}
                        ></Image>
                      ) : (
                        <View style={style.background}></View>
                      )}
                    </View>
                    <View style={style.content}>
                      <Text style={style.nameText}>
                        {text[6 * pageNum + cardNum].split(",")[0]}
                      </Text>
                      <Text style={style.subText}>
                        {text[6 * pageNum + cardNum].split(",")[1]}
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
