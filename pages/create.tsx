import { useState } from "react";
import Head from "next/head";

import { withTranslation } from "./../i18n";

import { TextDesignComponent } from "../src/components/Design/TextDesign";
import { TextDesign, ColorPickerDesign } from "./../src/types";
import { colorPickerStyles } from "./../src/global";

import ColorPicker from "../src/components/Design/ColorPicker";
import Preview from "../src/components/Design/Preview";
import Layout from "../src/components/Layout";
import Switch from "../src/components/Design/Switch";
import DesignImagePreview from "../src/components/Design/DesignImagePreview";
import NameList from "../src/components/Design/NameList";

const Create = ({ t }) => {
  const width = 400;
  const height = 260;

  const [useDesign, setUseDesign] = useState<boolean>(true);
  const [selectedDesign, setSelectedDesign] = useState<string>("template4");
  const [content, setContent] = useState<string>(
    "Janelle, Table 4; Rory, Table6;"
  );

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
      <div className="sticky">
        <button>Generate PDF</button>
        <button>Priview Print</button>
      </div>

      <div className="content">
        <h1>{t("create.header")}</h1>
        <p>
          Create your own design for your print! Maybe you find some nice
          designs from our library? Play with fonts, text and colors to get your
          own custom design! Click on the preview button when you are ready.
        </p>
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
            <Switch
              setUseDesign={setUseDesign}
              useDesign={useDesign}
              color={color.color}
              image={selectedDesign}
            />
            <div>
              <TextDesignComponent
                id="1"
                design={nameText}
                handler={setNameText}
              />
              <TextDesignComponent
                id="2"
                design={subText}
                handler={setSubText}
              />
            </div>

            <div>
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
            </div>
          </div>
        </div>

        <div id="bottom">
          <div>
            <NameList list={content} handler={setContent} width={width} />
          </div>
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
      </div>

      <style jsx>{`
        #bottom {
          display: flex;
        }
        .content {
          padding: 0 5%;
          max-width: 1090px;
          margin: 0 auto;
          margin-bottom: 10%;
        }
        .sticky {
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: rgb(256, 256, 256, 0.9);

          box-shadow: -10px -10px 30px rgba(238, 233, 231, 0.6);
          background-color: rgba(238, 233, 231, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button {
          padding: 10px 20px;
          background: none;
          border: 1px solid black;
          cursor: pointer;
        }

        .sticky button {
          margin: 20px;
        }

        #intro {
          padding: 0 20px;
        }

        #intro h1 {
          margin: 0;
        }

        #intro p {
          margin: 10px 0;
        }

        .hero {
          display: flex;
          align-items: center;
          margin: 5% 0 2% 0;
        }

        .color-display {
          margin-right: 10px;
        }

        #background-color {
          display: flex;
          align-items: center;
          visibility: ${useDesign ? "hidden" : "initial"};
        }
      `}</style>
    </Layout>
  );
};

Create.getInitialProps = async () => ({
  namespacesRequired: ["common", "meta"],
});

export default withTranslation("common")(Create);
