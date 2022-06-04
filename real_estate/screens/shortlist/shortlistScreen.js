import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { withNavigation } from "react-navigation";
import { SwipeListView } from "react-native-swipe-list-view";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkeletonContent from "react-native-skeleton-content";

var shortListData = [
  // {
  //     key: '1',
  //     properyImage: require('../../assets/images/house/house_1.jpg'),
  //     propertyName: 'Sky View House',
  //     propertyAddress: 'Opera Street, New York',
  //     propertyAmount: '360000',
  //     isFavourit: false,
  // },
  // {
  //     key: '2',
  //     properyImage: require('../../assets/images/house/house_2.jpg'),
  //     propertyName: 'Vraj House',
  //     propertyAddress: 'Yogi Street, New York',
  //     propertyAmount: '920000',
  //     isFavourit: false,
  // },
];

const { width } = Dimensions.get("screen");

class ShortlistScreen extends Component {
  constructor() {
    super();
    this.state = {
      userBookmarksData: [],
      loading: true,
    };
    this.getLoginData();
    shortListData = [];
  }

  // const [items, setItems] = useState([]);

  // componentDidMount() {
  // }

  getLoginData = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem("loginData");
      jsonValue = JSON.parse(jsonValue);
      this.setState({ loggedIn: jsonValue.loggedIn, userId: jsonValue.userId });
      console.log("after updating state inside getLoginData", this.state);
      this.getBookMarkedIds();
      return jsonValue != null ? jsonValue : null;
    } catch (e) {
      console.log("Error while reading async data:", e);
      this.setState({ loading: false });
    }
  };

  async getBookMarkedIds() {
    try {
      console.log("getBookmarkedIds");
      // this.getLoginData()
      // .then(
      // async (userLoginData) => {
      let userId = this.state.userId;
      console.log(this.state);
      // console.log(userId);
      // console.log("http://192.168.43.89:8063/api/get/bookmarks/" + userId);
      // const resp = await fetch("http://192.168.43.89:8063/api/get/bookmarks/" + userId)
      const resp = await fetch(
        "http://18.118.172.175:8372/api/get/bookmarks/" + userId
      );

      const json = await resp.json();
      // .then(res => res.json())
      // .then(json => this.getBookmarkedHouseDetails(json["result"]["bookmarks"]));
      console.log("json", json);
      if (json.result) {
        this.getBookmarkedHouseDetails(json.result.bookmarks);
      }
    } catch (error) {
      this.setState({ loading: false });
    }
    // })
  }

  async getBookmarkedHouseDetails(bookmarks) {
    console.log("getBookmarkedHOuseDeatials");
    for (let bookmark of bookmarks) {
      // console.log('http://54.205.76.109:5003/get/' + bookmark.house_id);
      const resp = await fetch(
        "http://18.118.172.175:8372/api/get/house/details/" + bookmark.house_id
      );
      const json = await resp.json();
      // console.log(json[0]);
      var data = {
        key: bookmark.house_id,
        properyImage: json.result.image_list[0],
        propertyName: json.result.location.community,
        propertyAddress: json.result.location.address,
        propertyAmount: json.result.price,
        isFavourit: true,
        image_list: json.result.image_list,
      };
      shortListData.push(data);
    }
    // console.log("shortListData" ,shortListData);
    this.setState({ userBookmarksData: shortListData, loading: false });
    // console.log( "state" ,this.state);
  }

  render() {
    console.log(
      "calling render********************************************************"
    );
    console.log("shortlistdata before render", shortListData);
    return (
      <View style={{ flex: 1 }}>
        {this.header()}
        <SkeletonContent
          containerStyle={{ flex: 1, width: "100%", borderRadius: 10 }}
          isLoading={this.state.loading}
          layout={[
            {
              width: 320,
              height: 220,
              elevation: 3,
              marginHorizontal: 20,
              marginTop: 20,
            },
            { width: 130, height: 30, marginLeft: 20, marginTop: 8 },
            {
              width: 190,
              height: 20,
              marginBottom: 15,
              marginLeft: 18,
              marginTop: 5,
            },
            {
              height: 30,
              width: 77,
              marginLeft: 250,
              marginTop: -58,
              marginBottom: 20,
            },

            { width: 320, height: 220, elevation: 3, marginHorizontal: 20 },
            { width: 160, height: 30, marginLeft: 20, marginTop: 8 },
            {
              width: 190,
              height: 20,
              marginBottom: 15,
              marginLeft: 20,
              marginTop: 5,
            },
            {
              height: 30,
              width: 77,
              marginLeft: 250,
              marginTop: -58,
              marginBottom: 20,
            },
          ]}
        >
          <ShortList />
        </SkeletonContent>
      </View>
    );
  }

  header() {
    return (
      <View style={styles.headerStyle}>
        <Text style={{ ...Fonts.primaryColor18Bold }}>Shortlisted</Text>
      </View>
    );
  }
}

