import { FC, ReactElement, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid, InputLabel } from "@mui/material";
import { get, useFormContext, useWatch } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { clsx } from "clsx";

import { TextInput } from "@gemunion/mui-inputs-core";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { ConfirmationDialog } from "@gemunion/mui-dialog-confirmation";
import { S3FileInput, useDeleteUrl, Accept } from "@gemunion/mui-inputs-file-s3";
import { openUrlOnClick } from "@gemunion/popup";

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

    await deleteUrl(deleted.imageUrl);

    form.setValue(name, newValue, { shouldTouch: false, shouldDirty: true });
    await form.trigger(name);
    setIsDeleteImageDialogOpen(false);
  };

  const handleDeleteCancel = (): void => {
    setIsDeleteImageDialogOpen(false);
  };

  const handleFileChange = (url: string): void => {
    setIsLoading(true);
    const newValue = get(form.getValues(), name);
    newValue.push({
      imageUrl: url,
      title: "",
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

    form.setValue(name, newValue, { shouldTouch: true });
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
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              ref={provided.innerRef}
              className={classes.container}
              {...provided.droppableProps}
            >
              <Grid item>
                <ProgressOverlay isLoading={isLoading}>
                  <S3FileInput
                    name={name}
                    label={label}
                    onChange={handleFileChange}
                    classes={{ root: classes.media }}
                    bucket={bucket}
                    accept={accept}
                  />
                </ProgressOverlay>
              </Grid>
              {value.map((option: { imageUrl: string; title: string }, i: number) => (
                <Draggable key={i} draggableId={i.toString()} index={i}>
                  {provided => (
                    <Grid item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
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
                    </Grid>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      <ConfirmationDialog open={isDeleteImageDialogOpen} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm}>
        <FormattedMessage id="dialogs.delete" values={value[selectedImageIndex]} />
      </ConfirmationDialog>
    </FormControl>
  );
};
