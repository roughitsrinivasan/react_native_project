import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View,Image, Dimensions, TextInput, ScrollView } from 'react-native';
import Colors from "../../assets/colors/Colors";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import Constants from "expo-constants"
import { AntDesign,FontAwesome, Entypo  } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function DetailResto({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading DetailResto...</Text>;
  } 

  return (
      <View>
        {/* <FontAwesome name="share" size={24} color="#2a2a2a"  style={{ elevation : 100, position : "absolute", top : Constants.statusBarHeight + 15, right : 20 }}/> */}
        <Entypo name="dots-three-vertical" size={24} color="#2a2a2a" style={{ elevation : 100, position : "absolute", top : Constants.statusBarHeight + 15, right : 20 }} />
        <ScrollView style={styles.container}>
        {/* header && background image */}
        <ImageBackground source={require("../../assets/illustrations/pizza.jpg")} style={styles.backgroundImage}></ImageBackground>
        {/* detail article */}
        <View>
            {/* first section */}
            <View style={styles.sectionOne}>
                <Text style={styles.sectionOne_title}>O'feeling</Text>
                <View style={styles.sectionOne_wrapperAdresse}>
                    <FontAwesome name="map-marker" size={16} color={Colors.grey} style={{marginRight: 5}} />
                    <Text style={styles.sectionOne_adresse}>L'adresse juste ici...</Text>
                </View>
                <View style={styles.sectionOne_wrapperTimers}>
                    <Text style={styles.sectionOne_delivery}>Free delivery</Text>
                    <Text style={styles.sectionOne_time}>33 min</Text>
                    <Text style={styles.sectionOne_long}>27 km</Text>
                </View>
            </View>
            {/* second section // stats */}
            <View style={styles.sectionTwo}>
                <View style={styles.sectionTwo_wrapperStats}>
                    <Text style={styles.sectionTwo_ratings}><Text style={[styles.bolder]}>4,2</Text> {"\n"}Ratings</Text>
                    <Text style={styles.sectionTwo_bookmark}><Text style={[styles.bolder]}>120k</Text> {"\n"}Bookmark</Text>
                    <Text style={styles.sectionTwo_photo}><Text style={[styles.bolder]}>126</Text> {"\n"}Photos</Text>
                </View>
            </View>
            {/* description */}
            <View style={styles.wrapperDescription}>
                <Text style={styles.description}>Lorem ipsum dolor sit lorem Lorem ipsum dolor sit lorem Lorem ipsum dolor sit lorem</Text>
            </View>
            {/* photos */}
            <View style={styles.photos}>
                <Text style={styles.photos_title}>Photos</Text>
                <View style={styles.photos_images}>
                    <Image source={require("../../assets/illustrations/fromage.jpg")} style={styles.photos_preview}/>
                    <Image source={require("../../assets/illustrations/salade.jpg")} style={styles.photos_preview}/>
                    <Image source={require("../../assets/illustrations/hamburger.jpg")} style={styles.photos_preview}/>
                </View>
            </View>
            {/* Reviews */}
            <View style={styles.review}>
                <Text style={styles.review_title}>Reviews</Text>
                {/* list of reviews */}
                <View style={styles.cards}>
                    <View style={styles.cards_top}>
                        <View style={styles.cards_top__image}>
                            <Image source={{uri : "https://i.pravatar.cc/151"}} style={styles.avatar}/>
                            <View>
                                <Text style={styles.cards_top__title}>Gomez</Text>
                                <Text style={styles.cards_top__ago}>3 days ago</Text>
                            </View>
                        </View>
                        {/* stars */}
                        <View style={styles.cards_top__notes}>
                            <AntDesign name="star" size={18} color="orange" />                        
                            <AntDesign name="star" size={18} color="orange" />                        
                            <AntDesign name="star" size={18} color="orange" />                        
                            <AntDesign name="star" size={18} color="orange" />                        
                            <AntDesign name="star" size={18} color="orange" />                        
                        </View>
                    </View>
                    <View >
                        <Text style={styles.cardsBottom_description}>It's amazing, good design {'\n'}and love the services.</Text>                      
                    </View>
                </View>
                <View style={styles.cards}>
                    <View style={styles.cards_top}>
                        <View style={styles.cards_top__image}>
                            <Image source={{uri : "https://i.pravatar.cc/150"}} style={styles.avatar}/>
                            <View>
                                <Text style={styles.cards_top__title}>Mahrez</Text>
                                <Text style={styles.cards_top__ago}>1 days ago</Text>
                            </View>
                        </View>
                        {/* stars */}
                        <View style={styles.cards_top__notes}>
                            <AntDesign name="star" size={18} color="orange" />                        
                            <AntDesign name="star" size={18} color="orange" />                        
                            <AntDesign name="star" size={18} color="orange" />                        
                            <AntDesign name="star" size={18} color="orange" />                        
                            <AntDesign name="star" size={18} color={Colors.grey} />                        
                        </View>
                    </View>
                    <View >
                        <Text style={styles.cardsBottom_description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,</Text>                      
                    </View>
                </View>
            </View>
            {/* see all reviews */}
            <TouchableOpacity style={styles.wrapperAllReview}>
                <Text style={{color : Colors.blue, fontFamily : 'Poppins_600SemiBold'}}>See all 50 Reviews</Text>
                <AntDesign name="right" size={18} color={Colors.blue} />
            </TouchableOpacity>
        </View>
    </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    bolder : {
        fontFamily : "Poppins_600SemiBold", color : Colors.primary
    },  
    backgroundImage : {
        width,
        height : 450,
        resizeMode : "cover"
    },
    sectionOne : {
        backgroundColor : "white",
        // borderWidth : 1,
        marginTop : -50,
        borderTopLeftRadius : 25,
        borderTopRightRadius : 25,
        justifyContent : "center",
        alignItems : "center",
        paddingTop : 20,
        paddingBottom : 15,
    },
    sectionOne_title : {color : Colors.primary, fontSize : 25, fontFamily : "Poppins_600SemiBold", marginBottom : -5},
    sectionOne_wrapperAdresse : {flexDirection : "row", alignItems: 'center',},
    sectionOne_adresse : {color : Colors.grey, fontSize : 14, fontFamily : "Poppins_400Regular",marginBottom : -5 },
    sectionOne_wrapperTimers : {flexDirection : "row",justifyContent : 'space-between', width: width - 180, marginTop : 8},
    sectionOne_delivery : {backgroundColor : Colors.blue, borderRadius : 3, color : "white", paddingHorizontal : 8, fontFamily : "Poppins_400Regular", marginBottom : -5},
    sectionOne_time: {color : Colors.primary, fontFamily : "Poppins_400Regular", marginBottom : -5},
    sectionOne_long: {color : Colors.primary, fontFamily : "Poppins_400Regular", marginBottom : -5},
    sectionTwo : {
        backgroundColor : Colors.light_grey,
        justifyContent : "center",
        alignItems : "center",
        paddingTop : 20,
        paddingBottom : 20,
        marginTop : 15
        // borderWidth : 1
    },
    sectionTwo_wrapperStats : {
        flexDirection : "row",justifyContent : 'space-around', width
    },
    sectionTwo_ratings : {
        fontSize : 13,
        color : Colors.dark_grey,
    },
    sectionTwo_bookmark : {
        fontSize : 13,
        color : Colors.dark_grey,
    },
    sectionTwo_photo : {
        fontSize : 13,
        color : Colors.dark_grey,
    },
    wrapperDescription : {
        // borderWidth : 1,
        paddingHorizontal : 50,
        paddingTop : 30,
    },
    description : {
        color : Colors.grey,
        fontSize : 17,
        textAlign : 'center',
        lineHeight : 23
    },
    photos : {
        // borderWidth : 1,
        alignItems : 'center',
        justifyContent : 'space-around', 
        marginTop : 20,
    },
    photos_title : {
        color : Colors.primary,fontSize : 18, fontFamily : "Poppins_600SemiBold", marginBottom : 20, marginTop : 15
    },
    review_title : {
        paddingVertical : 10,
        textAlign : 'center',width,backgroundColor : Colors.light_grey, color:Colors.primary,fontSize : 12, fontFamily : "Poppins_600SemiBold", marginTop : 15
    },
    photos_images : {
        flexDirection : "row",
        justifyContent :'space-evenly', 
        width
    },
    photos_preview : {
        width : 115, height : 115, borderRadius : 5 
    },
    review: {
        // marginTop : 20,
        // height : 500
    },
    cards : {
        borderBottomWidth : 1,
        borderBottomColor : "#ededed",
        paddingHorizontal : 20,
        paddingVertical : 20
    },
    cards_top : {
        // borderWidth : 1,
        flexDirection : "row",
        justifyContent : "space-between", 
        alignItems : "center",
        marginBottom : 15
    },
    cards_top__image : {
        flexDirection : "row"
    },
    cards_top__notes : {
        flexDirection : "row",
    },
    cards_top__title : {
        color : Colors.primary, fontSize : 15, fontFamily : "Poppins_600SemiBold", marginBottom : -5
    },
    cards_top__ago : {
        color : Colors.grey, fontSize : 10, fontFamily : "Poppins_400Regular", marginBottom : -5
    },
    avatar : {width : 50, height : 50, borderRadius : 50, marginRight : 8},
    cardsBottom_description : {
        color : Colors.dark_grey,
        fontFamily : "Poppins_400Regular"
    },
    wrapperAllReview : { flexDirection : 'row', justifyContent : "space-between", paddingHorizontal : 20, paddingVertical : 8}
});
