import { BlockPicker } from "react-color";

import { update, updateField, colorPickerStyles } from "./../../global";
import { TextDesign, ColorPickerDesign } from "./../../types";

type Props = {
  design: TextDesign | ColorPickerDesign;
  handler: Function;
};

const ColorPicker = (props: Props) => {
  const { design, handler } = props;
  const { color, colorPickerOpen } = design;

  return (
    <div style={colorPickerStyles(color).popover}>
      <div
        style={colorPickerStyles(color).cover}
        onClick={() =>
          updateField(design, handler, "colorPickerOpen", colorPickerOpen)
        }
      />
      <BlockPicker
        triangle="hide"
        color={color}
        onChangeComplete={(c) => {
          update(handler, {
            ...design,
            color: c.hex,
            colorPickerOpen: false,
          });
        }}
      />
    </div>
  );
};

export default ColorPicker;
