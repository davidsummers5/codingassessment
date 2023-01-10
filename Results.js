import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const Results = ({ route, navigation }) => {
  // data that is passed from the Search.js page
  const { resultsArray, query, accessKey } = route.params;
  // data is stored into a more narrowed down array
  const data = resultsArray.data.results;

  // the max number of pages and images that are under this query
  const maxPages = resultsArray.data.total_pages;
  const maxTotal = resultsArray.data.total;

  // array that holds the full URL links to all images on FlatList
  const thumbnails = [];

  // if the total # of images will not fill a whole page
  if (maxTotal < 10) {
    for (let index = 0; index < maxTotal; index++) {
      thumbnails[index] = data[index].urls.thumb;
    }
  } else {
    for (let index = 0; index < 10; index++) {
      thumbnails[index] = data[index].urls.thumb;
    }
  }

  // color options for filtering dropdown
  const [openColor, setOpenColor] = useState(false);
  const [color, setColor] = useState(null);
  const [itemsColor, setItemsColor] = useState([
    { label: "None", value: null },
    { label: "Black & White", value: "black_and_white" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
    { label: "Yellow", value: "yellow" },
    { label: "Orange", value: "orange" },
    { label: "Red", value: "red" },
    { label: "Purple", value: "purple" },
    { label: "Magenta", value: "magenta" },
    { label: "Green", value: "green" },
    { label: "Teal", value: "teal" },
    { label: "Blue", value: "blue" },
  ]);

  // orientation options for filtering
  const [openOrientation, setOpenOrientation] = useState(false);
  const [orientation, setOrientation] = useState(null);
  const [itemsOrientation, setItemsOrientation] = useState([
    { label: "None", value: null },
    { label: "Landscape", value: "landscape" },
    { label: "Portrait", value: "portrait" },
    { label: "Square", value: "squarish" },
  ]);

  // function that is called when a filter is applied
  const onFilter = (colorParam, orientationParam) => {
    const page = 1;
    // debugging the output from the dropdown filter
    console.log(colorParam);
    console.log(orientationParam);
    // if a color filter is applied but not orientation
    if (colorParam != null && orientationParam == null) {
      // colorParam does not return null when a filter is applied then set back to none
      if (colorParam.value == null) {
        axios
          .get(
            "https://api.unsplash.com/search/photos?page=1&query=" +
              query +
              "&client_id=" +
              accessKey +
              "&page=" +
              page
          )
          .then(function (response) {
            const results = response;
            setLoading(true);
            navigation.navigate("Results", {
              resultsArray: results,
              query: query,
              accessKey: accessKey,
            });
          });
      } else {
        // call API to get our data with color filter
        axios
          .get(
            "https://api.unsplash.com/search/photos?page=1&query=" +
              query +
              "&client_id=" +
              accessKey +
              "&page=" +
              page +
              "&color=" +
              colorParam.value
          )
          .then(function (response) {
            const results = response;
            // re-render the page with new results
            navigation.navigate("Results", {
              resultsArray: results,
              query: query,
              accessKey: accessKey,
            });
          });
      }
    }
    // if orientation filter is applied but not color filter
    if (colorParam == null && orientationParam != null) {
      // orientationParam does not return null when a filter is applied then set back to none
      if (orientationParam.value == null) {
        axios
          .get(
            "https://api.unsplash.com/search/photos?page=1&query=" +
              query +
              "&client_id=" +
              accessKey +
              "&page=" +
              page
          )
          .then(function (response) {
            const results = response;
            setClosed(true);
            navigation.navigate("Results", {
              resultsArray: results,
              query: query,
              accessKey: accessKey,
            });
          });
      } else {
        // GET request to API to get new data with filter
        axios
          .get(
            "https://api.unsplash.com/search/photos?page=1&query=" +
              query +
              "&client_id=" +
              accessKey +
              "&page=" +
              page +
              "&orientation=" +
              orientationParam.value
          )
          .then(function (response) {
            const results = response;
            // re-render page with new filtered data
            navigation.navigate("Results", {
              resultsArray: results,
              query: query,
              accessKey: accessKey,
            });
          });
      }
    }
    // if both filters are applied
    if (colorParam != null && orientationParam != null) {
      // when a filter is applied the other filters value is set to the original param const
      // therefore the param.value would be undefined on one filter but not the other
      if (colorParam.value == undefined) {
        if (orientationParam.value == null) {
          // when orientationParam's true value is null
          axios
            .get(
              "https://api.unsplash.com/search/photos?page=1&query=" +
                query +
                "&client_id=" +
                accessKey +
                "&page=" +
                page +
                "&color=" +
                colorParam
            )
            .then(function (response) {
              const results = response;
              setClosed(true);
              navigation.navigate("Results", {
                resultsArray: results,
                query: query,
                accessKey: accessKey,
              });
            });
        } else {
          // GET request for both color and orientation filter
          axios
            .get(
              "https://api.unsplash.com/search/photos?page=1&query=" +
                query +
                "&client_id=" +
                accessKey +
                "&page=" +
                page +
                "&color=" +
                colorParam +
                "&orientation=" +
                orientationParam.value
            )
            .then(function (response) {
              const results = response;
              setClosed(true);
              navigation.navigate("Results", {
                resultsArray: results,
                query: query,
                accessKey: accessKey,
              });
            });
        }
      }
      // same case as stated earlier, ones value is stored in the parent
      if (orientationParam.value == undefined) {
        if (colorParam.value == null) {
          // when colorParam returns not empty but the value is null
          // this is the case when the color filter is set back to none
          axios
            .get(
              "https://api.unsplash.com/search/photos?page=1&query=" +
                query +
                "&client_id=" +
                accessKey +
                "&page=" +
                page +
                "&orientation=" +
                orientationParam
            )
            .then(function (response) {
              const results = response;
              setClosed(true);
              navigation.navigate("Results", {
                resultsArray: results,
                query: query,
                accessKey: accessKey,
              });
            });
        } else {
          // GET request for both filters
          axios
            .get(
              "https://api.unsplash.com/search/photos?page=1&query=" +
                query +
                "&client_id=" +
                accessKey +
                "&page=" +
                page +
                "&color=" +
                colorParam.value +
                "&orientation=" +
                orientationParam
            )
            .then(function (response) {
              const results = response;
              setClosed(true);
              navigation.navigate("Results", {
                resultsArray: results,
                query: query,
                accessKey: accessKey,
              });
            });
        }
      }
    }
    // when the colorParam and orientationParam are set back to none
    if (colorParam == null && orientationParam == null) {
      axios
        .get(
          "https://api.unsplash.com/search/photos?page=1&query=" +
            query +
            "&client_id=" +
            accessKey +
            "&page=" +
            page
        )
        .then(function (response) {
          const results = response;
          setClosed(true);
          navigation.navigate("Results", {
            resultsArray: results,
            query: query,
            accessKey: accessKey,
          });
        });
    }
    //}
  };

  // functioned called when the user reaches the end of the FlatList
  // new data is populated to offer an infite scroll
  const endScroll = () => {
    try {
      // the page number to be given to API
      // length of the current array divided by the amount per call plus one
      const page = thumbnails.length / 10 + 1;

      // runs until pages reaches the total number of pages in the query
      if (page < maxPages) {
        // if there is no filters set
        if (color == null && orientation == null) {
          axios
            .get(
              "https://api.unsplash.com/search/photos?page=1&query=" +
                query +
                "&client_id=" +
                accessKey +
                "&page=" +
                page
            )
            .then(function (response) {
              // handle success
              const results = response;
              // data JSON
              const data = results.data.results;
              // index intialization for this page
              let dataIndex = 0;
              // for loop that populates the thumbnails array with more data
              for (
                let index = thumbnails.length;
                index < thumbnails.length + 10;
                index++
              ) {
                thumbnails[index] = data[dataIndex].urls.thumb;
                dataIndex = dataIndex + 1;
              }
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        }
        // if a color filter is applied
        if (color != null && orientation == null) {
          // API Call
          axios
            .get(
              "https://api.unsplash.com/search/photos?page=1&query=" +
                query +
                "&client_id=" +
                accessKey +
                "&page=" +
                page +
                "&color=" +
                color
            )
            .then(function (response) {
              // handle success
              const results = response;
              // JSON data
              const data = results.data.results;
              // index for this page
              let dataIndex = 0;
              // loop that populates thumbnails array
              for (
                let index = thumbnails.length;
                index < thumbnails.length + 10;
                index++
              ) {
                thumbnails[index] = data[dataIndex].urls.thumb;
                dataIndex = dataIndex + 1;
              }
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        }
        // if orientation filter is applied
        if (color == null && orientation != null) {
          // API call
          axios
            .get(
              "https://api.unsplash.com/search/photos?page=1&query=" +
                query +
                "&client_id=" +
                accessKey +
                "&page=" +
                page +
                "&orientation=" +
                orientation
            )
            .then(function (response) {
              // handle success
              const results = response;
              // JSON data
              const data = results.data.results;
              // index for this page
              let dataIndex = 0;
              // data added to thumbnails array
              for (
                let index = thumbnails.length;
                index < thumbnails.length + 10;
                index++
              ) {
                thumbnails[index] = data[dataIndex].urls.thumb;
                dataIndex = dataIndex + 1;
              }
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        }
        // if both filters are applied
        if (color != null && orientation != null) {
          // API call
          axios
            .get(
              "https://api.unsplash.com/search/photos?page=1&query=" +
                query +
                "&client_id=" +
                accessKey +
                "&page=" +
                page +
                "&color=" +
                color +
                "&orientation=" +
                orientation
            )
            .then(function (response) {
              // handle success
              const results = response;
              // JSON data
              const data = results.data.results;
              // index for this page
              let dataIndex = 0;
              // populate thumbnails array
              for (
                let index = thumbnails.length;
                index < thumbnails.length + 10;
                index++
              ) {
                thumbnails[index] = data[dataIndex].urls.thumb;
                dataIndex = dataIndex + 1;
              }
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // function that fetches data for the next Descriptions.js page
  const fetchData = (index) => {
    // page number is the total index divided by 10 and rounded down
    const page = Math.floor(index / 10 + 1);

    // if no filter applied
    if (color == null && orientation == null) {
      axios
        .get(
          "https://api.unsplash.com/search/photos?page=1&query=" +
            query +
            "&client_id=" +
            accessKey +
            "&page=" +
            page
        )
        .then(function (response) {
          // navigate to Descriptions screeen with the index and JSON data
          navigation.navigate("Description", {
            info: response,
            key: index,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // if color filtered
    if (color != null && orientation == null) {
      axios
        .get(
          "https://api.unsplash.com/search/photos?page=1&query=" +
            query +
            "&client_id=" +
            accessKey +
            "&page=" +
            page +
            "&color=" +
            color
        )
        .then(function (response) {
          // navigate to Descriptions screeen with the index and JSON data
          navigation.navigate("Description", {
            info: response,
            key: index,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // if orientation filtered
    if (color == null && orientation != null) {
      axios
        .get(
          "https://api.unsplash.com/search/photos?page=1&query=" +
            query +
            "&client_id=" +
            accessKey +
            "&page=" +
            page +
            "&orientation=" +
            orientation
        )
        .then(function (response) {
          // navigate to Descriptions screeen with the index and JSON data
          navigation.navigate("Description", {
            info: response,
            key: index,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // if color and orientation filtered
    if (color != null && orientation != null) {
      axios
        .get(
          "https://api.unsplash.com/search/photos?page=1&query=" +
            query +
            "&client_id=" +
            accessKey +
            "&page=" +
            page +
            "&color=" +
            color +
            "&orientation=" +
            orientation
        )
        .then(function (response) {
          // navigate to Descriptions screeen with the index and JSON data
          navigation.navigate("Description", {
            info: response,
            key: index,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  // return contains a FlatList which populates with data
  // DropDownPicker allows user to choose filters
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          paddingBottom: 0,
          paddingTop: 0,
          flexDirection: "row",
          paddingBottom: 20,
          zIndex: 1,
        }}
      >
        <DropDownPicker
          open={openColor}
          value={color}
          items={itemsColor}
          setOpen={setOpenColor}
          setValue={setColor}
          setItems={setItemsColor}
          placeholder="Color"
          listMode="SCROLLVIEW"
          theme="DARK"
          onSelectItem={(color) => onFilter(color, orientation)}
          containerStyle={{
            flex: 1,
          }}
          style={{
            flex: 1,
            width: "100%",
          }}
          zIndex={3000}
        />
        <DropDownPicker
          open={openOrientation}
          value={orientation}
          items={itemsOrientation}
          setOpen={setOpenOrientation}
          setValue={setOrientation}
          setItems={setItemsOrientation}
          placeholder="Orientation"
          listMode="FLATLIST"
          theme="DARK"
          onSelectItem={(orientation) => onFilter(color, orientation)}
          containerStyle={{
            flex: 1,
          }}
          style={{
            flex: 1,
            width: "100%",
          }}
          labelStyle={{ color: "white" }}
        />
      </View>
      <Text style={styles.text}>Image Results</Text>
      <FlatList
        contentContainerStyle={styles.container}
        data={thumbnails}
        extraData={thumbnails}
        onRefresh
        refreshing={true}
        refreshControl
        renderItem={({ item, index }) => (
          <Pressable style={styles.click} onPress={() => fetchData(index)}>
            <Image
              source={{ uri: item }} // the url for the thumbnail photo
              key={index} // key of thumbnails array
              style={{
                width: 300,
                height: 300,
              }}
            />
          </Pressable>
        )}
        onEndReached={() => {
          endScroll();
        }}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    fontWeight: "500",
    fontSize: 16,
    justifyContent: "flex-start",
    paddingTop: 20,
    paddingBottom: 20,
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
    padding: 10,
    margin: 15,
    height: 50,
    borderRadius: 25,
    width: "95%",
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
  },
  click: {
    paddingBottom: 30,
  },
});
