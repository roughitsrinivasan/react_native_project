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

export default function Favorite({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [showSection, setShowSection] = React.useState({
    shop : true,
    food : false,
  })



  if (!fontsLoaded) {
    return <Text>Loading Favorites...</Text>;
  } 

  return (
    <View style={styles.container}>
        {/* scroll horizontale of status */}
        <View style={styles.navs} >
          <TouchableOpacity onPress={() => { setShowSection({shop : true, food : false}) }} style={[styles.navs_link, showSection.shop ? styles.navs_link__active : ""]}><Text style={styles.navs_link__text}>Shop</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { setShowSection({shop : false, food : true}) }} style={[styles.navs_link, showSection.food ? styles.navs_link__active : ""]}><Text style={styles.navs_link__text}>Food</Text></TouchableOpacity>
        </View>
        {/* food */}
        <View style={[styles.wrapperCards, { display: showSection.food ? "flex" : "none" }]}>
          {/* use flatlist here :D */}
          <TouchableOpacity style={styles.cardPopular}>
              <View>
                  <Image source={require("../../assets/illustrations/popular1.png")} style={styles.cardPopular_image} />
                  <Text style={styles.cardPopular_qts}>x2</Text>
              </View>
              <View style={styles.wrapperInfos}>
                  <Text style={styles.cardPopular_title}>Red Meat with Rice</Text>
                  <Text style={[styles.cardPopular_status, {backgroundColor : Colors.secondary}]}>Confirming</Text>
                  <Text style={styles.cardPopular_subTitle}>CoolMe</Text>
                  <Text style={styles.cardPopular_adresse}>New york, 15 avenue</Text>
              </View>
              <TouchableOpacity style={styles.btnOrderNow}>
                <Text style={styles.btnOrderNowText}>Order now</Text>
                <AntDesign name="arrowright" size={20} color="black" />
              </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardPopular}>
              <View>
                  <Image source={require("../../assets/illustrations/rice_tomate.png")} style={styles.cardPopular_image} />
                  <Text style={styles.cardPopular_qts}>x1</Text>
              </View>
              <View  style={styles.wrapperInfos}>
                  <Text style={styles.cardPopular_title}>Plate Chicken {"&"} rice</Text>
                  <Text style={styles.cardPopular_status}>Comming</Text>
                  <Text style={styles.cardPopular_subTitle}>El khider</Text>
                  <Text style={styles.cardPopular_adresse}>Sidi Ahmed, Béjaia</Text>
              </View>
              <TouchableOpacity style={styles.btnOrderNow}>
                <Text style={styles.btnOrderNowText}>Order now</Text>
                <AntDesign name="arrowright" size={20} color="black" />
              </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Shop */}
        <View style={[styles.wrapperCardsResto, { display: showSection.shop ? "flex" : "none" }]}>
          {/* card resaurant */}
          <TouchableOpacity style={styles.cardResto}>
              <View style={styles.cardResto_wrapperImage}>
                <Image source={require("../../assets/illustrations/pizza.jpg")} style={styles.cardResto_image}/>
              </View>
              <View style={styles.wrapperRight}>
                <View style={styles.wrapperTitle}>
                  <Text style={styles.wrapperTitle_title} >Little Creatures</Text>
                  <Text style={styles.wrapperTitle_km}>1.5 km</Text>
                </View>
                <View style={styles.wrapperBottom}>
                  <FontAwesome name="map-marker" size={16} color={Colors.grey}  style={{marginRight : 8}}/>
                  <Text style={styles.address}>address of restaurant</Text>
                </View>
                <View  style={styles.wrapperBottom}>
                  <AntDesign name="star" size={16} color="orange" style={{marginRight : 3}}/>
                  <Text style={styles.votes} >4.8 </Text>
                  <Text style={styles.nmbrVotes}>(213 ratings)</Text>
                </View>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardResto}>
              <View style={styles.cardResto_wrapperImage}>
                <Image source={require("../../assets/illustrations/fromage.jpg")} style={styles.cardResto_image}/>
              </View>
              <View style={styles.wrapperRight}>
                <View style={styles.wrapperTitle}>
                  <Text style={styles.wrapperTitle_title} >Little Fromage 👌</Text>
                  <Text style={styles.wrapperTitle_km}>1.1 km</Text>
                </View>
                <View style={styles.wrapperBottom}>
                  <FontAwesome name="map-marker" size={16} color={Colors.grey}  style={{marginRight : 8}}/>
                  <Text style={styles.address}>address of fromagerie</Text>
                </View>
                <View  style={styles.wrapperBottom}>
                  <AntDesign name="star" size={16} color="orange" style={{marginRight : 3}}/>
                  <Text style={styles.votes} >4.5 </Text>
                  <Text style={styles.nmbrVotes}>(21 ratings)</Text>
                </View>
              </View>
          </TouchableOpacity>
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
      paddingHorizontal : 20,
      flexDirection : 'row',
      justifyContent : "center"
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
    cardResto : {
      flexDirection : "row",
      width  : width - 40,
      paddingLeft : 15,
      paddingVertical : 10,
      borderRadius : 8,
      elevation : 5,
      backgroundColor : "white",
      marginTop : 10,
      marginBottom : 10,
      alignSelf : "center",
    },  
    cardResto_wrapperImage : {flex : 0.3, overflow : 'hidden'},
    cardResto_image : {width : 100, height : 100},
    wrapperRight : {flex : 0.7, paddingRight : 10, paddingLeft : 8},
    wrapperTitle : {flexDirection : 'row', justifyContent : "space-between"},
    wrapperTitle_title : {fontFamily : 'Poppins_600SemiBold'},
    wrapperTitle_km : {fontFamily : 'Poppins_400Regular', color : Colors.blue},
    wrapperBottom : {flexDirection : 'row', alignItems : 'center'},
    address : {color : Colors.medium_grey},
    votes : {color : Colors.primary, fontFamily : 'Poppins_400Regular', marginTop : 5},
    nmbrVotes : {fontFamily : "Poppins_300Light", marginTop : 5},
    wrapperCards : {
      // flex : 1
    },
    cardPopular : {
      flexDirection : "row",
      width  : width - 40,
      paddingLeft : 15,
      paddingVertical : 10,
      borderRadius : 8,
      elevation : 5,
      backgroundColor : "white",
      marginTop : 20,
      marginBottom : 15,
      alignSelf : "center",
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
    },
    btnOrderNow : {
      alignSelf: 'flex-end',
      flexDirection : 'row',
      paddingHorizontal : 10,
      paddingVertical : 8,
      backgroundColor : Colors.secondary,
      borderTopLeftRadius : 20,
      borderBottomLeftRadius : 20,
      position : "absolute", 
      bottom : 10, 
      right : 0, 
      width : "50%",
      justifyContent : "space-around"
    },
    btnOrderNowText : {fontFamily : "Poppins_400Regular", marginBottom : -5, color : "black"},
    wrapperInfos : {marginBottom : 45}
});
