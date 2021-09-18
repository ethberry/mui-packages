import { forwardRef } from "react";
import { InputBaseComponentProps } from "@mui/material/InputBase";
import { EditorState } from "draft-js";
import { IRichTextEditorRef, RichTextEditor, TToolbarControl } from "@gemunion/mui-rte";

export interface IRichTextInputProps extends Omit<InputBaseComponentProps, "value"> {
  doFocus?: boolean;
  onStateChange?: (state: EditorState) => void;
  controls?: Array<TToolbarControl>;
}

export const RichTextInput = forwardRef<IRichTextEditorRef, IRichTextInputProps>((props, ref) => {
  return <RichTextEditor controls={props.controls} onChange={props.onStateChange} ref={ref} />;
});
