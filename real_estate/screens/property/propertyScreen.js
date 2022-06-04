import React, { Component, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Image,
    BackHandler,
    TextInput,
    Slider,
} from "react-native";
import { withNavigation } from "react-navigation";
import CollapsingToolbar from "../../component/sliverAppBarScreen";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";
import GoogleMap from "../../component/googleMapScreen";
import { Snackbar } from "react-native-paper";
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from "accordion-collapse-react-native";
import { SharedElement } from "react-navigation-shared-element";
import { Dimensions } from "react-native";
import { VictoryPie } from "victory-native";

const nearestPlacesList = [
    {
        id: "1",
        place: "RailwayStation",
        isExpandable: false,
        more: [
            {
                id: "1",
                name: "Santa Cruise Railway Station",
                time: "8 min | 2.5 km",
            },
            {
                id: "2",
                name: "Manhattan Railway Station",
                time: "14 min | 4.0 km",
            },
        ],
    },
];

const propertyPhotosList = [
    // {
    //     id: '1',
    //     photo: require('../../assets/images/bedroom-1.jpg')
    // },
    // {
    //     id: '2',
    //     photo: require('../../assets/images/bedroom-2.jpg')
    // },
    // {
    //     id: '3',
    //     photo: require('../../assets/images/kitchen.jpg')
    // },
    // {
    //     id: '4',
    //     photo: require('../../assets/images/bathroom-1.png')
    // },
    // {
    //     id: '5',
    //     photo: require('../../assets/images/bathroom-2.jpg')
    // },
    // {
    //     id: '6',
    //     photo: require('../../assets/images/parking.jpg')
    // },
];

const projectAminitiesList = [
    {
        id: "1",
        aminities: "Garden",
    },
    {
        id: "2",
        aminities: "Jogging Track",
    },
    {
        id: "3",
        aminities: "Power Backup",
    },
    {
        id: "4",
        aminities: "Complete RCC Structure",
    },
    {
        id: "5",
        aminities: "Design Door Frames",
    },
    {
        id: "6",
        aminities: "PVC Concealed wiring",
    },
];

class PropertyScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            value: "",
            homePrice: "",
            downpayment: "",
            downpaymentPercent: "20",
            term: "5",
            rate: "2.5",
            sliderValue: "",
            data1: "",
            mortgage: 0,
        };

        this.state.nearestPlacesChangableList = nearestPlacesList;
    }

    componentDidMount() {
        console.log("componentDidMount");
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButton.bind(this)
        );
        const object = this.propertyId;
        // fetch(`http://192.168.1.9:5003/get/`+ object)
        fetch(`http://18.118.172.175:8372/api/get/house/details/` + object)
            // fetch(`http://192.168.1.91:8063/api/get/house/details/`+ object)
            .then((res) => res.json())
            .then((json) => {
                var jsonData = [];
                jsonData.push(json.result);
                console.log("Api result",json)
                // console.log("jsonData[0].price * 0.2",parseInt(jsonData[0].price * 0.2))
                this.setState({
                    data: jsonData,
                    homePrice: jsonData[0].price,
                    downpayment: parseInt(jsonData[0].price * 0.2),
                    propertyTax: 600,
                    maintenanceCost: jsonData[0].maintenance_cost,
                    rentalIncome: jsonData[0].rental_income,
                });
            })
            .then(() => this.calculateMortage());
        console.log("property screen constructor", object);
       
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

    state = {
        expanded: false,
        nearestPlacesChangableList: nearestPlacesList,
        showSnackBar: false,
        isInWishList: false,
    };

    propertyId = this.props.navigation.getParam("propertyId");
    // propertyAmount = this.props.navigation.getParam('propertyAmount');
    _keyExtractor = (item, index) => {
        return this.props.index+"_"+index+'_'+item.id+"_"+moment().valueOf().toString(); 
        }
    render() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                // listKey={this._keyExtractor}


                renderItem={this.renderItem}
            />
        );
    }



    calculateMortage = () => {
        console.log("calculateMortage");
        var x =
            parseInt(this.state.homePrice) - parseInt(this.state.downpayment);
        var n = parseInt(this.state.term);
        var i = parseInt(this.state.rate) / 1200;
        var year = n * 12;
        var m = (x * (i * Math.pow(1 + i, year))) / (Math.pow(1 + i, year) - 1);
        var mortgageValue = Math.round(m);
        this.setState({ mortgage: mortgageValue });
        return mortgageValue;
    };

    handlePriceChange(price) {
        var homePrice = parseInt(price);
        var downpaymentPercent = parseInt(this.state.downpaymentPercent);

        downpaymentPercent = downpaymentPercent ? downpaymentPercent : 1;

        var downpayment = parseInt((homePrice * downpaymentPercent) / 100);

        // Mortage Calculations
        var x = homePrice - downpayment;
        var n = parseInt(this.state.term);
        var i = parseInt(this.state.rate) / 1200;
        var year = n * 12;
        var m = (x * (i * Math.pow(1 + i, year))) / (Math.pow(1 + i, year) - 1);
        var mortgageValue = Math.round(m);
        // this.setState({ mortgage: mortgageValue });
        this.setState({
            homePrice: homePrice,
            downpayment: downpayment,
            mortgage: mortgageValue,
        });
    }

    handleDownpaymentChange(downpayment) {
        var downpayment = parseInt(downpayment);
        var homePrice = parseInt(this.state.homePrice);
        var downpaymentPercent = parseInt((downpayment / homePrice) * 100);

        downpaymentPercent = downpaymentPercent ? downpaymentPercent : 1;

        console.log(
            "downpayment && downpaymentPercent",
            downpayment,
            downpaymentPercent,
            homePrice
        );

        // this.setState({
        //     downpayment: downpayment,
        //     downpaymentPercent: downpaymentPercent,
        // });

        // Mortage Calculations
        var x = homePrice - downpayment;
        console.log("x", x);
        var n = parseInt(this.state.term);
        console.log("n", n);
        var i = parseInt(this.state.rate) / 1200;
        console.log("i", i);
        var year = n * 12;
        var m = (x * (i * Math.pow(1 + i, year))) / (Math.pow(1 + i, year) - 1);
        var mortgageValue = Math.round(m);
        // this.setState({ mortgage: mortgageValue });
        this.setState({
            downpaymentPercent: downpaymentPercent,
            downpayment: downpayment,
            mortgage: mortgageValue,
        });
        // this.calculateMortage();
    }

    handleDownpaymentPercentChange(downpaymentPercent) {
        var homePrice = parseInt(this.state.homePrice);
        var downpaymentPercent = parseInt(downpaymentPercent);
        var downpayment = parseInt((homePrice * downpaymentPercent) / 100);

        // Mortage Calculations
        var x = homePrice - downpayment;
        console.log("x", x);
        var n = parseInt(this.state.term);
        console.log("n", n);
        var i = parseInt(this.state.rate) / 1200;
        console.log("i", i);
        var year = n * 12;
        var m = (x * (i * Math.pow(1 + i, year))) / (Math.pow(1 + i, year) - 1);
        var mortgageValue = Math.round(m);
        // this.setState({ mortgage: mortgageValue });
        this.setState({
            downpaymentPercent: downpaymentPercent,
            downpayment: downpayment,
            mortgage: mortgageValue,
        });
    }

    handleSliderChange = (changedValue) => {
        var x =
            parseInt(this.state.homePrice) - parseInt(this.state.downpayment);
        var n = parseInt(this.state.term);
        var i = parseInt(this.state.rate) / 1200;
        var year = n * 12;
        var m = (x * (i * Math.pow(1 + i, year))) / (Math.pow(1 + i, year) - 1);
        this.setState({
            downpayment: changedValue,
            downpaymentPercent: parseInt(
                (changedValue / this.state.homePrice) * 100
            ),
            mortgage: Math.round(m),
        });
    };

    renderItem = ({ item }) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <CollapsingToolbar
                leftItem={
                    <MaterialIcons
                        name="arrow-back"
                        size={24}
                        color={Colors.whiteColor}
                        onPress={() => this.props.navigation.goBack()}
                    />
                }
                rightItem={
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>
                            this.setState({
                                showSnackBar: true,
                                isInWishList: !this.state.isInWishList,
                            })
                        }
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MaterialIcons
                            name={
                                this.state.isInWishList
                                    ? "favorite"
                                    : "favorite-border"
                            }
                            size={24}
                            color={Colors.whiteColor}
                        />
                        <MaterialIcons
                            name="share"
                            size={24}
                            color={Colors.whiteColor}
                            style={{ marginLeft: Sizes.fixPadding }}
                        />
                    </TouchableOpacity>
                }
                borderBottomRadius={20}
                toolbarColor={Colors.primaryColor}
                toolBarMinHeight={40}
                toolbarMaxHeight={358}
                src={{ uri: item.image_list[0] }}
            >
                <View style={{ paddingBottom: Sizes.fixPadding * 8.0 }}>
                    {this.propertyInfo()}
                    {this.title({ title: "Description" })}
                    {this.dummyText()}
                    {this.title({ title: "Photos" })}
                    {this.photos1()}
                    {this.photos2()}
                    {this.photos3()}
                    {this.photos4()}
                    {this.photos5()}
                    {this.photos6()}
                    {this.photos7()}
                    {this.photos8()}
                    {this.aminities()}
                    {this.title({ title: "Key Facts" })}
                    {this.keyfacts()}
                    {this.title({ title: "Details" })}
                    {this.details()}
                    {this.title({ title: "Rooms" })}
                    {this.rooms()}
                    {this.nearestPlaces()}
                    {this.title({ title: "Mortgage" })}
                    {this.mortgage()}
                    {this.title({ title: "Cash Flow Analysis" })}
                    {this.cashflow()}
                </View>
            </CollapsingToolbar>

            <Snackbar
                style={styles.snackBarStyle}
                visible={this.state.showSnackBar}
                onDismiss={() => this.setState({ showSnackBar: false })}
            >
                {this.state.isInWishList
                    ? "Added to shortlist"
                    : "Removed from shortlist"}
            </Snackbar>
        </SafeAreaView>
    );

    // contactOwnerInfo() {
    //     return (
    //         <View style={styles.ownerInfoContentStyle}>
    //             <View style={{
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between',
    //                 alignItems: 'center'
    //             }}>
    //                 <View style={{
    //                     flexDirection: 'row', alignItems: 'center',
    //                 }}>
    //                     <Image
    //                         source={require('../../assets/images/user/user_7.jpg')}
    //                         style={{ width: 50.0, height: 50.0, borderRadius: 25.0 }}
    //                     />
    //                     <View style={{ marginLeft: Sizes.fixPadding }}>
    //                         <Text style={{ ...Fonts.blackColor16Bold }}>
    //                             John Smith
    //                         </Text>
    //                         <Text style={{ ...Fonts.grayColor14Medium }}>
    //                             Owner
    //                         </Text>
    //                     </View>
    //                 </View>
    //                 <TouchableOpacity
    //                     activeOpacity={0.9}
    //                     onPress={() => this.props.navigation.navigate('Message', { name: 'John Smith' })}
    //                     style={styles.ownerContactContentStyle}>
    //                     <Text style={{ ...Fonts.whiteColor14SemiBold }}>
    //                         Contact
    //                     </Text>
    //                 </TouchableOpacity>
    //             </View>

    //         </View>
    //     )
    // }

    handleNearestPlacesUpdate({ id, isExpanded }) {
        year;
        const newList = this.state.nearestPlacesChangableList.map(
            (property) => {
                if (property.id === id) {
                    const updatedItem = {
                        ...property,
                        isExpandable: isExpanded,
                    };
                    return updatedItem;
                }
                return property;
            }
        );
        this.setState({ nearestPlacesChangableList: newList });
    }

    nearestPlaces() {
        return (
            <View>
                {this.title({ title: "School" })}
                <View>
                    {this.state.nearestPlacesChangableList.map((item) => (
                        <View
                            key={item.id}
                            style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}
                        >
                            <Collapse
                                onToggle={(isExpanded) =>
                                    this.handleNearestPlacesUpdate({
                                        id: item.id,
                                        isExpanded,
                                    })
                                }
                            >
                                <CollapseHeader>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginVertical:
                                                Sizes.fixPadding - 8.0,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                ...Fonts.blackColor14Bold,
                                            }}
                                        >
                                            St. Christopher Catholic School(
                                            {item.more.length})
                                        </Text>
                                        <MaterialIcons
                                            name={
                                                item.isExpandable
                                                    ? "keyboard-arrow-up"
                                                    : "keyboard-arrow-down"
                                            }
                                            size={24}
                                            color={Colors.primaryColor}
                                        />
                                    </View>
                                </CollapseHeader>
                                <CollapseBody>
                                    <View
                                        style={{
                                            marginVertical:
                                                Sizes.fixPadding - 5.0,
                                        }}
                                    >
                                        {item.more.map((item) => (
                                            <View
                                                key={item.id}
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-between",
                                                    marginVertical:
                                                        Sizes.fixPadding - 7.0,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        ...Fonts.grayColor12Medium,
                                                    }}
                                                >
                                                    Address
                                                </Text>
                                                <Text
                                                    styyearle={{
                                                        ...Fonts.grayColor12Medium,
                                                    }}
                                                >
                                                    155 RED MAPLE RD, Richmond
                                                    Hill, Ontario
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </CollapseBody>
                            </Collapse>
                        </View>
                    ))}
                </View>
            </View>
        );
    }

    mapInfo() {
        return (
            <View style={styles.mapStyle}>
                <GoogleMap
                    latitude={37.33233141}
                    longitude={-122.0312186}
                    height={150}
                    pinColor={Colors.primaryColor}
                />
            </View>
        );
    }

    photos1() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ overflow: "hidden" }}
                onPress={() =>
                    this.props.navigation.navigate("ImageFullView", {
                        image: item.image_list[1],
                        id: item.house_id,
                    })
                }
            >
                <SharedElement id={item.house_id}>
                    <Image
                        source={{ uri: item.image_list[1] }}
                        style={styles.propertyPhotosStyle}
                        resizeMode="cover"
                    />
                </SharedElement>
            </TouchableOpacity>
        );
        return (
            <FlatList
                // horizontal
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
               
                // showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingLeft: Sizes.fixPadding * 2.0,
                //     paddingTop: Sizes.fixPadding - 5.0
                // }}
            />
        );
    }

    photos2() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ overflow: "hidden" }}
                onPress={() =>
                    this.props.navigation.navigate("ImageFullView", {
                        image: item.image_list[2],
                        id: item.house_id,
                    })
                }
            >
                <SharedElement id={item.house_id}>
                    <Image
                        source={{ uri: item.image_list[2] }}
                        style={styles.propertyPhotosStyle}
                        resizeMode="cover"
                    />
                </SharedElement>
            </TouchableOpacity>
        );
        return (
            <FlatList
                // horizontal
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
                // showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingLeft: Sizes.fixPadding * 2.0,
                //     paddingTop: Sizes.fixPadding - 5.0
                // }}
            />
        );
    }

    photos3() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ overflow: "hidden" }}
                onPress={() =>
                    this.props.navigation.navigate("ImageFullView", {
                        image: item.image_list[3],
                        id: item.house_id,
                    })
                }
            >
                <SharedElement id={item.house_id}>
                    <Image
                        source={{ uri: item.image_list[3] }}
                        style={styles.propertyPhotosStyle}
                        resizeMode="cover"
                    />
                </SharedElement>
            </TouchableOpacity>
        );
        return (
            <FlatList
                // horizontal
                data={this.state.data}
                keyExtractor={(item) => `$300000{item.house_id}`}
                renderItem={renderItem}
                // showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingLeft: Sizes.fixPadding * 2.0,
                //     paddingTop: Sizes.fixPadding - 5.0
                // }}
            />
        );
    }

    photos4() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ overflow: "hidden" }}
                onPress={() =>
                    this.props.navigation.navigate("ImageFullView", {
                        image: item.image_list[4],
                        id: item.house_id,
                    })
                }
            >
                <SharedElement id={item.house_id}>
                    <Image
                        source={{ uri: item.image_list[4] }}
                        style={styles.propertyPhotosStyle}
                        resizeMode="cover"
                    />
                </SharedElement>
            </TouchableOpacity>
        );
        return (
            <FlatList
                // horizontal
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
                // showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingLeft: Sizes.fixPadding * 2.0,
                //     paddingTop: Sizes.fixPadding - 5.0
                // }}
            />
        );
    }

    photos5() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ overflow: "hidden" }}
                onPress={() =>
                    this.props.navigation.navigate("ImageFullView", {
                        image: item.image_list[5],
                        id: item.house_id,
                    })
                }
            >
                <SharedElement id={item.house_id}>
                    <Image
                        source={{ uri: item.image_list[5] }}
                        style={styles.propertyPhotosStyle}
                        resizeMode="cover"
                    />
                </SharedElement>
            </TouchableOpacity>
        );
        return (
            <FlatList
                // horizontal
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
                // showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingLeft: Sizes.fixPadding * 2.0,
                //     paddingTop: Sizes.fixPadding - 5.0
                // }}
            />
        );
    }

    photos6() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ overflow: "hidden" }}
                onPress={() =>
                    this.props.navigation.navigate("ImageFullView", {
                        image: item.image_list[6],
                        id: item.house_id,
                    })
                }
            >
                <SharedElement id={item.house_id}>
                    <Image
                        source={{ uri: item.image_list[6] }}
                        style={styles.propertyPhotosStyle}
                        resizeMode="cover"
                    />
                </SharedElement>
            </TouchableOpacity>
        );
        return (
            <FlatList
                // horizontal
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
                // showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingLeft: Sizes.fixPadding * 2.0,
                //     paddingTop: Sizes.fixPadding - 5.0
                // }}
            />
        );
    }

    photos7() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ overflow: "hidden" }}
                onPress={() =>
                    this.props.navigation.navigate("ImageFullView", {
                        image: item.image_list[7],
                        id: item.house_id,
                    })
                }
            >
                <SharedElement id={item.house_id}>
                    <Image
                        source={{ uri: item.image_list[7] }}
                        style={styles.propertyPhotosStyle}
                        resizeMode="cover"
                    />
                </SharedElement>
            </TouchableOpacity>
        );
        return (
            <FlatList
                // horizontal
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
                // showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingLeft: Sizes.fixPadding * 2.0,
                //     paddingTop: Sizes.fixPadding - 5.0
                // }}
            />
        );
    }

    photos8() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ overflow: "hidden" }}
                onPress={() =>
                    this.props.navigation.navigate("ImageFullView", {
                        image: item.image_list[8],
                        id: item.house_id,
                    })
                }
            >
                <SharedElement id={item.house_id}>
                    <Image
                        source={{ uri: item.image_list[8] }}
                        style={styles.propertyPhotosStyle}
                        resizeMode="cover"
                    />
                </SharedElement>
            </TouchableOpacity>
        );
        return (
            <FlatList
                // horizontal
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
                // showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{
                //     paddingLeft: Sizes.fixPadding * 2.0,
                //     paddingTop: Sizes.fixPadding - 5.0
                // }}
            />
        );
    }

    dummyText() {
        const renderItem = ({ item }) => (
            <Text
                style={{
                    ...Fonts.blackColor12Regular,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    textAlign: "justify",
                    marginTop: "5%",
                }}
            >
                {item.description}
            </Text>
        );
       
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
            />
            
        );
    }

    title({ title }) {
        return (
            <Text
                style={{
                    ...Fonts.blackColor18Bold,
                    // marginHorizontal: Sizes.fixPadding * 2.0,
                    marginTop: Sizes.fixPadding,
                    backgroundColor: "whitesmoke",
                    paddingTop: "2%",
                    paddingBottom: "2%",
                    paddingLeft: "5%",
                }}
            >
                {title}
            </Text>
        );
    }

    aminities() {
        return (
            <View
                style={{
                    marginTop: Sizes.fixPadding - 8.0,
                    paddingBottom: Sizes.fixPadding - 5.0,
                }}
            >
                {
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item) => `${item.house_id}`}
                        renderItem={({ item }) => (
                            <View key={item.id}>
                                <Text
                                    style={{
                                        ...Fonts.blackColor18Bold,
                                        marginHorizontal:
                                            Sizes.fixPadding * 2.0,
                                        marginTop: Sizes.fixPadding,
                                        marginTop: "-37%",
                                    }}
                                >
                                    Property Amenities{"\n"}
                                </Text>
                                <View style={styles.aminitiesContentStyle}>
                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor16Medium,
                                            marginLeft: 2.0,
                                            marginTop: 1.5,
                                        }}
                                    >
                                        Bathroom : {item.bathroom}
                                    </Text>
                                </View>
                                <View style={styles.aminitiesContentStyle}>
                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor16Medium,
                                            marginLeft: 2.0,
                                            marginTop: 1.5,
                                        }}
                                    >
                                        Bedroom : {item.bedroom}
                                    </Text>
                                </View>
                                <View style={styles.aminitiesContentStyle}>
                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor16Medium,
                                            marginLeft: 2.0,
                                            marginTop: 1.5,
                                        }}
                                    >
                                        Rooms : {item.rooms}
                                    </Text>
                                </View>
                                <View style={styles.aminitiesContentStyle}>
                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor16Medium,
                                            marginLeft: 2.0,
                                            marginTop: 1.5,
                                        }}
                                    >
                                        Cooling : {item.cooling}
                                    </Text>
                                </View>
                                <View style={styles.aminitiesContentStyle}>
                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor16Medium,
                                            marginLeft: 2.0,
                                            marginTop: 1.5,
                                        }}
                                    >
                                        Electricity : {item.electricity}
                                    </Text>
                                </View>
                                <View style={styles.aminitiesContentStyle}>
                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor16Medium,
                                            marginLeft: 2.0,
                                            marginTop: 1.5,
                                        }}
                                    >
                                        Gas : {item.gas}
                                    </Text>
                                </View>
                                <View style={styles.aminitiesContentStyle}>
                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor16Medium,
                                            marginLeft: 2.0,
                                            marginTop: 1.5,
                                        }}
                                    >
                                        Heating fuel : {item.heating_fuel}
                                    </Text>
                                </View>
                                <View style={styles.aminitiesContentStyle}>
                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color={Colors.primaryColor}
                                    />
                                    <Text
                                        style={{
                                            ...Fonts.blackColor16Medium,
                                            marginLeft: 2.0,
                                            marginTop: 1.5,
                                        }}
                                    >
                                        Heating type : {item.heating_type}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                }
            </View>
        );
    }

    cashflow() {
        const renderItem = ({ item }) => (
            <View>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 5 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor16SemiBold,
                                marginLeft: 2.0,
                                marginTop: 15,
                                textAlign: "left",
                            }}
                        >
                            Mortgage Payment{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.blueColor18SemiBold,
                                marginTop: 15,
                                textAlign: "right",
                            }}
                        >
                            {this.state.mortgage
                                ? "$" +
                                  this.state.mortgage
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                : ""}
                            {"\n"}
                        </Text>
                    </View>
                </View>

                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 5 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor16SemiBold,
                                marginLeft: 2.0,
                                textAlign: "left",
                                marginTop: -25,
                            }}
                        >
                            Monthly Payment{"\n"}
                        </Text>
                    </View>

                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.blueColor18SemiBold,
                                textAlign: "right",
                                marginTop: -25,
                            }}
                        >
                            $7,916 {"\n"}
                        </Text>
                    </View>
                </View>

                {/* <View style={[styles.container, {
                flexDirection: "row",
            }]}>
                
                <View style={{ flex: 5}}>
                    <Text style={{ ...Fonts.blackColor16SemiBold, marginLeft: 2.0, textAlign: 'left', marginTop: -25 }}>
                            Break Even Down Payment{'\n'} 
                            
                    </Text>
                </View>
                
                <View style={{ flex: 3 }}>
                <Text style={{ ...Fonts.redColor18SemiBold, textAlign: 'right', marginTop: -25 }}>
                            61% {'\n'}
                    </Text>
                    
                </View>
                    
                </View> */}

                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                            marginTop: -25,
                        },
                    ]}
                >
                    <View style={{ flex: 5 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                textAlign: "left",
                            }}
                        >
                            Property Tax (Monthly){"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 3, marginTop: -25 }}>
                        <View style={styles.searchFieldStyle}>
                            <FontAwesome
                                name="dollar"
                                size={18}
                                color={
                                    this.state.isSearch
                                        ? Colors.primaryColor
                                        : Colors.grayColor
                                }
                            />
                            <TextInput
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    ...Fonts.grayColor14Medium,
                                    marginLeft: Sizes.fixPadding,
                                    paddingTop: 2.0,
                                }}
                                //   placeholder={item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                defaultValue={this.state.propertyTax
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                selectionColor={Colors.primaryColor}
                                onFocus={() =>
                                    this.setState({ isSearch: true })
                                }
                                onBlur={() =>
                                    this.setState({ isSearch: false })
                                }
                                onChangeText={(text) => {
                                    this.setState({ propertyTax: text });
                                    // this.calculateMortage();
                                }}
                                // value={this.state.value}
                            />
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                            marginTop: -40,
                        },
                    ]}
                >
                    <View style={{ flex: 5 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                textAlign: "left",
                            }}
                        >
                            Maintenance Cost{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 3, marginTop: -25 }}>
                        <View style={styles.searchFieldStyle}>
                            <FontAwesome
                                name="dollar"
                                size={18}
                                color={
                                    this.state.isSearch
                                        ? Colors.primaryColor
                                        : Colors.grayColor
                                }
                            />
                            <TextInput
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    ...Fonts.grayColor14Medium,
                                    marginLeft: Sizes.fixPadding,
                                    paddingTop: 2.0,
                                }}
                                //   placeholder={item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                defaultValue={this.state.maintenanceCost
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                selectionColor={Colors.primaryColor}
                                onFocus={() =>
                                    this.setState({ isSearch: true })
                                }
                                onBlur={() =>
                                    this.setState({ isSearch: false })
                                }
                                onChangeText={(text) => {
                                    this.setState({ maintenanceCost: text });
                                }}
                                // value={this.state.value}
                            />
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                            marginTop: -40,
                        },
                    ]}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                textAlign: "left",
                            }}
                        >
                            Rental Income{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 3 }}></View>
                    <View style={{ flex: 3, marginTop: -25 }}>
                        <View style={styles.searchFieldStyle}>
                            <FontAwesome
                                name="dollar"
                                size={18}
                                color={
                                    this.state.isSearch
                                        ? Colors.primaryColor
                                        : Colors.grayColor
                                }
                            />
                            <TextInput
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    ...Fonts.grayColor14Medium,
                                    marginLeft: Sizes.fixPadding,
                                    paddingTop: 2.0,
                                }}
                                //   placeholder={item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                defaultValue={this.state.rentalIncome
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                selectionColor={Colors.primaryColor}
                                onFocus={() =>
                                    this.setState({ isSearch: true })
                                }
                                onBlur={() =>
                                    this.setState({ isSearch: false })
                                }
                                onChangeText={(text) => {
                                    this.setState({ rentalIncome: text });
                                }}
                                // value={this.state.value}
                            />
                        </View>
                    </View>
                </View>

                <VictoryPie
                    colorScale={["red", "green"]}
                    innerRadius={110}
                    data={[
                        {
                            x: "",
                            y:
                                parseInt(this.state.propertyTax) +
                                parseInt(this.state.maintenanceCost) +
                                parseInt(this.state.mortgage),
                        },
                        { x: "", y: parseInt(this.state.rentalIncome) },
                    ]}
                />

                <View style={{ marginTop: "-70%" }}>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "center",
                        }}
                    >
                        Cash Flow
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor18SemiBold,
                            marginTop: 1.5,
                            textAlign: "center",
                        }}
                    >
                        {parseInt(this.state.rentalIncome) -
                            (
                                parseInt(this.state.propertyTax) +
                                parseInt(this.state.maintenanceCost) +
                                parseInt(this.state.mortgage)
                            )
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            textAlign: "center",
                        }}
                    >
                        Monthly Payment
                    </Text>
                    <Text
                        style={{
                            ...Fonts.redColor18SemiBold,
                            marginTop: 1.5,
                            textAlign: "center",
                        }}
                    >
                        $
                        {(
                            parseInt(this.state.propertyTax) +
                            parseInt(this.state.maintenanceCost) +
                            parseInt(this.state.mortgage)
                        )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            textAlign: "center",
                        }}
                    >
                        Rental Income
                    </Text>
                    <Text
                        style={{
                            ...Fonts.greenColor18SemiBold,
                            marginTop: 1.5,
                            textAlign: "center",
                        }}
                    >
                        $
                        {parseInt(this.state.rentalIncome)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                </View>
            </View>
        );
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
            />
        );
    }

    mortgage() {
        // var x = 600000 - this.state.SliderValue;
        // // var y = this.state.SliderValue;
        // // var z = x * ("0." + y);
        // var n = this.state.term;
        // var i = this.state.rate/1200;
        // var year = n * 12;
        // var m = x*(i * Math.pow((1 + i), year))/(Math.pow((1 + i), year) - 1);
        // var per =

        // console.log(Math.round(m))
        const renderItem = ({ item }) => (
            <View>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                                marginTop: "20%",
                            }}
                        >
                            Home Price{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 3 }}></View>
                    <View style={{ flex: 3 }}>
                        <View style={styles.searchFieldStyle}>
                            <FontAwesome
                                name="dollar"
                                size={18}
                                color={
                                    this.state.isSearch
                                        ? Colors.primaryColor
                                        : Colors.grayColor
                                }
                            />
                            <TextInput
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    ...Fonts.grayColor14Medium,
                                    marginLeft: Sizes.fixPadding,
                                    paddingTop: 2.0,
                                }}
                                //   placeholder={item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

                                selectionColor={Colors.primaryColor}
                                onFocus={() =>
                                    this.setState({ isSearch: true })
                                }
                                onBlur={() =>
                                    this.setState({ isSearch: false })
                                }
                                onChangeText={(text) =>
                                    this.handlePriceChange(text)
                                }
                                // value={this.state.value}
                                defaultValue={this.state.homePrice.toString()}
                                // onChange={this.state.homePrice
                                //   .toString()
                                //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            />
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: -29.0,
                                textAlign: "left",
                            }}
                        >
                            Down Payment{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 3, marginTop: "-15%" }}>
                        <View style={styles.searchFieldStyle}>
                            <FontAwesome
                                name="dollar"
                                size={18}
                                color={
                                    this.state.isSearch
                                        ? Colors.primaryColor
                                        : Colors.grayColor
                                }
                            />
                            <TextInput
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    ...Fonts.grayColor14Medium,
                                    marginLeft: Sizes.fixPadding,
                                    paddingTop: 2.0,
                                }}
                                selectionColor={Colors.primaryColor}
                                // onFocus={() => this.setState({ isSearch: true })}
                                // onBlur={() => this.setState({ isSearch: false })}
                                onChangeText={(text) =>
                                    this.handleDownpaymentChange(text)
                                }
                                defaultValue={this.state.downpayment.toString()}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 3, marginTop: "-15%" }}>
                        <View style={styles.searchFieldStyle}>
                            <Feather
                                name="percent"
                                size={19}
                                color={
                                    this.state.isSearch
                                        ? Colors.primaryColor
                                        : Colors.grayColor
                                }
                            />
                            <TextInput
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    ...Fonts.grayColor14Medium,
                                    marginLeft: Sizes.fixPadding,
                                    paddingTop: 2.0,
                                }}
                                // placeholder= { this.state.SliderValue }
                                selectionColor={Colors.primaryColor}
                                onFocus={() =>
                                    this.setState({ isSearch: true })
                                }
                                onBlur={() =>
                                    this.setState({ isSearch: false })
                                }
                                onChangeText={(text) =>
                                    this.handleDownpaymentPercentChange(text)
                                }
                                defaultValue={this.state.downpaymentPercent.toString()}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.MainContainer}>
                    {/* <Text style = {{fontSize: 20}}>Slider Value = { this.state.SliderValue }</Text> */}
                 
                    <Slider
                        step={1}
                        minimumValue={0}
                        maximumValue={parseInt(this.state.homePrice)}
                        minimumTrackTintColor="#009688"
                        value={this.state.downpayment}
                        onSlidingComplete={(ChangedValue) =>
                            this.handleSliderChange(ChangedValue)
                        }
                        style={{ width: "100%" }}
                    />
                </View>

                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 10.5,
                                textAlign: "left",
                            }}
                        >
                            Term{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 3 }}></View>
                    <View style={{ flex: 3, marginTop: "-4.5%" }}>
                        <View style={styles.searchFieldStyle}>
                            <MaterialIcons
                                name="search"
                                size={24}
                                color={
                                    this.state.isSearch
                                        ? Colors.primaryColor
                                        : Colors.grayColor
                                }
                            />
                            <TextInput
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    ...Fonts.grayColor14Medium,
                                    marginLeft: Sizes.fixPadding,
                                    paddingTop: 2.0,
                                }}
                                placeholder="Year"
                                selectionColor={Colors.primaryColor}
                                onFocus={() =>
                                    this.setState({ isSearch: true })
                                }
                                onBlur={() =>
                                    this.setState({ isSearch: false })
                                }
                                onChangeText={(text) => {
                                    this.setState({ term: text });
                                    this.calculateMortage();
                                }}
                                numeric
                                keyboardType={"numeric"}
                                defaultValue={this.state.term}
                            />
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: -20.5,
                                textAlign: "left",
                            }}
                        >
                            Rate{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 3 }}></View>
                    <View style={{ flex: 3, marginTop: "-12%" }}>
                        {/* <Text style={{ ...Fonts.blackColor15Medium, marginTop: 1.5, textAlign: 'right' }}>
                        $7,916 / 2021 {'\n'}
                </Text> */}
                        <View style={styles.searchFieldStyle}>
                            <Feather
                                name="percent"
                                size={18}
                                color={
                                    this.state.isSearch
                                        ? Colors.primaryColor
                                        : Colors.grayColor
                                }
                            />
                            <TextInput
                                style={{
                                    flexDirection: "row",
                                    flex: 1,
                                    ...Fonts.grayColor14Medium,
                                    marginLeft: Sizes.fixPadding,
                                    paddingTop: 2.0,
                                }}
                                placeholder="2.5"
                                selectionColor={Colors.primaryColor}
                                onFocus={() =>
                                    this.setState({ isSearch: true })
                                }
                                onBlur={() =>
                                    this.setState({ isSearch: false })
                                }
                                onChangeText={(text) => {
                                    this.setState({ rate: text });
                                    this.calculateMortage();
                                }}
                                defaultValue={this.state.rate}
                            />
                        </View>
                    </View>
                </View>

                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 5 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor16SemiBold,
                                marginLeft: 2.0,
                                marginTop: -20.5,
                                textAlign: "left",
                            }}
                        >
                            Mortgage Payment{"\n"}
                        </Text>
                    </View>

                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.blueColor18SemiBold,
                                marginTop: -21.5,
                                textAlign: "right",
                            }}
                        >
                            {this.state.mortgage
                                ? "$" +
                                  this.state.mortgage
                                      .toString()
                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                : ""}{" "}
                            {"\n"}
                        </Text>
                    </View>
                </View>
            </View>
        );
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={renderItem}
            />
        );
    }

    keyfacts() {
        return (
            <View
                style={[
                    styles.container,
                    {
                        flexDirection: "row",
                    },
                ]}
            >
                <View style={{ flex: 3 }}>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Tax{"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Type{"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Building Age{"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Size {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Lot Size{"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Parking {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Basement {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Listing #{"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Data Source{"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Days on Market{"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Listed on{"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Updated on {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.grayColor15Medium,
                            marginLeft: 2.0,
                            marginTop: 1.5,
                            textAlign: "left",
                        }}
                    >
                        Market Demand{"\n"}
                    </Text>
                </View>
                <View style={{ flex: 5 }}>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        $7,916 / 2021 {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        Detached, Bungalow {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        - {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        1323 feet (Estimate) {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        76 x 165.00 feet {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        Attached 1 garage, 6 parking {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        Unfinished {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        N5483762 {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        TRREB {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        7 days {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        2022-01-28 {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        2022-02-08 {"\n"}
                    </Text>
                    <Text
                        style={{
                            ...Fonts.blackColor15Medium,
                            marginTop: 1.5,
                            textAlign: "right",
                        }}
                    >
                        Market Demand {"\n"}
                    </Text>
                </View>
            </View>
        );
    }

    details() {
        return (
            <View>
                <Text style={{ ...Fonts.grayColor15Medium, paddingLeft: 23.0 }}>
                    {"\n"}Property listed for $1,998,000 on 2022-01-28{"\n"}
                </Text>

                <Text
                    style={{ ...Fonts.blackColor18SemiBold, paddingLeft: 23.0 }}
                >
                    Property
                </Text>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Property Type{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Style{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Community{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Municipality {"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Detached{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Bungalow{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            North Richvale{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Richmond{"\n"}
                        </Text>
                    </View>
                </View>
                <Text
                    style={{ ...Fonts.blackColor18SemiBold, paddingLeft: 23.0 }}
                >
                    Inside
                </Text>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Bedrooms{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Bathrooms{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Basement Type{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Kitchens{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Rooms{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Family Room{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            3{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            1{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Unfinished{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            1{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            5{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Y{"\n"}
                        </Text>
                    </View>
                </View>
                <Text
                    style={{ ...Fonts.blackColor18SemiBold, paddingLeft: 23.0 }}
                >
                    Utilities
                </Text>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Water{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Heating Type{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Heating Fuel{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Municipal{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Forced Air{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Gas{"\n"}
                        </Text>
                    </View>
                </View>
                <Text
                    style={{ ...Fonts.blackColor18SemiBold, paddingLeft: 23.0 }}
                >
                    Building
                </Text>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Construction{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 5 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Alum Siding{"\n"}
                        </Text>
                    </View>
                </View>
                <Text
                    style={{ ...Fonts.blackColor18SemiBold, paddingLeft: 23.0 }}
                >
                    Parking
                </Text>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 4 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Driveway{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Garage Type{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Garage{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Parking Places{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Total Parking Space{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Private{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Attached{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            1.0{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            6{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            7.0{"\n"}
                        </Text>
                    </View>
                </View>
                <Text
                    style={{ ...Fonts.blackColor18SemiBold, paddingLeft: 23.0 }}
                >
                    Land
                </Text>
                <View
                    style={[
                        styles.container,
                        {
                            flexDirection: "row",
                        },
                    ]}
                >
                    <View style={{ flex: 4 }}>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Sewer{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Frontage{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Depth{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Lot Size Code{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.grayColor15Medium,
                                marginLeft: 2.0,
                                marginTop: 1.5,
                                textAlign: "left",
                            }}
                        >
                            Cross Street{"\n"}
                        </Text>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Sewers{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            76.00{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            165.00{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Feet{"\n"}
                        </Text>
                        <Text
                            style={{
                                ...Fonts.blackColor15Medium,
                                marginTop: 1.5,
                                textAlign: "right",
                            }}
                        >
                            Walmer{"\n"}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    rooms() {
        return (
            <View
                style={{
                    marginTop: Sizes.fixPadding - 7.0,
                    paddingBottom: Sizes.fixPadding - 5.0,
                }}
            >
                {
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item) => `${item.house_id}`}
                        renderItem={({ item }) => (
                            <View key={item.id}>
                                <View style={styles.aminitiesContentStyle}>
                                    <View
                                        style={[
                                            styles.container,
                                            {
                                                flexDirection: "row",
                                            },
                                        ]}
                                    >
                                        <View style={{ flex: 3 }}>
                                            <Text
                                                style={{
                                                    ...Fonts.grayColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "left",
                                                }}
                                            >
                                                Kitchen{"\n"}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...Fonts.grayColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "left",
                                                }}
                                            >
                                                Living{"\n"}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...Fonts.grayColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "left",
                                                }}
                                            >
                                                Bathroom{"\n"}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...Fonts.grayColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "left",
                                                }}
                                            >
                                                2nd Br{"\n"}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...Fonts.grayColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "left",
                                                }}
                                            >
                                                3rd Br{"\n"}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 3 }}>
                                            <Text
                                                style={{
                                                    ...Fonts.blackColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "right",
                                                }}
                                            >
                                                Level : Main{"\n"}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...Fonts.blackColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "right",
                                                }}
                                            >
                                                Level : Main{"\n"}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...Fonts.blackColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "right",
                                                }}
                                            >
                                                Level : Main{"\n"}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...Fonts.blackColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "right",
                                                }}
                                            >
                                                Level : Main{"\n"}
                                            </Text>
                                            <Text
                                                style={{
                                                    ...Fonts.blackColor15Medium,
                                                    marginLeft: 2.0,
                                                    marginTop: 1.5,
                                                    textAlign: "right",
                                                }}
                                            >
                                                Level : Main
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                }
            </View>
        );
    }

    propertyInfo() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item) => `${item.house_id}`}
                renderItem={({ item }) => (
                    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <Text
                            style={{
                                ...Fonts.blackColor18Bold,
                                marginTop: Sizes.fixPadding,
                            }}
                        >
                            {this.propertyName}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: Sizes.fixPadding,
                            }}
                        >
                            <View>
                                <Text style={{ ...Fonts.grayColor14Medium }}>
                                    {item.location.address}
                                </Text>
                                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                    5000ft2
                                </Text>
                            </View>
                            <View style={styles.propertyAmountContentStyle}>
                                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                                    $
                                    {item.price
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: Sizes.fixPadding,
                            }}
                        >
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ ...Fonts.blackColor22Bold }}>
                                    {item.bedroom}
                                </Text>
                                <Text
                                    style={{
                                        ...Fonts.blackColor14Regular,
                                        marginTop: Sizes.fixPadding - 20,
                                    }}
                                >
                                    Bedrooms
                                </Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ ...Fonts.blackColor22Bold }}>
                                    {item.bathroom}
                                </Text>
                                <Text
                                    style={{
                                        ...Fonts.blackColor14Regular,
                                        marginTop: Sizes.fixPadding - 20,
                                    }}
                                >
                                    Bathrooms
                                </Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ ...Fonts.blackColor22Bold }}>
                                    2
                                </Text>
                                <Text
                                    style={{
                                        ...Fonts.blackColor14Regular,
                                        marginTop: Sizes.fixPadding - 20,
                                    }}
                                >
                                    Kitchens
                                </Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ ...Fonts.blackColor22Bold }}>
                                    3
                                </Text>
                                <Text
                                    style={{
                                        ...Fonts.blackColor14Regular,
                                        marginTop: Sizes.fixPadding - 20,
                                    }}
                                >
                                    Parkings
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        );
    }
}

var width = Dimensions.get("window").width;

const styles = StyleSheet.create({
    propertyAmountContentStyle: {
        borderWidth: 1.0,
        alignItems: "center",
        height: 34.0,
        justifyContent: "center",
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderColor: "rgba(128, 128, 128, 0.5)",
    },
    propertyPhotosStyle: {
        width: width,
        height: 190.0,
        marginTop: "5%",
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 8.0,
        marginTop: "3%",
    },
    // mapStyle: {
    //     borderRadius: Sizes.fixPadding,
    //     marginVertical: Sizes.fixPadding - 5.0,
    //     overflow: 'hidden',
    //     elevation: 3.0,
    //     marginHorizontal: Sizes.fixPadding * 2.0,
    //     marginTop: '-55%'
    // },
    aminitiesContentStyle: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: Sizes.fixPadding - 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    ownerInfoContentStyle: {
        position: "absolute",
        bottom: 0.0,
        height: 70.0,
        backgroundColor: Colors.whiteColor,
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopColor: "rgba(128, 128, 128, 0.2)",
        borderTopWidth: 1.0,
        elevation: 2.0,
    },
    ownerContactContentStyle: {
        height: 31.0,
        width: 78.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: "center",
        justifyContent: "center",
    },
    snackBarStyle: {
        position: "absolute",
        bottom: 60.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: "#333333",
    },
    container: {
        flex: 1,

        padding: 20,
    },
    searchFieldStyle: {
        flexDirection: "row",
        alignItems: "center",
        height: 37.0,
        backgroundColor: "rgba(128, 128, 128, 0.25)",
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 1.0,
        width: 95,
    },
});

PropertyScreen.navigationOptions = () => {
    return {
        header: () => null,
    };
};

export default withNavigation(PropertyScreen);
