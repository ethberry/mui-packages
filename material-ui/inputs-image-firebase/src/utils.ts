import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { getStorage, ref, deleteObject } from "firebase/storage";

import app from "@gemunion/firebase";

export const useDeleteUrl = (bucket?: string): ((url: string) => Promise<void>) => {
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const storage = getStorage(app, bucket);

  return async (url: string): Promise<void> => {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef)
      .then(message => {
        console.info("message", message);
        enqueueSnackbar(formatMessage({ id: "snackbar.deleted" }), { variant: "success" });
      })
      .catch(e => {
        console.error(e);
        if (e.code !== "storage/object-not-found") {
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };
};
