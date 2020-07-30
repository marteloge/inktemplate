import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

import { PDFProps } from "./../../types";

const styles = (props: PDFProps) => {
  console.log("props PDF", props);
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
      width: props.width + "cm",
      height: 2 * props.height + "cm",
      display: "table",
      border: 0.5,
      borderStyle: "dotted",
      borderColor: "grey",
      backgroundColor: "white",
    },
    back: {
      backgroundColor: "white",
      width: props.width + "cm",
      height: props.height + "cm",
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
      minWidth: props.width + "cm",
      minHeight: props.height + "cm",
      maxHeight: props.height + "cm",
    },
    background: {
      minWidth: props.width + "cm",
      minHeight: props.height + "cm",
      backgroundColor: props.backgroundColor,
    },
    nameText: {
      fontSize: props.nameText.fontSize * 0.6,
      fontFamily: props.nameText.font,
      color: props.nameText.color,
    },
    subText: {
      fontSize: props.subText.fontSize * 0.6,
      fontFamily: props.subText.font,
      color: props.subText.color,
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

const PDF = (props: PDFProps) => {
  const style = styles({ ...props });

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
                      {props.backgroundImage ? (
                        <Image
                          style={style.image}
                          src={
                            "/static/images/" + props.backgroundImage + ".jpg"
                          }
                        ></Image>
                      ) : (
                        <View style={style.background}></View>
                      )}
                    </View>
                    <View style={style.content}>
                      <Text style={style.nameText}>
                        {props.text[6 * pageNum + cardNum].split(",")[0]}
                      </Text>
                      <Text style={style.subText}>
                        {props.text[6 * pageNum + cardNum].split(",")[1]}
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
