///Look  into skeleton while getting loaded

import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  BackHandler,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { withNavigation } from "react-navigation";
import { SwipeListView } from "react-native-swipe-list-view";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import SkeletonContent from "react-native-skeleton-content";

const { width } = Dimensions.get("screen");
/**
 * sample op
 "result": [
    {
      "city": "Oshawa", 
      "house_address": "48 Sandra St W", 
      "house_id": 1, 
      "image_list": [
        "https://d2qflgy6ivpolj.cloudfront.net/Housilon-images/house1-1.jpg", 
       ...
      ], 
      "price": 812115
    },  


 */

class Recommendations extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,

    };
  }

  state = {
    data: [],
  };



  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );

    // fetch(`http://192.168.1.91:8063/api/get/hn/house/10`)
    fetch(`https://housemarketsearch.org/recommend`)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json["result"])
        let response = json["result"];
        let res = [];
        response.map((data) => {
          const { city, house_address, house_id, image_list, price } = data;
          const res_data = {
            city: city,
            house_address: house_address,
            house_id: house_id,
            image: image_list[0],
            price: price,
          };
          res.push(res_data);
        });
        // console.log(res)
        this.setState({ data: res, loading: false });
      });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  handleBackButton = () => {
    this.props.navigation.pop();
    return true;
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1, paddingTop: 0, paddingBottom: 20 }}>
          {this.header()}
          <SkeletonContent
            containerStyle={{
              flex: 1,
              width: "100%",
              borderRadius: 22,
            }}
            isLoading={this.state.loading}
            layout={[
              {
                width: width/1.1,
                height: 75,
                elevation: 3,
                marginHorizontal: 20,
                marginTop: 15,
              },
              {
                width: width/1.1,
                height: 75,
                elevation: 3,
                marginHorizontal: 20,
                marginTop: 20,
              },
              {
                width: width/1.1,
                height: 75,
                elevation: 3,
                marginHorizontal: 20,
                marginTop: 20,
              },
              {
                width: width/1.1,
                height: 75,
                elevation: 3,
                marginHorizontal: 20,
                marginTop: 20,
              },
              {
                width: width/1.1,
                height: 75,
                elevation: 3,
                marginHorizontal: 20,
                marginTop: 20,
              },
              {
                width: width/1.1,
                height: 75,
                elevation: 3,
                marginHorizontal: 20,
                marginTop: 20,
              },
              {
                width: width/1.1,
                height: 75,
                elevation: 3,
                marginHorizontal: 20,
                marginTop: 20,
              },
              {
                width: width/1.1,
                height: 75,
                elevation: 3,
                marginHorizontal: 20,
                marginTop: 20,
              },
            ]}
          >
            <Recommendation
              navigation={this.props.navigation}
              data={this.state.data}
            />
          </SkeletonContent>
        </View>
      </SafeAreaView>
    );
  }

  header() {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.headerTextStyle}> Houses Near your Locality</Text>
      </View>
    );
  }
}

const RenderItem = ({ item, navigation }) => {
  console.log("[Render Item]", item);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("Property", {
          propertyId: item.house_id,
        })
      }
      style={{ paddingTop: 4 }}
    >
      <View style={styles.featuredPropertyContentStyle}>
        <Image
          source={{ uri: item.image }}
          style={[styles.featuredPropertyImageStyle, { width: 53, height: 55 }]}
        />

        <>
          <View style={styles.featuredPropertyInfoContentStyle}>
            <View style={{ width: width / 1.9 }}>
              <Text style={{ ...Fonts.blackColor14SemiBold }}>{item.city}</Text>
              <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
                {item.house_address}
              </Text>
            </View>
            <View style={styles.featuredPropertyAmountContentStyle}>
              <Text
                style={{
                  ...Fonts.blackColor16SemiBold,
                  fontSize: 15,
                  padding: 7,
                }}
              >
                ${item.price}
              </Text>
            </View>
          </View>
        </>
      </View>
    </TouchableOpacity>
  );
};

const Recommendation = ({ navigation, data }) => {
  return (
    <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
      {
        <ScrollView style={{ marginTop: 10, marginBottom: 10, paddingTop: 5 }}>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            {data.map((item, idx) => (
              <RenderItem key={idx} item={item} navigation={navigation} />
            ))}
          </View>
             
        </ScrollView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 60.0,
    elevation: 2.0,
    backgroundColor: Colors.whiteColor,
    justifyContent: "center",
  },
  featuredPropertyContentStyle: {
    marginHorizontal: Sizes.fixPadding,
    elevation: 3.8,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
    flexDirection: "row",
    padding: 8,
  },
  featuredPropertyImageStyle: {
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
    width: "100%",
    height: 220.0,
    marginLeft: 5,
    marginTop: 5,
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
    minWidth: 18,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding - 10,
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
  headerTextStyle: {
    color: Colors.blackColor,
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: "500",
    color: Colors.primaryColor,
    textAlign:"center"
    
  },
});


export default withNavigation(Recommendations);
