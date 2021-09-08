import { forwardRef, Fragment } from "react";
import { InputBaseComponentProps } from "@material-ui/core/InputBase";
import { EditorState } from "draft-js";
import { IRichTextEditorRef, RichTextEditor, TToolbarControl } from "@gemunion/mui-rte";

export interface IRichTextInputProps extends Omit<InputBaseComponentProps, "value"> {
  doFocus?: boolean;
  onStateChange?: (state: EditorState) => void;
  controls?: Array<TToolbarControl>;
}

export const RichTextInput = forwardRef<IRichTextEditorRef, IRichTextInputProps>((props, ref) => {
  const { onStateChange, ...rest } = props;
  return (
    <Fragment>
      <RichTextEditor onChange={onStateChange} {...rest} ref={ref} />
    </Fragment>
  );
});
