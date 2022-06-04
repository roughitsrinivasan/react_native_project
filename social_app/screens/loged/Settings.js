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


import { AuthContext } from "../../src/components/Context";


import Constants from "expo-constants"
import {MaterialCommunityIcons, Feather, AntDesign, Ionicons,Entypo } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function Settings({ navigation }) {
    const { logOut } = React.useContext(AuthContext);
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading Settings...</Text>;
  } 

  return (
      <View  style={styles.container}>
    <ScrollView>
        {/* title like devider */}
        <View style={styles.deviderTitle}>
            <Text style={styles.deviderTitle__text}>User Information</Text>
        </View>
        {/* User informations elements */}
        <View style={styles.wrapperNavs}>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <Text style={styles.navs_left__text}>Information {"&"} Contact</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <Text style={styles.navs_left__text}>Password</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
        </View>
        {/* title like devider */}
        <View style={styles.deviderTitle}>
            <Text style={styles.deviderTitle__text}>App Setting</Text>
        </View>
        <View style={styles.wrapperNavs}>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <Text style={styles.navs_left__text}>Language</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navs}>
            <View style={styles.navs_left}>
              <Text style={styles.navs_left__text}>Notifications</Text>
            </View>
            <AntDesign name="right" size={24} color={"#d9d9d9"} />
          </TouchableOpacity>
        </View>
    </ScrollView>
    <TouchableOpacity style={styles.btn_logout} onPress={() => { logOut() }}>
        <Text style={styles.btn_logout_text}>LOG OUT</Text>
    </TouchableOpacity>
</View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    deviderTitle : {
        backgroundColor: Colors.light_grey,
        paddingVertical : 15,
        marginTop : 30,
        justifyContent : "center",
    },
    deviderTitle__text : {
        color : Colors.primary,
        fontFamily : "Poppins_600SemiBold",
        alignSelf : "center"
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
    },
    btn_logout : {
        position : "absolute", 
        bottom : 30,
        width : width - 100, 
        alignSelf : "center",
        borderRadius : 42,
        height : 48,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : Colors.medium_grey,
    },
    btn_logout_text : {
        color : Colors.primary, 
        fontFamily : "Poppins_600SemiBold", 
        marginBottom : -5
    }
});
