import Select from "react-select";

import { fonts, colorPickerStyles, updateField } from "./../../../src/global";
import { TextDesign } from "./../../types";
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
    }),
  };
};

type Props = {
  id: string;
  design: TextDesign;
  handler: Function;
};

export const TextDesignComponent = (props: Props) => {
  const { design, handler, id } = props;
  const { color, font, text, colorPickerOpen } = design;

  return (
    <div>
      <div
        style={colorPickerStyles(color).color}
        onClick={() =>
          updateField(design, handler, "colorPickerOpen", !colorPickerOpen)
        }
      />

      {colorPickerOpen && <ColorPicker design={design} handler={handler} />}

      <input
        value={text}
        onChange={(e) => updateField(design, handler, "text", e.target.value)}
      ></input>

      <Select
        instanceId={"select-font-" + id}
        className="select"
        value={fonts.find((i) => i.label === font)}
        onChange={(f) => {
          updateField(design, handler, "font", f.label);
        }}
        options={fonts}
        styles={selectStyles(font)}
      />

      <style jsx>
        {`
          display: flex;

          margin-bottom: 5px;

          input {
            margin: 0 10px;
            font-family: "Raleway";
          }
        `}
      </style>
    </div>
  );
};
