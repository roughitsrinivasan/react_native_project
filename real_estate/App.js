import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import bottomTabBarScreen from "./component/bottomTabBarScreen";
import LoadingScreen from "./component/loadingScreen";
import addNewListingScreen from "./screens/addNewListing/addNewListingScreen";
// import loginScreen from "./screens/auth/loginScreen";
import registerScreen from "./screens/auth/registerScreen";
// import verificationScreen from "./screens/auth/verificationScreen";
import editProfileScreen from "./screens/editProfile/editProfileScreen";
import imageFullViewScreen from "./screens/imageFullView/imageFullViewScreen";
import messageScreen from "./screens/message/messageScreen";
import myListingScreen from "./screens/myListing/myListingScreen";
import notificationScreen from "./screens/notification/notificationScreen";
import privacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import propertyScreen from "./screens/property/propertyScreen";
import searchScreen from "./screens/search/searchScreen";
import SplashScreen from "./screens/splashScreen";
import supportScreen from "./screens/support/supportScreen";
import termsOfUseScreen from "./screens/termsOfUse/termsOfUseScreen";
import reportScreen from "./screens/report/reportScreen";
import mapScreen from "./screens/Map/mapScreen";
import estimateScreen from "./screens/valuation/estimateScreen";
import estimatevalueScreen from "./screens/valuation/estimatevalueScreen";
import Recommendations from "./screens/RecommendationPage/Recommendation";
import SettingScreen from "./screens/setting/settingScreen";
import Personalization from "./screens/Personalizations/Personalization";
import PersonalizedList from "./screens/PersonalizedList/PersonalizedList";

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';

// var xhr = new XMLHttpRequest();
// xhr.open("GET", "http://54.205.76.109:5003/", true);
// xhr.onload = function(){
//     console.log(xhr.responseText);
// };
// xhr.send();


const switchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  mainFlow: createSharedElementStackNavigator(
    {
      Splash: SplashScreen,
      // Login: loginScreen,
      // Verification: verificationScreen,
      Register: registerScreen,
      BottomBar: bottomTabBarScreen,
      Search: searchScreen,
      Notification: notificationScreen,
      Property: propertyScreen,
      ImageFullView: imageFullViewScreen,
      Message: messageScreen,
      EditProfile: editProfileScreen,
      AddNewListing: addNewListingScreen,
      MyListing: myListingScreen,
      PrivacyPolicy: privacyPolicyScreen,
      TermsOfUse: termsOfUseScreen,
      Support: supportScreen,
      Estimate : estimateScreen,
      Estimatevalue : estimatevalueScreen,
      Report : reportScreen,
      Map : mapScreen,
      Recommendation:Recommendations,
      Settings:SettingScreen,
      Personalize:Personalization,
      PersonalizedList:PersonalizedList
    },
    {
      initialRouteName: 'BottomBar',
      headerMode:"none"
    },
  ),
},
  {
    initialRouteName: 'Loading',
  });


const App = createAppContainer(switchNavigator);



export default () => {
  return (
    <App />
  );
};

