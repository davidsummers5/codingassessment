import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const Description = ({ route, navigation }) => {
  // data passed from Results.js
  const { info, key } = route.params;

  // the new key for the page given
  // example: a image from Results.js with index 73
  // would have the new index of key: 3 on page 7
  const newKey = key % 10;
  const page = Math.floor(key / 10 + 1);

  // URL for the download of selected image
  let REMOTE_IMAGE_PATH = info.data.results[newKey].links.download;

  // function called when Download button is pressed
  const downloadImage = async () => {
    try {
      // user must allow access to camera roll
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        // filename to be put into the cacheDirectory
        const fileName = REMOTE_IMAGE_PATH.replace(/^.*[\\\/]/, "");

        // if there is an error it is most likely because the directory does not exist

        // download the image to local cacheDirectory
        await FileSystem.downloadAsync(
          REMOTE_IMAGE_PATH,
          FileSystem.cacheDirectory + fileName + ".jpg"
        ).then(({ uri }) => {
          // once local uri is made it can be added to phones camera roll
          MediaLibrary.getPermissionsAsync();
          MediaLibrary.saveToLibraryAsync(
            FileSystem.cacheDirectory + fileName + ".jpg"
          ).then(Alert.alert("Image Saved Successfully"));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // description of image that includes the full image, username, and number of likes
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Image Details</Text>
      <View style={styles.click}>
        <Image
          source={{ uri: info.data.results[newKey].urls.full }}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>
        Username: {info.data.results[newKey].user.username} | Likes:{" "}
        {info.data.results[newKey].likes}
      </Text>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => downloadImage()}
      >
        <Text style={styles.buttonText}>Download Image</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    fontWeight: "500",
    paddingLeft: 10,
    fontSize: 16,
    justifyContent: "flex-start",
    paddingBottom: 10,
    color: "#000",
    fontFamily: "Arial",
  },
  input: {
    width: 300,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    //flex: 1,
    paddingBottom: 20,
    paddingTop: 0,
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 1,
    shadowColor: "#f0fff0",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  form: {
    width: 300,
    height: 45,
    paddingLeft: "5%",
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "500",
    color: "#000",
    paddingTop: 15,
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#000",
    height: 50,
    borderRadius: 25,
    width: "75%",
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    paddingBottom: 20,
  },
  click: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonText: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 16,
    justifyContent: "center",
    color: "#fff",
    fontFamily: "Arial",
  },
});
