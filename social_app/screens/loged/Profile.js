import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions, TextInput, ScrollView } from 'react-native';
import Colors from "../../assets/colors/Colors";

import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import Constants from "expo-constants"
import {MaterialCommunityIcons, Feather, AntDesign, Ionicons,Entypo } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function Profile({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading Profile...</Text>;
  } 

  return (
    <ScrollView style={styles.container}>
        {/* header avatar, edit profile */}
        <TouchableOpacity style={styles.header} onPress={() => navigation.navigate("EditProfile") }>
          <Image source={{uri : "https://i.pravatar.cc/200"}} style={{ width : 100, height : 100, borderRadius : 100}} />
          <View>
            <Text style={styles.header_title}>Yan's Dev</Text>
            <Text style={styles.header_email}>contact@contact.com</Text>
          </View>
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
        {/* nav */}
        <View style={styles.wrapperNavs}>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <AntDesign style={styles.navs_left__icon} name="bells" size={24} color={Colors.primary} />
              <Text style={styles.navs_left__text}>Notifications</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <Feather style={styles.navs_left__icon} name="dollar-sign" size={24} color={Colors.primary} />
              <Text style={styles.navs_left__text}>Payement method</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <MaterialCommunityIcons style={styles.navs_left__icon} name="crown-outline" size={24} color={Colors.primary} />
              <Text style={styles.navs_left__text}>Reward credits</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <Feather style={styles.navs_left__icon} name="percent" size={24} color={Colors.primary} />
              <Text style={styles.navs_left__text}>My promo code</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
        </View>
        {/* sub nav */}
        <View style={styles.wrapperNavs}>
          <TouchableOpacity style={styles.navs} onPress={() => {navigation.navigate("Settings")}}>
            <View style={styles.navs_left}>
              <Ionicons style={styles.navs_left__icon} name="ios-cog-outline" size={24} color={Colors.primary}  />
              <Text style={styles.navs_left__text}>Settings</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <Feather style={styles.navs_left__icon} name="users" size={24} color={Colors.primary} />
              <Text style={styles.navs_left__text}>Invite Friends</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <Feather style={styles.navs_left__icon} name="headphones" size={24} color={Colors.primary} />
              <Text style={styles.navs_left__text}>Help center</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <AntDesign style={styles.navs_left__icon} name="info" size={24} color={Colors.primary} />
              <Text style={styles.navs_left__text}>About Us</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop : Constants.statusBarHeight + 10
    },
    header : {
      flexDirection : "row",
      justifyContent : "space-between",
      alignItems : "center",
      paddingVertical : 20,
      paddingHorizontal : 20,
      borderBottomWidth : 1,
      borderBottomColor : Colors.light_grey
    },
    header_title : {
      color : Colors.primary,
      fontSize : 20, 
      fontFamily : "Poppins_600SemiBold"
    },
    header_email: {
      color : Colors.grey,
      fontSize : 12, 
      fontFamily : "Poppins_400Regular"
    },
    wrapperNavs : {
      paddingVertical : 20
    },  
    navs : {
      flexDirection : "row",
      alignItems : "center",
      justifyContent : "space-between",
      paddingVertical : 14,
      paddingHorizontal : 20,
    },
    navs_left : {
      flexDirection : "row",
      alignItems : "center",
    },
    navs_left__icon : {
      marginRight : 8
    },
    navs_left__text : {
      color : Colors.primary, 
      fontFamily : "Poppins_300Light", 
      marginBottom : -5,
      fontSize : 15
    }
});
