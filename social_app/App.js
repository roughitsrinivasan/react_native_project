import "react-native-gesture-handler";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions } from 'react-native';
import * as SecureStore from "expo-secure-store";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";




// import { StatusBar } from "expo-status-bar";
// import  { useEffect, useState } from "react";
// import { StyleSheet, Button, View } from "react-native";
// import * as Notifications from "expo-notifications";


// CONTEXT
import { AuthContext } from "./src/components/Context";

// SCREENS LOGGEDOUT
import Splash from './screens/splashScreen';
import Onboarding from './screens/Onboarding';
import SignIn from './screens/Signin';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import ForgotPassword_update from './screens/ForgotPassword_update';

// SCREENS LOGGEDIN
import Explore from './screens/loged/Explore';
import MyOrders from './screens/loged/MyOrders';
import Favorite from './screens/loged/Favorite';
import Profile from './screens/loged/Profile';
// import Signin from './screens/Signin';
import DetailResto from './screens/loged/DetailResto';
import DetailPlate from './screens/loged/DetailPlate';
import RandomSingle from './screens/loged/RandomSingle';
import Random from './screens/loged/Random';
import Settings from './screens/loged/Settings';
import EditProfile from './screens/loged/EditProfile';
import Search from './screens/loged/Search';
import Address from './screens/loged/Address';
import PayementMethods from './screens/loged/PayementMethods';
import LeaderBoard from './screens/loged/LeaderBoard';
import LearningAnalytics from './screens/loged/LearningAnalytics';
import Sandbox from  './screens/Sanbox'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import Colors from "./assets/colors/Colors";
import RandomSingleAccepted from "./screens/loged/RandomSingleAccepted";
import MlPost from "./screens/loged/MlPost";

// loggedOut screens
const StackOnBoarding = createStackNavigator();
const StackOnBoardingScreen = () => {
	return (
		<StackOnBoarding.Navigator>
			<StackOnBoarding.Screen
				name="Splash"
				component={Splash}
				options={{
					headerShown: false,
				}}
			/>
			<StackOnBoarding.Screen
				name="OnBoarding"
				component={Onboarding}
				options={{
					headerShown: false,
				}}
			/>
			<StackOnBoarding.Screen
				name="SignIn"
				component={SignIn}
				options={{
					headerShown: false,
				}}
			/>
			<StackOnBoarding.Screen
				name="SignUp"
				component={SignUp}
				options={{
					headerShown: false,
				}}
			/>
			<StackOnBoarding.Screen
				name="ForgotPassword"
				component={ForgotPassword}
				options={{
					headerShown: true,
					title : "Forgot password",
					headerTitleAlign : "center",
					headerStyle: {
						elevation:0,
					},
				}}
			/>
			<StackOnBoarding.Screen
					name="ForgotPassword_update"
					component={ForgotPassword_update}
					options={{
						headerShown: true,
						title : "Forgot password",
									headerTitleAlign : "center",
						headerStyle: {
							elevation:0,
						},
					}}
				/>
			<StackOnBoarding.Screen
					name="Explore"
					component={Explore}
					options={{
						headerShown: false,
					}}
				/>
		</StackOnBoarding.Navigator>
	);
};






const MyOrdersScreen = createStackNavigator();
const MyOrdersScreenShow = () => {
	return (
		<MyOrdersScreen.Navigator>
			<MyOrdersScreen.Screen
				name="MyOrders"
				component={MyOrders}
				options={{
					headerShown: true,
					title : "My Order",
					headerTitleAlign : "center",
					headerStyle: {
						elevation:0,
					},
				}}
			/>
		</MyOrdersScreen.Navigator>
	);
};
const MyFavoriteScreen = createStackNavigator();
const MyFavoriteScreenShow = () => {
	return (
		<MyFavoriteScreen.Navigator>
			<MyFavoriteScreen.Screen
				name="Favorite"
				component={Favorite}
				options={{
					headerShown: true,
					title : "My Favorite",
					headerTitleAlign : "center",
					headerStyle: {
						elevation:0,
					},
				}}
			/>
		</MyFavoriteScreen.Navigator>
	);
};

// tab navigation
const Tab = createBottomTabNavigator();
const TabsScreen = () => {


	return (
		<Tab.Navigator
			tabBarOptions={{
				activeTintColor: Colors.primary,
				showLabel: true,
			}}
		>
			<Tab.Screen
				name="Explore"
				component={Explore}
				options={({ route }) => ({
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="storefront-outline" size={24} color={color} />
					),
				})}
			/>
			<Tab.Screen
				name="My Order"
				component={MyOrdersScreenShow}
				options={({ route }) => ({
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="book-outline" size={24} color={color} />
					),
				})}
			/>
			<Tab.Screen
				name="Favorite"
				component={MyFavoriteScreenShow}
				options={({ route }) => ({
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="heart-outline" size={24} color={color} />
					),
				})}
			/>
			<Tab.Screen
				name="Sandbox"
				component={Sandbox}
				options={({ route }) => ({
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="heart-outline" size={24} color={color} />
					),
				})}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={({ route }) => ({
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="user" size={24} color={color} />
					),
				})}
			/>
		</Tab.Navigator>
		
	);
};

