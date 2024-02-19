import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { colors } from "../../constants";
import { getImageUrl } from "../../utils";

export default function ViewFiles({
  title,
  images,
  viewImage,
  mh = 10,
  ...props
}) {
  const files = props?.files || [];
  const [loading, setLoading] = useState(false);

  const downloadFromUrl = async (url) => {
    const ext = url.split(".").pop();
    const fileUri = FileSystem.documentDirectory + `file.${ext}`;

    const http = url.startsWith("uploads/");
    if (!http) {
      await shareAsync(url);
      return;
    }

    setLoading(true);
    await FileSystem.downloadAsync(getImageUrl(url), fileUri);
    await shareAsync(fileUri);
    setLoading(false);
  };

  return (
    <View style={[styles.container, { marginHorizontal: mh }]}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {files.length === 1 &&
        files[0].title === "" &&
        files[0].files.length === 0 && (
          <Text
            style={[
              styles.title,
              {
                marginTop: 10,
                fontFamily: "Promixa",
                textAlign: "center",
                marginBottom: -30,
              },
            ]}
          >
            No files uploaded
          </Text>
        )}

      {files.map((file, index) => {
        return (
          <View key={index.toString()}>
            <Text
              style={[styles.title, , { marginTop: 10, fontFamily: "Promixa" }]}
            >
              {file?.title}
            </Text>

            <FilesInput
              images={file.files}
              downloadFromUrl={downloadFromUrl}
              viewImage={viewImage}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 4,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  title: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: "PromixaBold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileName: {
    fontSize: 14,
    fontFamily: "Promixa",
  },
  fileContainer: {
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
});

export const FilesInput = ({ images = [], downloadFromUrl, viewImage }) => {
  return (
    <View>
      <View>
        {images?.map((fle, idx) => {
          const name = fle?.uri
            ? fle?.uri.split("/")?.pop()?.substring(0, 20)
            : fle?.filename
            ? fle?.filename.substring(0, 20)
            : fle?.name.substring(0, 20);
          return (
            <View style={[styles.row, styles.fileContainer]} key={idx}>
              <Text style={styles.fileName}>{name}</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => {
                    const newFile = images.map((file, index) => {
                      return {
                        url: file?.url ? getImageUrl(file?.url) : file?.uri,
                        uri: file?.url ? getImageUrl(file?.url) : file?.uri,
                      };
                    });
                    viewImage(newFile, idx);
                  }}
                >
                  <AntDesign name="eyeo" size={24} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    fle?.url
                      ? downloadFromUrl(fle?.url)
                      : downloadFromUrl(fle?.uri);
                  }}
                >
                  <AntDesign name="download" size={24} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
