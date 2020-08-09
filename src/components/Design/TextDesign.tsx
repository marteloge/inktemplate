import Select from "react-select";

import { fonts, colorPickerStyles, updateContent } from "./../../../src/global";
import { Content } from "./../../types";
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

export const TextDesignComponent = (props: Props) => {
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
        style={colorPickerStyles(color).color}
        onClick={() =>
          updateContent(
            setContent,
            contents,
            { ...content, colorPickerOpen: !colorPickerOpen },
            index
          )
        }
      />

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
            { ...content, font: font.label, font_src: font.src },
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
        `}
      </style>
    </div>
  );
};