const StackAuth = createStackNavigator();
const StackAuthScreen = () => {
	return (
		<StackAuth.Navigator>
		{/* <StackAuth.Screen
				name="Signin"
				component={Signin}
				options={{
					headerShown: true,
					title: "",
    				headerTransparent: true,
					headerStyle: {
						backgroundColor: "transparent",
						elevation:0,
					},
					// headerTitleAlign: 'center',
					// headerTintColor: '#fff',
				}}
			/> */}
			<StackAuth.Screen
				name="TabsScreen"
				component={TabsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<StackAuth.Screen
				name="DetailResto"
				component={DetailResto}
				options={{
					headerShown: true,
					title: "",
    				headerTransparent: true,
					headerStyle: {
						backgroundColor: "transparent",
						elevation:0,
					},
					// headerTitleAlign: 'center',
					// headerTintColor: '#fff',
				}}
			/>
			<StackAuth.Screen
				name="DetailPlate"
				component={DetailPlate}
				options={{
					headerShown: true,
					title: "",
    				headerTransparent: true,
					headerStyle: {
						backgroundColor: "transparent",
						elevation:0,
					},
					// headerTitleAlign: 'center',
					// headerTintColor: '#fff',
				}}
			/>
			
			<StackAuth.Screen
				name="RandomSingle"
				component={RandomSingle}
				options={{
					headerShown: true,
					title: "",
    				headerTransparent: true,
					headerStyle: {
						backgroundColor: "transparent",
						elevation:0,
					},
					// headerTitleAlign: 'center',
					// headerTintColor: '#fff',
				}}
			/>
			<StackAuth.Screen
				name="Random"
				component={Random}
				options={{
					headerShown: true,
					title: "",
    				headerTransparent: true,
					headerStyle: {
						backgroundColor: "transparent",
						elevation:0,
					},
					// headerTitleAlign: 'center',
					// headerTintColor: '#fff',
				}}
			/>
				<StackAuth.Screen
				name="MlPost"
				component={MlPost}
				options={{
					headerShown: true,
					title: "",
    				headerTransparent: true,
					headerStyle: {
						backgroundColor: "transparent",
						elevation:0,
					},
					// headerTitleAlign: 'center',
					// headerTintColor: '#fff',
				}}
			/>
            	<StackAuth.Screen
				name="RandomSingleAccepted"
				component={RandomSingleAccepted}
				options={{
					headerShown: true,
					title: "",
    				headerTransparent: true,
					headerStyle: {
						backgroundColor: "transparent",
						elevation:0,
					},
				}}
			/>
				<StackAuth.Screen
				name="LA"
				component={LearningAnalytics}
				options={{
					headerShown: true,
					title: "",
    				headerTransparent: true,
					headerStyle: {
						backgroundColor: "transparent",
						elevation:0,
					},
				}}
			/>
			
			<StackAuth.Screen
				name="LeaderBoard"
				component={LeaderBoard}
				options={{
					headerShown: true,
					title: "",
    				headerTransparent: true,
					headerStyle: {
						backgroundColor: "transparent",
						elevation:0,
					},
					// headerTitleAlign: 'center',
					// headerTintColor: '#fff',
				}}
			/>
			<StackAuth.Screen
				name="Settings"
				component={Settings}
				options={{
					headerShown: true,
					title: "Setting",
					headerTitleAlign: 'center',
					headerTintColor: 'black',
					headerStyle: {
						elevation : 0,
						// borderWidth : 1,
					}
				}}
			/>
			<StackAuth.Screen
				name="EditProfile"
				component={EditProfile}
				options={{
					headerShown: true,
					title: "Edit Profile",
					headerTitleAlign: 'center',
					headerTintColor: 'black',
					headerStyle: {
						elevation : 0,
					}
				}}
			/>
			<StackAuth.Screen
				name="Search"
				component={Search}
				options={{
					headerShown: true,
					title: "Search",
					headerTitleAlign: 'center',
					headerTintColor: 'black',
					headerStyle: {
						elevation : 0,
					}
				}}
			/>
			<StackAuth.Screen
				name="Address"
				component={Address}
				options={{
					headerShown: true,
					title: "Address",
					headerTitleAlign: 'center',
					headerTintColor: 'black',
					headerStyle: {
						elevation : 0,
					}
				}}
			/>
			<StackAuth.Screen
				name="PayementMethods"
				component={PayementMethods}
				options={{
					headerShown: true,
					title: "Payement Methods",
					headerTitleAlign: 'center',
					headerTintColor: 'black',
					headerStyle: {
						elevation : 0,
					}
				}}
			/>
		</StackAuth.Navigator>
		);
};


export default function App() {

	const [token, setToken] = React.useState("");

	React.useEffect(() => {
		const getTokenUserIfExist = async () => {
			const token = await SecureStore.getItemAsync("token");
			console.log("Voici le token enregistrer => ", token);
			setToken(token);
		};
		getTokenUserIfExist();
	}, []);

	const authContext = React.useMemo(() => {
		return {
			logOut: async () => {
				await SecureStore.deleteItemAsync("token");
				// alert("amek dina ??");
				setToken("");
				// console.log("token", token);
			},
			setTokenUser: async (token) => {
				// garder toute les infos du User.
				console.log("Voici le TOKEN recu => ", token);
				await SecureStore.setItemAsync("token", JSON.stringify(token));
				setToken(JSON.stringify(token));
			},
			getTokenUser: () => {
				return token;
			},
		};
	}, [token]);

  return (
	<AuthContext.Provider value={authContext}>
        <NavigationContainer>
			{/* <StackOnBoardingScreen /> */}
			{/* <StackAuthScreen />  */}
			{token ? <StackAuthScreen /> : <StackOnBoardingScreen />}
        </NavigationContainer>
	</AuthContext.Provider>	
  );
}