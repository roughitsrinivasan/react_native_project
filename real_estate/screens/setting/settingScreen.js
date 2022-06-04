import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Switch, TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import * as Google from "expo-google-app-auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('screen');

class SettingScreen extends Component {

    state = {
        matchedPropertySwitch: true,
        newLaunchedPropertySwitch: false,
        newPropertySwitch: false,
        isLogout: false,
        loggedIn: true,
    }
    
    constructor(props) {
        super(props);
        const {params} = this.props;
        // console.log(this);
        console.log("settingScreen constructor");
    }
    
    componentDidMount() {
        this.getLoginData()
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.handleBackButton.bind(this)
            );
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

    getLoginData = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem("loginData")
            jsonValue = JSON.parse(jsonValue)
            // console.log( "jsonValue" ,typeof jsonValue);
            // console.log(jsonValue.loggedIn, jsonValue["loggedIn"]);
            // console.log("JSON value from cache",jsonValue)
            this.setState({ loggedIn : jsonValue.loggedIn, name: jsonValue.name, photoUrl:jsonValue.photoUrl})
            if(Object.keys(jsonValue).includes("mobile_no")){
                console.log("JSON Value from Cache",jsonValue)
                this.setState({
                    ...this.state,
                    phoneNumber:jsonValue.mobile_no
                })
            }
            console.log("after updating state inside getLoginData", this.state);
            return jsonValue != null ? jsonValue : null;
        } catch(e) {
            console.log("Error while reading async data:", e);
        }
    }

    removeLoginData = async () => {
        try {
          await AsyncStorage.removeItem("loginData")
          this.setState({ loggedIn : false, name: null, photoUrl:null})
        } catch(e) {
            console.log("Error while removing async data:", e);
        }
    }


    // isLoggedIn = () => {
    //     this.getLoginData()
    //     .then((loginData)=>{
    //         if(loginData && loginData.loggedIn) {
    //             this.setState({ loggedIn : true })
    //             return true
    //         }              
    //     })
    //     return false
    // }

    signOutAsync = async () => {
        console.log("signoutAsync");
        // const config = {
        //     androidClientId: `66264573911-qocqmo2qfi5k05cv7t429k874lpb46di.apps.googleusercontent.com`,
        //     androidStandaloneAppClientId: `66264573911-9udfdap4oa235v0ioisi7919mj9rgq0l.apps.googleusercontent.com`,
        //   };
        //   const { type, accessToken } = await Google.logInAsync(config);
          
        //   if (type === 'success') {
        //     console.log("success");
        //     this.setState({
        //         loggedIn: false
        //     })
        //     /* Log-Out */
        //     await Google.logOutAsync({ accessToken, ...config });
            this.removeLoginData();
            this.props.navigation.navigate("Register");
            /* `accessToken` is now invalid and cannot be used to get data from the Google API with HTTP requests */
        // }
    }


    render() {

        // try{
        //     const name  = this.props.navigation.state.params.user.email;
        //     const photoUrl  = this.props.navigation.state.params.user.photoUrl;
        //     console.log("name" ,name);
        //     console.log("photourl" ,photoUrl);
        // }catch (error) {}
        return (
            <View style={{ flex: 1, }}>
                {this.header()}
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 9.0 }}
                >
                    {this.userInfo()}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.navigate('MyListing')}
                    >
                        {this.moreInfo({ info: 'My Listing' })}
                    </TouchableOpacity>
                    {this.title({ title: 'ABOUT' })}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.navigate('PrivacyPolicy')}
                    >
                        {this.moreInfo({ info: 'Privacy Policy' })}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.navigate('TermsOfUse')}
                    >
                        {this.moreInfo({ info: 'Terms of use' })}
                    </TouchableOpacity>
                    {this.title({ title: 'Manage Notification' })}
                    {this.matchedPropertyNotification({ info: 'For Matched Properties' })}
                    {this.newLanchedPropertyNotification({ info: 'For New Launched Properties' })}
                    {this.newPropertyNotification({ info: 'For Property News' })}
                    {this.title({ title: 'APP' })}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.navigation.navigate('Support')}
                    >
                        {this.moreInfo({ info: 'Support' })}
                    </TouchableOpacity>

                    {this.moreInfo({ info: 'Report a Bug' })}
                    {this.moreInfo({ info: 'App Version 1.0' })}
                    {this.state.loggedIn ? this.logOutInfo() : null}
                </ScrollView>
                {/* <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.navigate('AddNewListing')}
                    style={styles.floatingButtonStyle}>
                    <MaterialIcons name="add" size={35} color={Colors.whiteColor} />
                </TouchableOpacity> */}
                {this.logOutDialog()}
            </View>
        )
    }

    // logOutStatus() {
    //     return (
    //     <View style={styles.container}>
    //         {this.state.loggedIn ? (
    //         <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
    //         ) : (
    //         <LoginPage signIn={this.signIn} />
    //         )}
    //     </View>
    //     )
    // }

    logOutDialog() {
        return (
            <Dialog.Container
                visible={this.state.isLogout}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor16Bold, paddingBottom: Sizes.fixPadding - 5.0, }}>
                        You sure want to logout?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.setState({ isLogout: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor14Medium }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={() => {
                                console.log("clicked signout");
                                {this.signOutAsync()}
                                this.setState({ isLogout: false,  })
                                // this.props.navigation.navigate('Login')
                            }}
                            style={styles.logOutButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor14Medium }}>Log out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    logOutInfo() {
        return (
            <TouchableOpacity
                onPress={() => this.setState({ isLogout: true })}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: Sizes.fixPadding * 2.0
                }}>
                <MaterialCommunityIcons name="login-variant" size={24} color="#FF0000" />
                <Text style={{ ...Fonts.redColor14Medium, marginLeft: Sizes.fixPadding }}>
                    Logout
                </Text>
            </TouchableOpacity>
        )
    }

    newPropertyNotification({ info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: width - 80, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {info}
                        </Text>
                    </View>
                    <TouchableRipple
                        rippleColor="transparent"
                        onPress={() => this.setState({ newPropertySwitch: !this.state.newPropertySwitch })}
                    >
                        <View pointerEvents="none">
                            <Switch
                                value={this.state.newPropertySwitch}
                                color={this.state.newPropertySwitch ? Colors.primaryColor : 'rgba(128, 128, 128, 0.3)'}
                            />
                        </View>
                    </TouchableRipple>
                </View>
                {this.divider()}
            </View>
        )
    }

    newLanchedPropertyNotification({ info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: width - 80, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {info}
                        </Text>
                    </View>
                    <TouchableRipple
                        rippleColor="transparent"
                        onPress={() => this.setState({ newLaunchedPropertySwitch: !this.state.newLaunchedPropertySwitch })}
                    >
                        <View pointerEvents="none">
                            <Switch
                                value={this.state.newLaunchedPropertySwitch}
                                color={this.state.newLaunchedPropertySwitch ? Colors.primaryColor : 'rgba(128, 128, 128, 0.3)'}
                            />
                        </View>
                    </TouchableRipple>
                </View>
                {this.divider()}
            </View>
        )
    }

    divider() {
        return (
            <View style={{
                backgroundColor: 'rgba(128, 128, 128, 0.5)', height: 0.8,
                marginVertical: Sizes.fixPadding,
            }}>
            </View>
        )
    }

    matchedPropertyNotification({ info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: width - 80, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {info}
                        </Text>
                    </View>
                    <TouchableRipple
                        rippleColor="transparent"
                        onPress={() => this.setState({ matchedPropertySwitch: !this.state.matchedPropertySwitch })}
                    >
                        <View pointerEvents="none">
                            <Switch
                                value={this.state.matchedPropertySwitch}
                                color={this.state.matchedPropertySwitch ? Colors.primaryColor : 'rgba(128, 128, 128, 0.3)'}
                            />
                        </View>
                    </TouchableRipple>
                </View>
                {this.divider()}
            </View>

        )
    }

    title({ title }) {
        return (
            <Text
                numberOfLines={1}
                style={{
                    ...Fonts.blackColor12Regular,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding
                }}>
                {title}
            </Text>
        )
    }

    moreInfo({ info }) {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ width: width - 80, }}>
                        <Text numberOfLines={1} style={{ ...Fonts.blackColor14Medium }}>
                            {info}
                        </Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={15} color={Colors.blackColor} />
                </View>
                {this.divider()}
            </View>

        )
    }

    userInfo() {
        return (
            <View style={styles.userInfoContentStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={this.state.photoUrl ? {uri: this.state.photoUrl}: require('../../assets/images/user/user_5.jpg')}
                        style={{
                            height: 80.0, width: 80.0,
                            borderRadius: 40.0,
                        }}
                    />
                    <View style={{
                        width: width - 200,
                        marginLeft: Sizes.fixPadding * 2.0
                    }}>
                        {console.log("this.state", this.state)}

                        <Text numberOfLines={1} style={{ ...Fonts.blackColor18Bold }}>
                        {this.state.name ? this.state.name : "User"}
                        {/* {this.state.phoneNumber ? this.state.phoneNumber : "Phn No not Avail"} */}
                        </Text>
                    </View>

                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.navigate('EditProfile')}
                    style={styles.editButtonStyle}>
                    <MaterialIcons name="edit" size={24} color={Colors.whiteColor} />
                </TouchableOpacity>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerStyle}>
                <Text style={{ ...Fonts.primaryColor18Bold }}>Settings</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 60.0,
        elevation: 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfoContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0,
    },
    editButtonStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor
    },
    floatingButtonStyle: {
        height: 60.0,
        width: 60.0,
        backgroundColor: Colors.primaryColor,
        borderRadius: 30.0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20.0,
        bottom: 80.0,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 7.0,
    },
    logOutButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    }
})

export default withNavigation(SettingScreen);