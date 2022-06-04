import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions, TextInput, ScrollView } from 'react-native';
import Colors from "../../assets/colors/Colors";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import Constants from "expo-constants"
import { EvilIcons,FontAwesome, AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function MyOrders({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [showSection, setShowSection] = React.useState({
    all : true,
    comming : false,
    history : false,
    draft : false,
  })



  if (!fontsLoaded) {
    return <Text>Loading Orders...</Text>;
  } 

  return (
    <View style={styles.container}>
        {/* scroll horizontale of status */}
        <View style={styles.navs} >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => { setShowSection({all : true,comming : false,history : false,draft : false,}) }} style={[styles.navs_link, showSection.all ? styles.navs_link__active : ""]}><Text style={styles.navs_link__text}>All</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowSection({all : false,comming : true,history : false,draft : false,}) }} style={[styles.navs_link, showSection.comming ? styles.navs_link__active : ""]}><Text style={styles.navs_link__text}>Comming</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowSection({all : false,comming : false,history : true,draft : false,}) }} style={[styles.navs_link, showSection.history ? styles.navs_link__active : ""]}><Text style={styles.navs_link__text}>History</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => { setShowSection({all : false,comming : false,history : false,draft : true,}) }} style={[styles.navs_link, showSection.draft ? styles.navs_link__active : ""]}><Text style={styles.navs_link__text}>Draft</Text></TouchableOpacity>
          </ScrollView>
        </View>
        {/* wrapper of all the elements there */}
        {/* ALL */}
        <View style={[styles.wrapperCards, { display: showSection.all ? "flex" : "none" }]}>
          {/* use flatlist here :D */}
          <TouchableOpacity style={styles.cardPopular}>
              <View>
                  <Image source={require("../../assets/illustrations/popular1.png")} style={styles.cardPopular_image} />
                  <Text style={styles.cardPopular_qts}>x2</Text>
              </View>
              <View>
                  <Text style={styles.cardPopular_title}>Red Meat with Rice</Text>
                  <Text style={[styles.cardPopular_status, {backgroundColor : Colors.secondary}]}>Conferming</Text>
                  <Text style={styles.cardPopular_subTitle}>CoolMe</Text>
                  <Text style={styles.cardPopular_adresse}>New york, 15 avenue</Text>
                  <Text style={styles.cardPopular_coming}>Comming in 3 minutes</Text>
              </View>
          </TouchableOpacity>
          <View style={styles.cardPopular}>
              <View>
                  <Image source={require("../../assets/illustrations/rice_tomate.png")} style={styles.cardPopular_image} />
                  <Text style={styles.cardPopular_qts}>x1</Text>
              </View>
              <View>
                  <Text style={styles.cardPopular_title}>Plate Chicken {"&"} rice</Text>
                  <Text style={styles.cardPopular_status}>Comming</Text>
                  <Text style={styles.cardPopular_subTitle}>El khider</Text>
                  <Text style={styles.cardPopular_adresse}>Sidi Ahmed, Béjaia</Text>
                  <Text style={styles.cardPopular_coming}>Comming in 15 minutes</Text>
              </View>
          </View>
        </View>

        {/* Comming */}
        <View style={[styles.wrapperCards, { display: showSection.comming ? "flex" : "none" }]}>
          {/* use flatlist here :D */}
          <Image source={require("../../assets/illustrations/empty.png")} style={{width : 300, height : 300, alignSelf : "center" }} />
          <Text style={styles.emptyText}>No order available</Text>
        </View>

        {/* history */}
        <View style={[styles.wrapperCards, { display: showSection.history ? "flex" : "none" }]}>
          {/* use flatlist here :D */}
          <Image source={require("../../assets/illustrations/empty.png")} style={{width : 300, height : 300, alignSelf : "center" }} />
          <Text style={styles.emptyText}>No history available</Text>
        </View>

        {/* draft */}
        <View style={[styles.wrapperCards, { display: showSection.draft ? "flex" : "none" }]}>
          {/* use flatlist here :D */}
          <Image source={require("../../assets/illustrations/empty.png")} style={{width : 300, height : 300, alignSelf : "center" }} />
          <Text style={styles.emptyText}>No Draft available</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#fff',
        paddingTop : Constants.statusBarHeight,
        // borderWidth : 1
    },
    navs : {
      marginBottom : 20,
      paddingHorizontal : 20
    },
    navs_link : {
      backgroundColor : Colors.medium_grey, 
      height : 40,
      paddingHorizontal : 15,
      paddingVertical : 8,
      borderRadius : 30,
      width : 110, 
      marginRight : 5
    },
    navs_link__active : {
      backgroundColor : Colors.primary, 
    },
    navs_link__text : {
      color : 'white',
      alignSelf : "center"
    },
    wrapperCards : {
      // flex : 1
    },
    cardPopular : {
      flexDirection : "row",
      width  : width - 40,
      paddingHorizontal : 15,
      paddingVertical : 10,
      borderRadius : 8,
      elevation : 5,
      backgroundColor : "white",
      marginTop : 20,
      marginBottom : 15,
      alignSelf : "center"
    },
    cardPopular_qts : {
      color : Colors.primary,
      fontFamily : "Poppins_600SemiBold",
      width : 90,
      textAlign : "center"
    },
    cardPopular_image : {
      width : 90, height : 90, marginTop : -30, marginBottom : 15, marginRight : 15, borderWidth : 1
    },
    cardPopular_image__right : {
        alignSelf : "flex-end"
    },
    cardPopular_title : {
        color : Colors.primary, 
        fontSize : 16,
        fontFamily : "Poppins_600SemiBold",
    },
    cardPopular_status : {
      color : "white", 
      backgroundColor : Colors.blue,
      fontSize : 9,
      fontFamily : "Poppins_300Light_Italic",
      alignSelf : "flex-start",
      borderRadius : 15,
      marginBottom : 8,
      paddingHorizontal : 8
    }, 
    cardPopular_subTitle : {
        color : Colors.dark_grey,
        fontSize : 14,
        marginTop : -5,
        fontFamily : "Poppins_400Regular"
    },
    cardPopular_adresse : {
        color : Colors.grey,
        fontSize : 12,
        fontFamily : "Poppins_300Light"
    },
    cardPopular_coming : {
        color : Colors.blue,
        fontSize : 11,
        fontFamily : "Poppins_400Regular"
    },
    emptyText : {
        color : Colors.primary,
        fontSize : 25,
        fontFamily : "Poppins_600SemiBold",
        alignSelf : "center"
    }
});