const rowSwipeAnimatedValues = {};

// Array(shortListData.length + 1)
//     .fill('')
//     .forEach((_, i) => {
//         rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
//     });

const ShortList = () => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [listData, setListData] = useState(shortListData);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setShowSnackBar(true);
    setListData(newData);
  };

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    rowSwipeAnimatedValues[key].setValue(Math.abs(value));
  };

  const renderItem = (data) => (
    <TouchableHighlight
      style={{ backgroundColor: Colors.whiteColor }}
      activeOpacity={0.9}
    >
      <View style={styles.featuredPropertyContentStyle}>
        <Image
          source={{ uri: data.item.properyImage }}
          resizeMode="cover"
          style={styles.featuredPropertyImageStyle}
        />
        <View style={styles.featuredPropertyInfoContentStyle}>
          <View style={{ width: width / 1.9 }}>
            <Text style={{ ...Fonts.blackColor14SemiBold }}>
              {data.item.propertyName}
            </Text>
            <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
              {data.item.propertyAddress}
            </Text>
          </View>
          <View style={styles.featuredPropertyAmountContentStyle}>
            <Text style={{ ...Fonts.blackColor16SemiBold }}>
              $
              {data.item.propertyAmount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={{ alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        style={styles.backDeleteContinerStyle}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Animated.View
          style={[
            {
              transform: [
                {
                  scale: rowSwipeAnimatedValues[data.item.key].interpolate({
                    inputRange: [45, 90],
                    outputRange: [0, 1],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <MaterialIcons
            name="delete"
            size={24}
            color={Colors.whiteColor}
            style={{ alignSelf: "center" }}
          />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {listData.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MaterialIcons
            name="favorite-border"
            size={50}
            color={Colors.grayColor}
          />
          <Text
            style={{
              ...Fonts.grayColor18Bold,
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            No item in shortlist
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <SwipeListView
            data={listData}
            renderItem={renderItem}
            // renderHiddenItem={renderHiddenItem}
            // rightOpenValue={-100}
            // onSwipeValueChange={onSwipeValueChange}
            contentContainerStyle={{
              paddingTop: Sizes.fixPadding * 2.0,
              paddingBottom: Sizes.fixPadding * 8.0,
            }}
          />
        </View>
      )}
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
      >
        Removed from shortList
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 60.0,
    elevation: 5.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredPropertyContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
  },
  featuredPropertyImageStyle: {
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    width: "100%",
    height: 220.0,
  },
  featuredPropertyInfoContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  featuredPropertyAmountContentStyle: {
    borderWidth: 1.0,
    alignItems: "center",
    height: 30.0,
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(128, 128, 128, 0.5)",
  },
  snackBarStyle: {
    position: "absolute",
    bottom: 50.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
  },
  backDeleteContinerStyle: {
    alignItems: "center",
    bottom: 15,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 90,
    backgroundColor: "red",
    right: 0,
  },
});

export default withNavigation(ShortlistScreen);
