import { createContext, FC, memo, ReactElement, useContext, useEffect, useRef, useState } from "react";
import { get, useFormContext, useWatch } from "react-hook-form";
import { Button, Card, CardActions, CardContent, CardMedia, FormControl, Grid2, InputLabel } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

import { ProgressOverlay } from "@ethberry/mui-page-layout";
import { S3FileInput, useDeleteUrl, Accept } from "@ethberry/mui-inputs-file-s3";
import { ConfirmationDialog } from "@ethberry/mui-dialog-confirmation";
import { TextInput } from "@ethberry/mui-inputs-core";
import { openUrlOnClick } from "@ethberry/popup";

function getInstanceId() {
  return Symbol("instance-id");
}

const InstanceIdContext = createContext<symbol | null>(null);

interface IPhotoItemProps {
  caption: string;
  imageUrl: string;
  index: number;
  name: string;
  onDelete: () => void;
}

const PhotoItem = memo(function PhotoItem({ caption, imageUrl, index, name, onDelete }: IPhotoItemProps) {
  const ref = useRef<HTMLImageElement | null>(null);

  const instanceId = useContext(InstanceIdContext);

  useEffect(() => {
    const el = ref.current!;

    return combine(
      draggable({
        element: el,
        getInitialData: () => ({ type: "grid-item", imageUrl, instanceId }),
      }),
      dropTargetForElements({
        element: el,
        getData: () => ({ imageUrl }),
        getIsSticky: () => true,
        canDrop: ({ source }) =>
          source.data.instanceId === instanceId &&
          source.data.type === "grid-item" &&
          source.data.imageUrl !== imageUrl,
      }),
    );
  }, [instanceId, imageUrl]);

  return (
    <Grid2 ref={ref}>
      <Card>
        <CardMedia
          image={imageUrl}
          onClick={openUrlOnClick(imageUrl)}
          sx={{
            width: 200,
            height: 150,
          }}
        />
        <CardContent>
          <TextInput name={`${name}[${index}].caption`} value={caption} />
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={onDelete}>
            <FormattedMessage id="form.buttons.delete" />
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
});

export interface IPhotoInputProps {
  name: string;
  label?: string | number | ReactElement;
  bucket?: string;
  accept?: Accept;
}

export const PhotoInput: FC<IPhotoInputProps> = props => {
  const { name, label, accept, bucket } = props;

  const form = useFormContext<any>();
  const value: Array<{ caption: string; imageUrl: string }> = get(useWatch(), name);
  const deleteUrl = useDeleteUrl(bucket);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteImageDialogOpen, setIsDeleteImageDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [instanceId] = useState(getInstanceId);

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
    void form.trigger(name);
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
      caption: "",
    });
    form.setValue(name, newValue, { shouldTouch: true, shouldDirty: true });
    // void form.trigger(name);
    setIsLoading(false);
  };

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return source.data.instanceId === instanceId;
      },
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }
        const destinationSrc = destination.data.imageUrl;
        const startSrc = source.data.imageUrl;

        if (typeof destinationSrc !== "string") {
          return;
        }

        if (typeof startSrc !== "string") {
          return;
        }

        const updated = [...value];
        updated[value.findIndex(item => item.imageUrl === startSrc)] = value.find(
          item => item.imageUrl === destinationSrc,
        )!;
        updated[value.findIndex(item => item.imageUrl === destinationSrc)] = value.find(
          item => item.imageUrl === startSrc,
        )!;
        form.setValue(name, updated);
      },
    });
  }, [instanceId, value]);

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <InputLabel id={`form.labels.${name}`} shrink>
        <FormattedMessage id={`form.labels.${name}`} />
      </InputLabel>

      <InstanceIdContext.Provider value={instanceId}>
        <Grid2 container spacing={2} direction="row" justifyContent="flex-start" alignItems="flex-start">
          <Grid2>
            <ProgressOverlay isLoading={isLoading}>
              <S3FileInput
                name={`${name}-file`}
                label={label}
                onChange={handleFileChange}
                bucket={bucket}
                accept={accept}
              />
            </ProgressOverlay>
          </Grid2>
          {value.map((item, i) => (
            <PhotoItem
              caption={item.caption}
              imageUrl={item.imageUrl}
              name={name}
              index={i}
              key={i}
              onDelete={handleOptionDelete(i)}
            />
          ))}
        </Grid2>
      </InstanceIdContext.Provider>

      <ConfirmationDialog open={isDeleteImageDialogOpen} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm}>
        <FormattedMessage id="dialogs.delete" values={{ title: value[selectedImageIndex]?.caption }} />
      </ConfirmationDialog>
    </FormControl>
  );
};
