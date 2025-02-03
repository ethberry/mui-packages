import { FC, ReactElement, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid2, InputLabel } from "@mui/material";
import { get, useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { clsx } from "clsx";
import path from "path";

import { TextInput } from "@ethberry/mui-inputs-core";
import { ProgressOverlay } from "@ethberry/mui-page-layout";
import { ConfirmationDialog } from "@ethberry/mui-dialog-confirmation";
import { FirebaseFileInput, useDeleteUrl, Accept } from "@ethberry/mui-inputs-file-firebase";
import { openUrlOnClick } from "@ethberry/popup";

import { useStyles } from "./styles";

export interface IGalleryInputProps {
  name: string;
  label?: string | number | ReactElement;
  bucket?: string;
  accept?: Accept;
  classes?: {
    root?: string;
    media?: string;
  };
}

export const GalleryInput: FC<IGalleryInputProps> = props => {
  const { name, label, accept, bucket } = props;

  const classes = useStyles();

  const form = useFormContext<any>();
  const value = get(useWatch(), name);

  const deleteUrl = useDeleteUrl(bucket);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteImageDialogOpen, setIsDeleteImageDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOptionDelete = (index: number): (() => void) => {
    return (): void => {
      setSelectedImageIndex(index);
      setIsDeleteImageDialogOpen(true);
    };
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    const newValue = get(form.getValues(), name);
    const [deleted] = newValue.splice(selectedImageIndex, 1);
    const fileName = path.basename(new URL(deleted.imageUrl).pathname);

    await deleteUrl(fileName);

    form.setValue(name, newValue, { shouldTouch: false, shouldDirty: true });
    await form.trigger(name);
    setIsDeleteImageDialogOpen(false);
  };

  const handleDeleteCancel = (): void => {
    setIsDeleteImageDialogOpen(false);
  };

  const handleFileChange = (urls: Array<string>): void => {
    setIsLoading(true);
    const newValue = get(form.getValues(), name);
    urls.forEach(imageUrl => {
      newValue.push({
        imageUrl,
        title: "",
      });
    });
    form.setValue(name, newValue, { shouldTouch: true, shouldDirty: true });
    void form.trigger(name);
    setIsLoading(false);
  };

  const handleDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    setIsLoading(true);

    const newValue = get(form.getValues(), name);
    const [removed] = newValue.splice(result.source.index, 1);
    newValue.splice(result.destination.index, 0, removed);

    form.setValue(name, newValue);
    setIsLoading(false);
  };

  return (
    <FormControl fullWidth className={clsx(classes.root, props.classes?.root)}>
      <InputLabel id={`form.labels.${name}`} shrink>
        <FormattedMessage id={`form.labels.${name}`} />
      </InputLabel>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {provided => (
            <Grid2
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              ref={provided.innerRef}
              className={classes.container}
              {...provided.droppableProps}
            >
              <Grid2>
                <ProgressOverlay isLoading={isLoading}>
                  <FirebaseFileInput
                    name={name}
                    label={label}
                    onChange={handleFileChange}
                    classes={{ root: classes.media }}
                    bucket={bucket}
                    accept={accept}
                  />
                </ProgressOverlay>
              </Grid2>
              {value.map((option: { imageUrl: string; title: string }, i: number) => (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {provided => (
                    <Grid2 ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <Card>
                        <CardMedia
                          image={option.imageUrl}
                          onClick={openUrlOnClick(option.imageUrl)}
                          className={clsx(classes.media, props.classes?.media)}
                        />
                        <CardContent>
                          <TextInput name={`${name}[${i}].title`} value={option.title} />
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary" onClick={handleOptionDelete(i)}>
                            <FormattedMessage id="form.buttons.delete" />
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid2>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid2>
          )}
        </Droppable>
      </DragDropContext>

      <ConfirmationDialog open={isDeleteImageDialogOpen} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm}>
        <FormattedMessage id="dialogs.delete" values={value[selectedImageIndex]} />
      </ConfirmationDialog>
    </FormControl>
  );
};
