import { Feather } from "@expo/vector-icons";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import {
  Platform,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { colors } from "../../constants";
import { Checkbox } from "react-native-paper";
import { getImageUrl } from "../../utils";

export const TextInput = ({
  label,
  mb = 10,
  error,
  containerStyle,
  inputStyles,
  disabled,
  style,
  type,
  onPress,
  icon,
  iconText = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [isSecure, setIsSecure] = React.useState(type === "password");

  return (
    <>
      <View
        style={[
          styles.container,
          { marginBottom: error ? 0 : mb },
          error && { borderColor: colors.danger },
          isFocused && { borderColor: colors.primary },
          containerStyle,
        ]}
      >
        <Text style={[styles.label, isFocused && { color: colors.primary }]}>
          {label}
        </Text>
        {disabled ? (
          <Text style={[styles.input, inputStyles]}>{props.value}</Text>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RNTextInput
              style={[styles.input, inputStyles, style]}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              secureTextEntry={isSecure}
              {...props}
            />
            {type === "password" && (
              <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                <Feather
                  name={isSecure ? "eye-off" : "eye"}
                  size={24}
                  color={isFocused ? colors.primary : colors.grey}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onPress}>
              {icon ? (
                icon
              ) : (
                <Text style={{ color: colors.secondary }}>{iconText}</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
      {error && (
        <Text
          style={{
            color: colors.danger,
            fontSize: 12,
          }}
        >
          {error}
        </Text>
      )}
    </>
  );
};

export const DateInput = ({
  label,
  placeholder,
  mb = 10,
  value,
  error,
  onPress,
}) => {
  return (
    <View style={{ marginBottom: mb }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "semibold",
          marginBottom: 5,
        }}
      >
        {label}
      </Text>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          height: 42,
        }}
        onPress={onPress}
      >
        {value ? (
          <Text>{value}</Text>
        ) : (
          <Text style={{ color: "#ccc" }}>{placeholder}</Text>
        )}
      </TouchableOpacity>
      {error && (
        <Text
          style={{
            color: colors.danger,
            fontSize: 12,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export const CheckBoxInput = ({ label, mb = 10, value, onChange }) => {
  return (
    <View style={{ marginBottom: mb }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox.Android
          status={value ? "checked" : "unchecked"}
          onPress={() => onChange(!value)}
          color={"#27AE60"}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "semibold",
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          {label}
        </Text>
      </View>
    </View>
  );
};

export const IncCounter = ({
  label,
  placeholder,
  mb = 10,
  value,
  error,
  onPress,
}) => {
  return (
    <View style={{ marginBottom: mb }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "semibold",
          marginBottom: 5,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={onPress}
      >
        {value ? (
          <Text>{value}</Text>
        ) : (
          <Text style={{ color: "#ccc" }}>{placeholder}</Text>
        )}

        <TouchableOpacity onPress={onPress}>
          <AntDesign name="plussquare" size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>
      {error && (
        <Text
          style={{
            color: colors.danger,
            fontSize: 12,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export const ButtonInput = ({
  label,
  mb = 10,
  value,
  error,
  onPress,
  containerStyle,
  icon,
  iconText = "Select",
}) => {
  return (
    <View>
      <View
        style={[
          styles.container,
          { marginBottom: error ? 0 : mb },
          error && { borderColor: colors.danger },
          containerStyle,
        ]}
      >
        <Text style={styles.label}>{label}</Text>

        <View style={styles.buttonInput} onPress={onPress}>
          {value ? (
            <Text
              style={{
                color: colors.primary,
                width: "85%",
              }}
            >
              {value.length > 48 ? value.substring(0, 48) + ".." : value}
            </Text>
          ) : (
            <View />
          )}

          <TouchableOpacity onPress={onPress}>
            {icon ? (
              icon
            ) : (
              <Text style={{ color: colors.secondary }}>{iconText}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {error && (
        <Text
          style={{
            color: colors.danger,
            fontSize: 12,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export const ImagesInput = ({
  label,
  mb = 10,
  error,
  images = [],
  setImages,
  resetError,
}) => {
  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "application/msword", "image/*"],
    });

    if (!result.canceled) {
      if (resetError) resetError();
      setImages((prev) => [...prev, ...result?.assets]);
    }
  };
  return (
    <View style={[{ marginBottom: mb }]}>
      <View
        style={[
          styles.imageContainer,
          {
            borderColor: error ? colors.danger : "#F6F6F6",
          },
        ]}
        onPress={pickImage}
      >
        <Text style={[styles.label2, { fontSize: 14 }]}>
          Upload
          <Text style={{ color: colors.grey }}>
            {" "}
            (PDF, Docs, JPEG, 15MB Max)
          </Text>
        </Text>
        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: colors.secondary,
            padding: 14,
            borderTopEndRadius: 10,
            borderBottomEndRadius: 10,
          }}
        >
          <Feather name="upload" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {error && (
        <Text
          style={{
            color: colors.danger,
            fontSize: 12,
          }}
        >
          {error}
        </Text>
      )}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {images.length > 0 &&
          images.map((image, index) => {
            return (
              // return a gray box with a name and cross icon
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  marginRight: 10,
                  backgroundColor: "#F6F6F6",
                  padding: 5,
                  borderRadius: 8,
                }}
              >
                <Text style={{ marginRight: 10 }}>
                  {image.name ? image.name.substring(0, 10) + ".." : "Image"}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setImages((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <Feather name="x" size={24} color={"#000"} />
                </TouchableOpacity>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export const FilesInput = ({
  mb = 10,
  error,
  images = [],
  setImages,
  handleDelete,
  edit,
  index,
  downloadFromUrl,
  viewImage,
}) => {
  const pickImage = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "image/*",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    });

    if (!result.canceled) {
      // if (resetError) resetError();
      setImages(result?.assets, index);
    }

    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   aspect: [1, 1],
    //   quality: 1,
    //   allowsMultipleSelection: true,
    // });

    // if (!result.canceled) {
    //   setImages(result.assets, index);
    // }
  };

  return (
    <View style={[{ marginBottom: mb }]}>
      {edit && (
        <View
          style={[
            styles.imageContainer,
            {
              marginBottom: error ? 0 : 10,
              borderColor: error ? colors.danger : "#F6F6F6",
            },
          ]}
          onPress={pickImage}
        >
          <Text style={[styles.label2, { fontSize: 14 }]}>
            Upload
            <Text style={{ color: colors.grey }}>
              {" "}
              (PDF, Docs, JPEG, 15MB Max)
            </Text>
          </Text>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: colors.secondary,
              padding: 14,
              borderTopEndRadius: 10,
              borderBottomEndRadius: 10,
            }}
          >
            <Feather name="upload" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
      {error && edit && (
        <Text
          style={{
            color: colors.danger,
            fontSize: 12,
            marginBottom: 10,
          }}
        >
          {error}
        </Text>
      )}
      <View>
        {images?.map((fle, idx) => {
          const name = fle?.uri
            ? fle?.uri.split("/")?.pop()?.substring(0, 10)
            : fle?.filename
            ? fle?.filename.substring(0, 10)
            : fle?.name.substring(0, 20);
          return (
            <View style={[styles.row, styles.fileContainer]} key={idx}>
              <Text style={styles.fileName}>{name}</Text>
              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => {
                    const newLinks = images.map((link) => {
                      return {
                        url: link?.url ? getImageUrl(link?.url) : link?.uri,
                        uri: link?.url ? getImageUrl(link?.url) : link?.uri,
                      };
                    });
                    viewImage(newLinks, idx);
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
                {edit && (
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(index, idx);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete-forever-outline"
                      size={24}
                      color={colors.danger}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export const Label = ({ label, mb = 10, optional }) => {
  return (
    <View style={{ marginBottom: mb }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginBottom: 5,
          color: colors.primary,
        }}
      >
        {label}{" "}
        {optional && <Text style={{ color: colors.grey }}>(Optional)</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    padding: 10,
    borderColor: colors.grey,
    borderWidth: 1,
    paddingTop: 5,
    paddingLeft: 10,
    marginTop: 10,
    position: "relative",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    borderColor: colors.grey,
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 10,
    height: 54.3,
  },
  label: {
    color: colors.grey,
    fontSize: 12,
    marginBottom: 3,
    // flex: 1,
  },
  label2: {
    color: colors.primary,
    fontSize: 12,
  },
  input: {
    color: colors.primary,
    fontSize: 15,
    height: 20,
    flex: 1,
  },
  buttonInput: {
    color: colors.primary,
    fontSize: 15,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fileContainer: {
    padding: 10,
    backgroundColor: "#f6f6f6",
    borderRadius: 4,
    marginBottom: 10,
  },
});
