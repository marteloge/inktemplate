import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";

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

const PreviewPDF = (props: PDFProps) => {
  // const width = 321 * 0.7; //273
  // const height = 208 * 0.7; //177
  // 595cm x 842cm

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
    <div id="content">
      <PDFViewer>
        <Document>
          {[...Array(12 / 6)].map((a, b) => {
            return (
              <Page size="A4" orientation="landscape" style={style.page}>
                {[...Array(6)].map((e, i) => {
                  return (
                    <View style={style.test}>
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
      </PDFViewer>

      <style jsx global>{`
        iframe {
          width: 100%;
          height: 400px;
        }
      `}</style>
    </div>
  );
};

// In centimeters: 21cm x 29.7cm ( 7.35 x 4.95)
// 5.5 x 8.5 cm

export default PreviewPDF;
