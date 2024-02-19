export const getImageUrl = (image) => {
  return image;
  if (!image) return null;
  return process.env.EXPO_PUBLIC_API_URL + image;
};

export const getAvatarUrl = (image) => {
  if (image) {
    return { uri: process.env.EXPO_PUBLIC_API_URL + image };
  } else {
    return require("../assets/images/avatar.png");
  }
};
