import { BlockPicker } from "react-color";
import { colorPickerStyles } from "../helpers/global";
import { Content, ColorPickerDesign } from "../helpers/types";

type Props = {
  design: Content | ColorPickerDesign;
  colorPickerOpen: boolean;
  color: string;
  handler: Function;
};

const ColorPicker = (props: Props) => {
  const { design, color, colorPickerOpen, handler } = props;

  return (
    <div style={colorPickerStyles(color).popover}>
      <div
        style={colorPickerStyles(color).cover}
        onClick={() =>
          handler({
            ...design,
            color: color,
            colorPickerOpen: !colorPickerOpen,
          })
        }
      />

      <BlockPicker
        triangle="hide"
        color={color}
        onChangeComplete={(c) => {
          handler({ ...design, colorPickerOpen: false, color: c.hex });
        }}
      />
    </div>
  );
};

export default ColorPicker;
