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

export const downloadBase64 = async (base64, setLoading) => {
  // download base64 in png format
  const fileUri = FileSystem.documentDirectory + "file.png";
  if (setLoading) setLoading(true);
  await FileSystem.writeAsStringAsync(fileUri, base64, {
    encoding: FileSystem.EncodingType.Base64,
  });
  await shareAsync(fileUri);
  if (setLoading) setLoading(false);
};
