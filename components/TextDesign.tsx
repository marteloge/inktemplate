import Select from "react-select";

import { fonts, colorPickerStyles, updateContent } from "../helpers/global";
import { Content } from "../helpers/types";
import ColorPicker from "./ColorPicker";

const selectStyles = (font) => {
  return {
    option: (provided, state) => {
      return {
        ...provided,
        fontFamily: state.data.label,
      };
    },
    control: (styles) => ({
      ...styles,
      fontFamily: font,
      backgroundColor: "white",
      minWidth: "200px",
      border: "none",
      height: "40px",
    }),
  };
};

type Props = {
  index: number;
  content: Content;
  contents: Array<Content>;
  setContent: Function;
};

const TextDesignComponent = (props: Props) => {
  const { content, contents, setContent, index } = props;
  const { name, color, font, text, colorPickerOpen } = content;

  const updateColor = (input) => {
    updateContent(
      setContent,
      contents,
      {
        ...content,
        color: input.color,
        colorPickerOpen: input.colorPickerOpen,
      },
      index
    );
  };

  return (
    <div>
      <div
        className="color-circle"
        style={colorPickerStyles(color).color}
        onClick={() =>
          updateContent(
            setContent,
            contents,
            { ...content, colorPickerOpen: !colorPickerOpen },
            index
          )
        }
      >
        {colorPickerOpen && <p className="cross">x</p>}
      </div>

      {colorPickerOpen && (
        <ColorPicker
          handler={updateColor}
          design={content}
          color={color}
          colorPickerOpen={colorPickerOpen}
        />
      )}

      <input
        value={text}
        onChange={(e) =>
          updateContent(
            setContent,
            contents,
            {
              ...content,
              text: e.target.value,
            },
            index
          )
        }
      ></input>

      <Select
        instanceId={"select-font-" + name}
        className="select"
        value={fonts.find((i) => i.label === font)}
        onChange={(font) => {
          updateContent(
            setContent,
            contents,
            { ...content, font: font.label, fontSrc: font.src },
            index
          );
        }}
        options={fonts}
        styles={selectStyles(font)}
      />

      <style jsx>
        {`
          display: flex;
          margin-bottom: 7px;

          input {
            font-family: "Raleway";
            border-radius: 5px;
            border: none;
            padding-left: 2px;
            text-align: center;
            height: 40px;
            margin: 0 10px;
            padding: 0;
          }

          .cross {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            color: black;
          }

          .cross:hover {
            color: white;
          }

          @media (max-width: 850px) {
            justify-content: start;

            input {
              display: none;
            }
            .select {
              margin-left: 2%;
            }
            .color-circle {
              margin-right: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TextDesignComponent;
