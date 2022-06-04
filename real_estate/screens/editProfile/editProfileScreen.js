import React, { Component } from "react";
import { Text, SafeAreaView, View, StatusBar, StyleSheet, Image, BackHandler, ScrollView, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-elements';
import { TransitionPresets } from 'react-navigation-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

class EditProfileScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
        this.getLoginData()
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    constructor(props) {
        super(props);
        const {params} = this.props;
        console.log("\nInside Edit Profile\n");
    }

    state = {
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        photoUrl: '',
        showBottomSheet: false,
        loginData:{}
    }

    getLoginData = async () => {
        try {
            let jsonValue = await AsyncStorage.getItem("loginData")
            jsonValue = JSON.parse(jsonValue)
            console.log("LOGIN DATA FROM CACHE",jsonValue)
            this.setState({ loggedIn : jsonValue.loggedIn, photoUrl:jsonValue.photoUrl, email:jsonValue.email})
            
            // console.log("after updating state inside getLoginData", this.state);
            return jsonValue != null ? jsonValue : null;
        } catch(e) {
            console.log("Error while reading async data:", e);
        }
    }

    storeLoginData = async (value) => {
        this.removeLoginData()
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem("loginData", jsonValue)
        } catch (e) {
          console.log("Error while storing async data:", e);
        }
    }

    removeLoginData = async () => {
        try {
          await AsyncStorage.removeItem("loginData")
        } catch(e) {
            console.log("Error while removing async data:", e);
        }
      }
  
    
       
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.changeProfilePhoto()}
                        {this.nameTextField()}
                        {/* {this.emailTextField()} */}
                        {this.phoneNumberTextField()}
                        {/* {this.passwordTextField()}
                        {this.retypePasswordTextField()} */}
                        {this.saveButton()}
                    </ScrollView>

                </View>
                {this.changeProfileOptions()}
            </SafeAreaView>
        )
    }

    changeProfileOptions() {
        return (
            <BottomSheet
                isVisible={this.state.showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: false })}
                    style={styles.bottomSheetContentStyle}
                >
                    <Text style={{ ...Fonts.blackColor18Bold, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <View style={{
                        backgroundColor: '#CFC6C6', height: 1.0,
                        marginBottom: Sizes.fixPadding + 2.0,
                        marginTop: Sizes.fixPadding - 5.0,
                    }}>

                    </View>
                    <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-camera" size={24} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={22} color={Colors.blackColor} />
                        <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                            Choose from gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    getUpdateDetails(){
       
    }

    handleProfileEdit = () => {
                 console.log("Handle Edit");
                // let userId = userLoginData.userId;
                this.getUpdateDetails(); 
               if(this.state.name == ""|| this.state.phoneNumber===""){
                   alert('Please Enter Required Details');
                   return;
               }else{

                console.log("Getting New User Deatils");
                console.log("State",this.state);

                this.getLoginData().then(loginInfo=>{
                    // console.log("LoginInfo",loginInfo);


                    console.log("State Name before post",this.state.name)


                    this.setState({
                        loginData:{
                            ...loginInfo,
                            mobile_no:this.state.phoneNumber,
                            name:this.state.name
                        }
                    })
                    

                    fetch('http://192.168.1.91:8063/api/edit/user/details', {
                                            method: 'POST',
                                            headers: {
                                                Accept: 
                                                'application/json',
                                                'Content-Type': 'application/json',

                                            },
                                    
                                            body: JSON.stringify({
                                                "user_id" : this.state.loginData.userId,
                                                "username": this.state.loginData.name,
                                                "mobile_no": this.state.loginData.mobile_no,
                                                "email":this.state.loginData.email
                                            }),
                                        })
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                            console.log("LoginInfo After Updation",this.state.loginData);
                                            console.log("Showing response message coming from server");
                                            console.log(responseJson);
                                            this.storeLoginData(this.state.loginData)
                    
                                        })
                                        .catch((error) => {
                                            //display error message
                                            console.log("error!!");
                                            console.log(error);
                                        });


                    
                   
                    
                }).then(()=>{
                    console.log("Update SUccess in Edit Profile")
                    this.props.navigation.navigate("BottomBar");
                })
                .catch(err=>{
                    console.log(err);
                })
                   

               }

               
                
                

                
                

                //http://192.168.1.91:8063/api/edit/user/details

                

                // if (userName && mobile_no) {
                //                 // use ip address of the machine running instead of localhost in dev
                //                 // fetch('http://192.168.43.89:8063/api/bookmark/house', {
                //                 fetch('http://18.118.172.175:8372/api/edit/user/details', {
                //                     method: 'POST',
                //                     headers: {
                //                     Accept: 'application/json',
                //                     'Content-Type': 'application/json',
                //                     },
                            
                //                     body: JSON.stringify({
                //                         "user_id" : userId,
                //                         "username": userName,
                //                         "mobile_no": mobile_no
                //                     }),
                //                 })
                //                 .then((response) => response.json())
                //                 .then((responseJson) => {
                //                     console.log("Showing response message coming from server");
                //                     console.log(responseJson);
                //                     // this.storeLoginData({
                //                     //     name: username,
                //                     //     mobile_no: mobile_no
                //                     // })
            
                //                 })
                //                 .catch((error) => {
                //                     //display error message
                //                     console.log("error!!");
                //                     console.log(error);
                //                 });
                //             }



                // this.getLoginData().then(loginInfo=>{
                    // let json={...loginInfo}
                    // json.name=userName
                    // console.log("userName",userName)
                    // this.setState({

                    //     loginData:{...json}
                       
                    // })
                    // console.log(loginInfo)
                // }).then((res)=>{
                    // console.log("LOGIN INFO")
                    // console.log(this.state.loginData)
                    // this.storeLoginData(this.state.loginData)
                // })
                // console.log(this.state.loginData)
                // const loginJson={
                //     ...this.state.loginData,
                // }
                // loginJson.name=userName
                // loginJson.mobile_no=mobile_no
                
                // this.storeLoginData(loginJson)
        // this.getLoginData()
        // .then(
        //     (userLoginData) => {
        //         console.log("userLogindata", userLoginData);
        //         let userId = userLoginData.userId; 
        //         let userName = this.state.name;
        //         let mobile_no = this.state.phoneNumber;
        //         if (userName && mobile_no) {
        //             // use ip address of the machine running instead of localhost in dev
        //             // fetch('http://192.168.43.89:8063/api/bookmark/house', {
        //             fetch('http://18.118.172.175:8372/api/edit/user/details', {
        //                 method: 'POST',
        //                 headers: {
        //                 Accept: 'application/json',
        //                 'Content-Type': 'application/json',
        //                 },
                
        //                 body: JSON.stringify({
        //                     "user_id" : userId,
        //                     "username": userName,
        //                     "mobile_no": mobile_no
        //                 }),
        //             })
        //             .then((response) => response.json())
        //             .then((responseJson) => {
        //                 console.log("Showing response message coming from server");
        //                 console.log(responseJson);
        //                 this.storeLoginData({
        //                     name: username,
        //                     mobile_no: mobile_no
        //                 })

        //             })
        //             .catch((error) => {
        //                 //display error message
        //                 console.log("error!!");
        //                 console.log(error);
        //             });
        //         }
        // })    
        // this.props.navigation.navigate("BottomBar")
        // this.props.navigation.goBack();
      
        // this.props.navigation.navigate("BottomBar");
    }


    saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={()=>{this.handleProfileEdit()}}
                style={styles.saveButtonStyle}>
                <Text style={{ ...Fonts.whiteColor16Medium }}>Save</Text>
            </TouchableOpacity>
        )
    }

    phoneNumberTextField() {
        return (
            <TextInput
                label="Phone Number"
                mode="outlined"
                keyboardType="numeric"
                value={this.state.phoneNumber}
                onChangeText={text => this.setState({ phoneNumber: text })}
                style={{
                    ...Fonts.blackColor14Medium,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    backgroundColor: Colors.whiteColor,
                    marginVertical: Sizes.fixPadding - 3.0
                }}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    passwordTextField() {
        return (
            <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
                style={{
                    ...Fonts.blackColor14Medium,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    backgroundColor: Colors.whiteColor,
                    marginVertical: Sizes.fixPadding - 3.0
                }}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    retypePasswordTextField() {
        return (
            <TextInput
                label="Re-Type Password"
                mode="outlined"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={text => this.setState({ retypePassword: text })}
                style={{
                    ...Fonts.blackColor14Medium,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    backgroundColor: Colors.whiteColor,
                    marginVertical: Sizes.fixPadding - 3.0
                }}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }


    // emailTextField() {
    //     return (
    //         <TextInput
    //             label="Email"
    //             mode="outlined"
    //             value={this.state.email}
    //             onChangeText={text => this.setState({ email: text })}
    //             style={{
    //                 ...Fonts.blackColor14Medium,
    //                 marginHorizontal: Sizes.fixPadding * 2.0,
    //                 backgroundColor: Colors.whiteColor,
    //                 marginVertical: Sizes.fixPadding - 3.0
    //             }}
    //             selectionColor={Colors.blackColor}
    //             theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
    //         />
    //     )
    // }

    nameTextField() {
        return (
            <TextInput
                label="Name"
                mode="outlined"
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
                style={{
                    ...Fonts.blackColor14Medium,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    backgroundColor: Colors.whiteColor,
                    marginVertical: Sizes.fixPadding - 3.0
                }}
                selectionColor={Colors.blackColor}
                theme={{ colors: { primary: 'gray', underlineColor: 'transparent', } }}
            />
        )
    }

    changeProfilePhoto() {
        return (
            <View style={{
                alignSelf: 'center',
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding + 5.0
            }}>
                <Image
                    source= {this.state.photoUrl ? {uri: this.state.photoUrl} : require('../../assets/images/user/user_5.jpg') } 
                    style={{ height: 100.0, width: 100.0, borderRadius: 50.0, }}
                    resizeMode="cover"
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.setState({ showBottomSheet: true })}
                    style={styles.changeInfoContentStyle}>
                    <MaterialIcons name="photo-camera" size={17} color={Colors.whiteColor} />
                    <Text style={{ ...Fonts.whiteColor12Regular, marginLeft: Sizes.fixPadding - 5.0 }}>
                        Change
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <MaterialIcons name="arrow-back" size={24}
                    color="black"
                    onPress={() => this.props.navigation.goBack()}
                    style={{ position: 'absolute', left: 20.0, }}
                />
                <Text style={{
                    ...Fonts.blackColor18Bold,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    Edit Profile
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
    },
    saveButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding + 5.0
    },
    bottomSheetContentStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding,
    },
    changeInfoContentStyle: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0.0,
        backgroundColor: '#FF8C00',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 6.0,
        alignItems: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
    },
})

EditProfileScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(EditProfileScreen);