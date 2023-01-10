import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
URL = require("url").URL;
import axios from "axios";

const Search = ({ navigation }) => {
  // value that holds the users search query
  const [search, setSearch] = useState("");

  // access key from Unsplash API
  const clientID = "yC-DXANJq3HBmvTH9zlyuw1OvtRdC9R1BQyf9w0sB-Y";

  // function that is called when the user hits the Search button
  const handleSubmit = () => {
    // try making an axios GET request
    try {
      // this GET request includes the search word and access key
      axios
        .get(
          "https://api.unsplash.com/search/photos?page=1&query=" +
            search +
            "&client_id=" +
            clientID
        )
        .then(function (response) {
          // handle success
          const results = response;
          // once successful, the results are formed into a JSON array
          // and are sent to the Results screen
          navigation.navigate("Results", {
            resultsArray: results,
            query: search,
            accessKey: clientID,
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.text}>Search for images:</Text>
      <View>
        <Pressable style={styles.input}>
          <TextInput
            style={styles.form}
            placeholder="Images"
            placeholderTextColor="#404040"
            autoCapitalize="none"
            returnKeyType="done"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </Pressable>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 16,
    justifyContent: "flex-center",
    paddingBottom: 10,
    color: "#000",
    fontFamily: "Arial",
  },
  input: {
    width: "75%",
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
    width: "100%",
    height: 45,
    paddingLeft: "3%",
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "500",
    color: "#000",
    paddingTop: "5%",
  },
  submitButton: {
    alignItems: "center",
    backgroundColor: "#000",
    height: 50,
    borderRadius: 25,
    width: "75%",
    justifyContent: "center",
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
