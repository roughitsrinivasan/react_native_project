import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Dimensions,
    BackHandler,
    Alert,
    SafeAreaView,
} from "react-native";
import { TapGestureHandler} from 'react-native-gesture-handler'

import { withNavigation } from "react-navigation";
import {
    MaterialIcons,
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Button, Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkeletonContent from "react-native-skeleton-content";
// import InfiniteScroll from 'react-native-infinite-scrolling';
import { PROD_NAME } from "@env";
// var featuredPropertyList = [];

const nearByPropertyList = [
    // {
    // id: '1',
    // properyImage: require('../../assets/images/house/house_1.jpg'),
    // propertyName: 'Sky View House',
    // propertyAddress: 'Yogi Street, New York',
    // propertyAmount: '360000',
    // isFavourit: false,
    // },
    // {
    // id: '2',
    // properyImage: require('../../assets/images/house/house_2.jpg'),
    // propertyName: 'Vraj House',
    // propertyAddress: 'Opera Street, New York',
    // propertyAmount: '920000',
    // isFavourit: false,
    // },
];

// console.log(featuredPropertyList);

var featuredPropertyList = [
    // {
    // id: '1',
    // properyImage: require('../../assets/images/house/house_1.jpg'),
    // propertyName: 'Sky View House',
    // propertyAddress: 'Opera Street, New York',
    // propertyAmount: '360000',
    // isFavourit: false,
    // },
    // {
    //     id: '2',
    // properyImage: require('../../assets/images/house/house_2.jpg'),
    // propertyName: 'Vraj House',
    // propertyAddress: 'Yogi Street, New York',
    // propertyAmount: '920000',
    // isFavourit: false,
    // }
];

// console.log(featuredPropertyList)

const { width } = Dimensions.get("screen");

class HomeScreen extends Component {
    state = {
        isBuy: true,
        nearbyProperyChangableList: nearByPropertyList,
        featuredPropertyChangableList: featuredPropertyList,
        showSnackBar: false,
        isInWishList: true,
    };

    constructor() {
        super();
        this.state = {
            data: [],
            loading: true,
        };
        this.state.featuredPropertyChangableList = featuredPropertyList;
    }

    getLoginData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("loginData");
            console.log(jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log("Error while reading async data:", e);
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.handleBackButton.bind(this)
        );
    }

    handleBackButton = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel",
            },
            { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    };

    componentDidMount() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButton.bind(this)
        );

        // fetch(`http://192.168.1.9:5003/`)    
        // fetch(`http://54.205.76.109:5003/`)
        fetch(`http://18.118.172.175:8372/api/get/hn/house/10`)
        // fetch(`http://192.168.1.91:8063/api/get/hn/house/10`)
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    data: json["result"]["result"],
                    loading: false,
                });
                this.getBookMarkedIds();
            });
            // console.log()
            
        }

    async getBookMarkedIds() {
        this.getLoginData().then(async (userLoginData) => {
            let userId = userLoginData.userId;
            console.log("UserId:[",userId,"]")

            const resp = await fetch(
                "http://18.118.172.175:8372/api/get/bookmarks/" + userId
            );
            const json = await resp.json();
            let houseData = this.state.data;
            let updatedHouseData = [];
            let temp;
            let x;
            if (json.result) {
                console.log("inside getBookMarkedIds");
                for (let house of houseData) {
                    temp = house;
                    x = json.result.bookmarks.map(
                        (h) => h.house_id == house.house_id
                    );
                    if (x.includes(true)) {
                        temp.isFavourit = true;
                    } else {
                        temp.isFavourit = false;
                    }
                    updatedHouseData.push(temp);
                }
                // console.log(updatedHouseData);
                this.setState({ data: updatedHouseData });
            }
        });
    }

    addBookmarkToDatabase({ house_id }) {
        console.log("addBookmarkToDatabase", house_id);

        this.getLoginData().then((userLoginData) => {
            let userId = userLoginData.userId;
            // use ip address of the machine running instead of localhost in dev
            // fetch('http://192.168.43.89:8063/api/bookmark/house', {
            fetch("http://18.118.172.175:8372/api/bookmark/house", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    user_id: userId,
                    house_id: house_id,
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("Showing response message coming from server");
                    console.log(responseJson);
                })
                .catch((error) => {
                    //display error message
                    console.log("error!!");
                    console.log(error);
                });
        });
        let updatedHouseData = [];
        for (let house of this.state.data) {
            if (house.house_id == house_id) {
                if (house.isFavourit) {
                    house.isFavourit = false;
                } else {
                    house.isFavourit = true;
                }
            }
            updatedHouseData.push(house);
        }
        this.setState({ data: updatedHouseData });
    }

    handleFeaturedPropertyUpdate({ item }) {
        console.log("item",item);
        var house_id = item.house_id;
        this.addBookmarkToDatabase({ house_id });

        // const newList = this.state.featuredPropertyChangableList.map((property) => {
        //     console.log(property);
        //     if (property.id === id) {
        //         const updatedItem = { ...property, isFavourit: !property.isFavourit };
        //         return updatedItem;
        //     }
        //     return property;
        // });
        // console.log(property.id)
        // this.setState({ featuredPropertyChangableList: newList })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {console.log(this.state.loading)}
                {this.header()}
                {/* {this.buyAndRentButton()} */}
                {this.topbar()}
                {/* {this.state.loading ? this.buyAndRentButton() : null} */}
                {/* {this.state.loading ? this.topbar() : null} */}
                {this.state.loading
                    ? this.title({ title: "Featured Properties" })
                    : null}
                <SkeletonContent
                    containerStyle={{
                        flex: 1,
                        width: "100%",
                        borderRadius: 10,
                    }}
                    isLoading={this.state.loading}
                    layout={[
                        {
                            width: width/1.1,
                            height: 220,
                            elevation: 3,
                            marginHorizontal: 20,
                        },
                        {
                            width: width/3.8,
                            height: 30,
                            marginLeft: 20,
                            marginTop: 8,
                        },
                        {
                            width: width/2.8,
                            height: 20,
                            marginBottom: 15,
                            marginLeft: 18,
                            marginTop: 5,
                        },
                        {
                            height: 30,
                            width: width/3.8,
                            marginLeft: 480,
                            marginTop: -58,
                            marginBottom: 20,
                        },

                        {
                            width: width/1.1,
                            height: 220,
                            elevation: 3,
                            marginHorizontal: 20,
                        },
                        {
                            width: width/3.8,
                            height: 30,
                            marginLeft: 20,
                            marginTop: 8,
                        },
                        {
                            width: width/2.8,
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
                    <FlatList
                        ListHeaderComponent={
                            <>
                                {/* {this.buyAndRentButton()}
                {this.topbar()} */}
                                {/* {this.title({ title: 'Nearby Properties' })} */}
                                {/* {this.nearbyProperties()} */}
                                {this.title({ title: "Featured Properties" })}
                            </>
                        }
                        data={this.state.data}
                        keyExtractor={(item) => `${item.house_id}`}
                        renderItem={this.renderItem}
                        contentContainerStyle={{
                            paddingBottom: Sizes.fixPadding * 8.0,
                        }}
                        showsVerticalScrollIndicator={false}
                    />
                    <Snackbar
                        style={styles.snackBarStyle}
                        visible={this.state.showSnackBar}
                        onDismiss={() => this.setState({ showSnackBar: false })}
                    >
                        {this.state.isInWishList
                            ? "Added to shortlist"
                            : "Removed from shortlist"}
                    </Snackbar>
                </SkeletonContent>
            </View>
        );
    }

    renderItem = ({ item }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
                this.props.navigation.navigate("Property", {
                    propertyId: item.house_id,
                    // properyImage: item.properyImage,
                    // propertyName: item.propertyName,
                    // propertyAddress: item.propertyAddress,
                    // propertyAmount: item.propertyAmount,
                })
            }
            style={styles.featuredPropertyContentStyle}
        >
            <Image
                source={{ uri: item.image_list[0] }}
                resizeMode="cover"
                style={styles.featuredPropertyImageStyle}
            />
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.handleFeaturedPropertyUpdate({ item });
                    this.setState({
                        isInWishList: item.isFavourit,
                        showSnackBar: true,
                    });
                }}
                style={styles.addToFavouriteContainerStyle}
            >
                <MaterialIcons
                    name={item.isFavourit ? "favorite" : "favorite-border"}
                    size={16}
                    color={Colors.redColor}
                />
            </TouchableOpacity>
            <View style={styles.featuredPropertyInfoContentStyle}>
                <View style={{ width: width / 1.9 }}>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {item.community}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{ ...Fonts.grayColor12Medium }}
                    >
                        {item.address}
                    </Text>
                </View>
                <View style={styles.featuredPropertyAmountContentStyle}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        {/* Converting price to comma separated format [ 100000 => 100,000 ] */}
                        {/* ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}
                        $
                        {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    handleNearByPropertyUpdate({ id }) {
        const newList = this.state.nearbyProperyChangableList.map(
            (property) => {
                if (property.id === id) {
                    const updatedItem = {
                        ...property,
                        isFavourit: !property.isFavourit,
                    };
                    return updatedItem;
                }
                console.log(id);
                return id;
            }
        );
        this.setState({ nearbyProperyChangableList: newList });
    }

    // nearbyProperties() {
    //     const renderItem = ({ item }) => (
    //         <TouchableOpacity
    //             activeOpacity={0.9}
    //             onPress={() => this.props.navigation.navigate('Property',
    //                 {
    //                     properyImage: item.properyImage,
    //                     propertyName: item.propertyName,
    //                     propertyAddress: item.propertyAddress,
    //                     propertyAmount: item.propertyAmount,
    //                 })}
    //             style={styles.nearByPropertContentStyle}>
    //             <Image source={item.properyImage}
    //                 resizeMode="cover"
    //                 style={styles.nearByPropertyImageStyle}
    //             />
    //             <TouchableOpacity
    //                 activeOpacity={0.9}
    //                 onPress={() => {
    //                     this.handleNearByPropertyUpdate({ id: item.id })
    //                     this.setState({ isInWishList: item.isFavourit, showSnackBar: true })
    //                 }}
    //                 style={styles.addToFavouriteContainerStyle}>
    //                 <MaterialIcons
    //                     name={item.isFavourit ? "favorite" : "favorite-border"}
    //                     size={16}
    //                     color={Colors.grayColor}
    //                 />
    //             </TouchableOpacity>
    //             <View style={{ marginHorizontal: Sizes.fixPadding }}>
    //                 <Text style={{ ...Fonts.blackColor14SemiBold, marginTop: Sizes.fixPadding }}>
    //                     {item.propertyName}
    //                 </Text>
    //                 <Text
    //                     numberOfLines={1}
    //                     style={{ ...Fonts.grayColor12Medium, marginVertical: Sizes.fixPadding - 5.0 }}
    //                 >
    //                     {item.propertyAddress}
    //                 </Text>
    //                 <Text style={{ ...Fonts.blackColor16SemiBold }}>
    //                     {item.propertyAmount}$
    //                 </Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    //     return (
    //         < FlatList
    //             horizontal
    //             data={this.state.nearbyProperyChangableList}
    //             keyExtractor={(item) => `${item.id}`}
    //             renderItem={renderItem}
    //             contentContainerStyle={{
    //                 paddingLeft: Sizes.fixPadding * 2.0,
    //                 paddingBottom: Sizes.fixPadding + 5.0
    //             }}
    //             showsHorizontalScrollIndicator={false}
    //         />
    //     )
    // }

    title({ title }) {
        return (
            <Text
                style={{
                    ...Fonts.blackColor18SemiBold,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding - 5.0,
                }}
            >
                {title}
            </Text>
        );
    }

    topbar() {
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1%",
                    paddingBottom: "2.5%",
                    backgroundColor: "whitesmoke",
                }}
            >
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                            alignItems: "center",
                            paddingTop: "6.5%",
                            textAlign: "center",
                        },
                    ]}
                >
                    <View style={{ flex: 3, alignItems: "center" }}>
                        <Feather
                            name="home"
                            size={30}
                            color={Colors.primaryColor}
                            onPress={() =>
                                this.props.navigation.navigate("Map")
                            }
                        />
                    </View>
                    <View style={{ flex: 4, alignItems: "center",marginStart:8 }}>
                    <MaterialCommunityIcons
                            name="clipboard-check-outline"
                            size={30}
                            color={Colors.primaryColor}
                            onPress={() =>
                                this.props.navigation.navigate("Recommendation")
                            }
                        />
                    </View>
                    <View style={{ flex: 3, alignItems: "center",marginStart:10 }}>
                        <FontAwesome
                            name="dollar"
                            size={30}
                            color={Colors.primaryColor}
                            onPress={() =>
                                this.props.navigation.navigate("Estimate")
                            }
                        />
                    </View>
                    <View style={{ flex: 3, alignItems: "center" }}>
                        <MaterialCommunityIcons
                            name="home-analytics"
                            size={30}
                            color={Colors.primaryColor}
                            onPress={() =>
                                this.props.navigation.navigate("Report")
                            }
                        />
                    </View>
                </View>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: "3%",
                            paddingBottom: "7.6%",
                            textAlign: "center",
                            marginBottom:"4%"
                            
                        },
                    ]}
                >
                    {/* Text  */}
                    <View style={{ flex: 5, alignItems: "center" }}>
                       <TapGestureHandler 
                         onBegan={() =>{ this.props.navigation.navigate("Map")}
                        }
                       >
                        <Text
                            style={{
                                ...Fonts.grayColor11Medium,
                                justifyContent: "center",
                                textAlign: "center",
                                paddingTop: "15.5%",
                            }}
                        >
                            Location
                        </Text>
                       </TapGestureHandler>
                    </View>
                    <View style={{ flex: 7, alignItems: "center" }}>
                       <TapGestureHandler  onBegan={() => { this.props.navigation.navigate("Recommendation")} }>
                       <Text
                            style={{
                                ...Fonts.grayColor11Medium,
                                justifyContent: "center",
                                textAlign: "center",
                                paddingTop: "14.5%",
                                
                            }}
                        >
                            Recommendation
                        </Text>
                       </TapGestureHandler>
                    </View>
                    
                    
                    <View
                        style={{
                            flex: 5,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingTop: "10.5%",
                            
                           
                        }}
                    >
                        <TapGestureHandler  onBegan={() =>
                                this.props.navigation.navigate("Estimate")
                            } >
                        <Text
                            style={{
                                ...Fonts.grayColor11Medium,
                                textAlign: "center",
                                justifyContent: "center",
                                marginTop:"6.5%",
                                marginBottom:"-6.4%",
                                paddingTop:"4.3%",
                                paddingEnd:"-7%",
                                marginLeft:"8%"

                            }}
                        > Home Valuation
                        </Text>
                        </TapGestureHandler>
                    </View>
                    <View style={{ flex: 5, alignItems: "center" }}>
                        <TapGestureHandler     onBegan={() =>
                                this.props.navigation.navigate("Report")
                            }>
                        <Text
                            style={{
                                ...Fonts.grayColor11Medium,
                                justifyContent: "center",
                                textAlign: "center",
                                paddingTop: "18%",
                                // marginTop:"7.5%"
                            }}
                        >
                            Report
                        </Text>
                        </TapGestureHandler>
                    </View>
                </View>
               <View>
               <Button onPress={()=>this.props.navigation.navigate("Personalize")}>
                    <Text style={{color:Colors.primaryColor}}>Personalization</Text>
                </Button>
               </View>
            </View>
        );
    }

    buyAndRentButton() {
        return (
            <View style={styles.buyAndRentButtonContainerStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this.setState({ isBuy: true });
                        this.props.navigation.navigate("Dummy");
                    }}
                    style={{
                        ...styles.buyAndRentButtonStyle,
                        backgroundColor: this.state.isBuy
                            ? Colors.primaryColor
                            : Colors.whiteColor,
                        borderColor: this.state.isBuy
                            ? null
                            : Colors.primaryColor,
                        borderWidth: this.state.isBuy ? 0.0 : 1.0,
                    }}
                >
                    <Text
                        style={
                            this.state.isBuy
                                ? { ...Fonts.whiteColor16Bold }
                                : { ...Fonts.primaryColor16Medium }
                        }
                    >
                        Buy
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ isBuy: false })}
                    style={{
                        ...styles.buyAndRentButtonStyle,
                        backgroundColor: this.state.isBuy
                            ? Colors.whiteColor
                            : Colors.primaryColor,
                        borderColor: this.state.isBuy
                            ? Colors.primaryColor
                            : null,
                        borderWidth: this.state.isBuy ? 1.0 : 0.0,
                    }}
                >
                    <Text
                        style={
                            this.state.isBuy
                                ? { ...Fonts.primaryColor16Medium }
                                : { ...Fonts.whiteColor16Bold }
                        }
                    >
                        Rent
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    header() {
        return (
            <View style={styles.headerStyle}>
                <View style={styles.headerContentStyle}>
                    <Text style={{ ...Fonts.primaryColor18Bold }}>
                        {PROD_NAME}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcons
                            name="search"
                            size={24}
                            color={Colors.primaryColor}
                            onPress={() =>
                                this.props.navigation.navigate("Search")
                            }
                        />
                        <MaterialIcons
                            name="notifications"
                            size={24}
                            color={Colors.primaryColor}
                            style={{ marginLeft: Sizes.fixPadding + 5.0 }}
                            onPress={() =>
                                this.props.navigation.navigate("Notification")
                            }
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 60.0,
        elevation: 5.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: "center",
    },
    headerContentStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buyAndRentButtonContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: Sizes.fixPadding * 2.0,
    },
    buyAndRentButtonStyle: {
        flex: 0.47,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 3.0,
        alignItems: "center",
        justifyContent: "center",
    },
    addToFavouriteContainerStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        position: "absolute",
        right: 10.0,
        top: 10.0,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        alignItems: "center",
        justifyContent: "center",
    },
    nearByPropertyImageStyle: {
        width: 160.0,
        height: 110.0,
        borderTopLeftRadius: Sizes.fixPadding + 5.0,
        borderTopRightRadius: Sizes.fixPadding + 5.0,
    },
    nearByPropertContentStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        width: 160.0,
        height: 203.0,
        borderRadius: Sizes.fixPadding + 5.0,
        marginRight: Sizes.fixPadding * 2.0,
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
    container: {
        flex: 1,
        padding: 10,
    },
});

export default withNavigation(HomeScreen);
