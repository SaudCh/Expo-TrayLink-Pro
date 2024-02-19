import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

export const downloadFromUrl = async (url, setLoading) => {
  const ext = url.split(".").pop();
  const fileUri = FileSystem.documentDirectory + `file.${ext}`;

  const http = url.startsWith("http") || url.startsWith("uploads/");
  if (!http) {
    if (setLoading) setLoading(true);
    await shareAsync(url);
    if (setLoading) setLoading(false);
    return;
  }

  if (setLoading) setLoading(true);
  await FileSystem.downloadAsync(url, fileUri);
  await shareAsync(fileUri);
  if (setLoading) setLoading(false);
};
