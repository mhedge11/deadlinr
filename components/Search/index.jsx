import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { searchForUser } from "../../api/user";

const Search = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const data = [
  //   { id: "1", title: "CS 180" },
  //   { id: "2", title: "CS 240" },
  //   { id: "3", title: "CS 250" },
  //   { id: "4", title: "CS 251" },
  //   { id: "5", title: "CS 252" },
  //   { id: "6", title: "CS 473" },
  //   { id: "7", title: "CS 354" },
  //   { id: "8", title: "CS 307" },
  //   { id: "9", title: "CS 407" },
  // ];

  const [search, setSearch] = useState("");

  const updateSearch = async () => {
    // setSearch(search);

    // Would sent to database at this point
    // data = await searchForUser(search);
    setData(await searchForUser(search));

    // console.log("data---" + data);
    console.log(data.items);

    // *************
    // data.items is search result
    // can console.log
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bar}>
        <SearchBar
          placeholder="Search here..."
          // onChangeText={updateSearch}
          onChangeText={(text) => setSearch(text.trim())}
          value={search}
          lightTheme
          round
          clearButtonMode="always"
        />
        <Button title="Search" onPress={updateSearch} />
      </View>
      <View
        style={{
          marginTop: 15,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 50, color: "black", fontWeight: "600" }}>
          Results
        </Text>
      </View>
      <FlatList
        data={data}
        // data.items
        // keyExtractor={(item) => item.id}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.textInput}>
              {/* <Text style={{ fontSize: 18 }}>{item.title}</Text> */}
              {/* <Text style={{ fontSize: 18 }}>{item.username}</Text> */}
              <Text style={{ fontSize: 18 }}>{item.username}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 5,
  },
  textInput: {
    marginTop: 10,
    padding: 20,
    alignItems: "center",
    backgroundColor: "grey",
    width: "100%",
  },
  bar: {
    marginTop: 10,
  },
});

export default Search;
