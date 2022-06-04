import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    BackHandler,
} from "react-native";
import { withNavigation } from "react-navigation";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import * as Google from "expo-google-app-auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROD_NAME} from '@env'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

class RegisterScreen extends Component {

    componentDidMount() {
        this.getLoginData()
        .then((loginData)=>{
            if(loginData && loginData.loggedIn) {
                // alert(value)  //(Hide it once you get value from this)
                console.log("LoginData present, navigating to home", loginData);
                this.props.navigation.navigate("BottomBar")
              }  
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));

        // push notification
     

        
            // This listener is fired whenever a notification is received while the app is foregrounded
            // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            //   setNotification(notification);
            // });
        
            // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
            // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            //   console.log(response);
            // });

    }



    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }


    async  registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          this.setState({"expoId":token})
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }



    handleBackButton = () => {
        this.props.navigation.navigate('Login');
        return true;
    };

    state = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userId: '',
        sid: '',
        expoId:''
    }

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
        };
    }

    storeLoginData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem("loginData", jsonValue)
        } catch (e) {
          console.log("Error while storing async data:", e);
        }
    }


    

    getLoginData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("loginData")
            console.log(jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log("Error while reading async data:", e);
        }
    }

    removeLoginData = async () => {
        try {
          await AsyncStorage.removeItem("loginData")
        } catch(e) {
            console.log("Error while removing async data:", e);
        }
      }
  

    handleRegularLogin(){
        // fetch('http://192.168.43.89:8063/api/login', {
        fetch('http://18.118.172.175:8372/api/login', {
            
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({
              google_id: user.id,
              email: email
            }),
          })
            .then((response) => response.json())
            .then((responseJson) => {
              console.log("Showing response message coming from server");
              console.log(responseJson);
            //   this.setState({ "userId": responseJson.result.user_id });
            return true;
            })
            .catch((error) => {
            //display error message
             console.log(error);
             return false;
            });
    }

    handleGoogleLogin = async (user)=>{
        let username = user.name;
        let email    = user.email;
        this.registerForPushNotificationsAsync().then(()=>{

            fetch('http://18.118.172.175:8372/api/login/with/google', {
            
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
        
                body: JSON.stringify({
                //   google_id: user.id,
                  email: email,
                  username: username,
                  expoId:this.state.expoId
                }),
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("Showing response message coming handleGoogleLogin from server");
                  console.log(responseJson);
                  if (responseJson.error_code != 0 ) {
                      console.log("Throwing error");
                      throw (responseJson.error_message);
                  }
                //   this.setState({ "userId": responseJson.result.user_id });
                let userId = responseJson.result.user_id;
                this.setState({
                    loggedIn: true,
                    name: username,
                    photoUrl: user.photoUrl,
                    email: email,
                    userId: userId
                })
                // console.log(this.state);
                this.storeLoginData({
                    loggedIn: true,
                    name: username,
                    photoUrl: user.photoUrl,
                    email: email,
                    userId: userId
                })
                // this.getLoginData();   
                console.log("LoginScreen.js | success, navigating to profile");             
                this.props.navigation.navigate("BottomBar", { user });
                // return true;
                
                })
                .catch((error) => {
                //display error message
                 console.log(error);
                 return false;
                });

        })
        .catch((err)=>{
            console.log(err )
        })
        // fetch('http://192.168.43.89:8063/api/login/with/google', {
       
    }

    signInAsync = async () => {
        console.log("LoginScreen.js 168 | loggin in");
        try {
        const { type, user } = await Google.logInAsync({
        androidStandaloneAppClientId: "66264573911-9udfdap4oa235v0ioisi7919mj9rgq0l.apps.googleusercontent.com",
        androidClientId: "66264573911-qocqmo2qfi5k05cv7t429k874lpb46di.apps.googleusercontent.com",
        });
        // console.log(user)
        if (type === "success") {
            this.handleGoogleLogin(user)
            console.log(user);
        }
        
    } catch (error) {
        console.log("registerScreen.js | error with google login", error);
    }
    };


  



    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../../assets/images/bg.jpg')}
                    resizeMode="cover"
                >
                    <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        colors={['black', 'rgba(0,0.10,0,0.77)', 'rgba(0,0,0,0.1)',]}
                        style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {this.backArrow()}
                            {this.registerInfo()}
                            {/* {this.userNameTextField()} */}
                            {this.emailTextField()}
                            {this.passwordTextField()}
                            {/* {this.confirmPasswordTextField()} */}
                            {this.continueButton()}
                            {this.otpText()}
                            {this.loginWithGoogleButtonStyle()}
                            {/* {this.profile()} */}
                        </ScrollView>
                    </LinearGradient>
                </ImageBackground>
            </SafeAreaView >
        )
    }

    otpText() {
        return (
            <Text style={{ ...Fonts.whiteColor18Medium, textAlign: 'center' }}>
                or continue login with google {"\n"}
            </Text>
        )
    }

    loginWithGoogleButtonStyle() {
        
        
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    // {console.log(this)}
                    {this.signInAsync()}
                    // this.props.navigation.navigate('BottomBar');
                }}
            >
                
                <View style={styles.loginWithGoogleButtonStyle}>
                    <Image
                        source={require('../../assets/images/google.png')}
                        style={{ height: 37.0, width: 37.0, }}
                        resizeMode="cover"
                    />
                    <Text style={{ ...Fonts.blackColor14Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                        Log in with Google
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }


    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.props.navigation.navigate('BottomBar');
                }}
            >
            
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['#3270fc', '#3270fc', '#3270fc',]}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Medium }}>
                        Continue
                    </Text>
                </LinearGradient>
            </TouchableOpacity >
        )
    }

    // confirmPasswordTextField() {
    //     return (
    //         <TextInput
    //             style={{ ...Fonts.whiteColor14Medium, ...styles.textFieldContentStyle }}
    //             value={this.state.confirmPassword}
    //             secureTextEntry={true}
    //             onChangeText={(text) => this.setState({ confirmPassword: text })}
    //             placeholder="Confirm Password"
    //             placeholderTextColor="white"
    //         />
    //     )
    // }

    passwordTextField() {
        return (
            <TextInput
                style={{ ...Fonts.whiteColor14Medium, ...styles.textFieldContentStyle }}
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password: text })}
                placeholder="Password"
                placeholderTextColor="white"
            />
        )
    }

    emailTextField() {
        return (
            <TextInput
                style={{ ...Fonts.whiteColor14Medium, ...styles.textFieldContentStyle }}
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
                placeholder="Email"
                placeholderTextColor="white"
            />
        )
    }

    // userNameTextField() {
    //     return (
    //         <TextInput
    //             style={{ ...Fonts.whiteColor14Medium, ...styles.textFieldContentStyle }}
    //             value={this.state.userName}
    //             onChangeText={(text) => this.setState({ userName: text })}
    //             placeholder="Username"
    //             placeholderTextColor="white"
    //         />
    //     )
    // }

    backArrow() {
        return (
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={Colors.whiteColor}
                style={{
                    marginTop: Sizes.fixPadding * 7.0,
                    marginBottom: Sizes.fixPadding
                }}
                onPress={() => this.props.navigation.navigate('Login')}
            />
        )
    }

    registerInfo() {
        return (
            <View style={{
                marginTop: Sizes.fixPadding * 3.0,
                marginBottom: Sizes.fixPadding * 4.0
            }}>
                <Text style={{ ...Fonts.whiteColor36SemiBold }}>
                    Login
                </Text>
                {/* <Text style={{
                    ...Fonts.whiteColor14Regular,
                    marginTop: Sizes.fixPadding - 15.0
                }}>
                    Create account
                </Text> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textFieldContentStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: "rgba(128, 128, 128, 0.8)",
        borderRadius: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.5,
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding + 10.0,
        height: 56.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    loginWithGoogleButtonStyle: {
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        height: 56.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
})

RegisterScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(RegisterScreen);
