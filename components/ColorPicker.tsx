import { ChromePicker } from "react-color";
import { colorPickerStyles } from "../helpers/global";
import { Content, ColorPickerDesign } from "../helpers/types";
import { useRef } from "react";

type Props = {
  design: Content | ColorPickerDesign;
  colorPickerOpen: boolean;
  color: string;
  handler: Function;
};

const ColorPicker = (props: Props) => {
  const { design, color, colorPickerOpen, handler } = props;
  const node = useRef(null);

  return (
    <>
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
        <div ref={node}>
          <ChromePicker
            disableAlpha={true}
            color={color}
            onChange={(c) => {
              handler({ ...design, colorPickerOpen: true, color: c.hex });
            }}
          />
        </div>
      </div>
      <style jsx>{``}</style>
    </>
  );
};

export default ColorPicker;
