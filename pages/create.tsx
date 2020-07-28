import { useState } from "react";
import Head from "next/head";

import { withTranslation } from "./../i18n";

import { TextDesignComponent } from "../src/components/Design/TextDesign";
import { TextDesign, ColorPickerDesign } from "./../src/types";
import { cardDesigns, colorPickerStyles, imageRoute } from "./../src/global";

import ColorPicker from "../src/components/Design/ColorPicker";
import Preview from "../src/components/Design/Preview";
import Layout from "../src/components/Layout";
import Switch from "../src/components/Design/Switch";
import DesignImagePreview from "../src/components/Design/DesignImagePreview";

const Create = ({ t }) => {
  const width = 400;
  const height = 260;

  const [useDesign, setUseDesign] = useState<boolean>(true);
  const [selectedDesign, setSelectedDesign] = useState<string>("template4");

  const [color, setColor] = useState<ColorPickerDesign>({
    color: "#00bcd4",
    colorPickerOpen: false,
  });

  const [nameText, setNameText] = useState<TextDesign>({
    color: "#000",
    font: "Dawning of a New Day",
    text: "Janelle",
    colorPickerOpen: false,
  });

  const [subText, setSubText] = useState<TextDesign>({
    color: "#000",
    font: "Raleway",
    text: "Table 2",
    colorPickerOpen: false,
  });

  return (
    <Layout>
      <Head>
        <title>{t("meta:create.title")}</title>
        <meta name="description" content={t("meta:create.description")} />
      </Head>

      <div className="container">
        <div className="hero">
          <div id="preview">
            <Preview
              nameText={nameText}
              subText={subText}
              width={width}
              height={height}
              useDesign={useDesign}
              backgroundColor={color.color}
              selectedDesign={selectedDesign}
            />
          </div>
          <div id="intro">
            <h1>{t("create.header")}</h1>
            <p>
              Create your own design for your print! Maybe you find some nice
              designs from our library? Play with fonts, text and colors to get
              your own custom design! Click on the preview button when you are
              ready.
            </p>

            <button>Preview print</button>
          </div>
        </div>

        <Switch setUseDesign={setUseDesign} useDesign={useDesign} />
        <TextDesignComponent id="1" design={nameText} handler={setNameText} />
        <TextDesignComponent id="2" design={subText} handler={setSubText} />

        {!useDesign && (
          <div id="background-color">
            <div
              className="color-display"
              style={colorPickerStyles(color.color).color}
              onClick={() =>
                setColor({
                  ...color,
                  colorPickerOpen: !color.colorPickerOpen,
                })
              }
            />

            {color.colorPickerOpen && (
              <ColorPicker design={color} handler={setColor} />
            )}

            <p>Background color</p>
          </div>
        )}
        <div>
          {useDesign && (
            <DesignImagePreview
              setSelectedDesign={setSelectedDesign}
              width={width}
              height={height}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        #intro {
          padding: 20px;
        }
        #intro h1 {
          margin: 0;
        }

        #intro p {
          margin: 10px 0;
        }

        .container {
          margin: 2% 5%;
        }

        .hero {
          display: flex;
          align-items: center;
        }

        .color-display {
          margin-right: 10px;
        }

        #background-color {
          display: flex;
          align-items: center;
        }
      `}</style>
    </Layout>
  );
};

Create.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Create);
