import React , {useEffect,useState} from 'react';
import { useRoute } from '@react-navigation/native';

import { ImageBackground, StyleSheet, Text, TouchableOpacity, View,Image, Dimensions, TextInput, ScrollView,SafeAreaView , Platform, StatusBar,FlatList} from 'react-native';
import Colors from "../../assets/colors/Colors";
import {  Card } from 'react-native-elements';


import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';


const {width} = Dimensions.get("window");



export default DisplayCard= ({title,Instruction}) => {
    // const route = useRoute();
    //const { index } = route.params;
      let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
      if (!fontsLoaded) {
        return <Text>Loading DetailPlate...</Text>;
      } 

  return (
        <View>
                <View style={styles.shadowProp}>
                {/* <View style={styles.sectionThree}></View> */}
                        <Card containerStyle={{borderRadius:9,height:450,backgroundColor:"white",paddingBottom:20,marginBottom:10}} >
                            {/* <Card.Title title> */}
                                <Text style={{color:"white",backgroundColor:"#0684ec",borderRadius:8,padding:9,textAlign:"center",fontSize:18,marginBottom:15,paddingTop:15,marginTop:10}}> {title}</Text>
                                {/* </Card.Title> */}
                                {/* <Card.Divider></Card.Divider> */}
                                {/* <FlatList
                                    data={Instruction}
                                    renderItem={({item,id} )=><Text key={id} style={{flexDirection:"column",justifyContent:"center",alignItems:"center",padding:4.5,color:"black",fontFamily:"Poppins_400Regular",fontSize:13}}>{item.trim()}</Text> }
                                /> */}
                                {
                                    Instruction.map((item,id)=>(
                                        <Text key={id} style={{flexDirection:"column",justifyContent:"center",alignItems:"center",padding:4.5,color:"black",fontFamily:"Poppins_400Regular",fontSize:13}}>{item.trim()}</Text>
                                    ))
                                }
                    </Card> 
                </View>
        </View>     
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light_grey,
    },
    bolder : {
        fontFamily : "Poppins_600SemiBold", color : Colors.primary
    },  
    backgroundImage : {
        width,
        height : 400,
        resizeMode : "cover",
        // backgroundColor : Colors.blue,
        justifyContent : "center",
        alignItems : "center"
    },
    sectionOne : {
        // backgroundColor : "white",
        // borderWidth : 1,
        marginTop : -200,
        borderTopLeftRadius : 25,
        borderTopRightRadius : 25,
        justifyContent : "center",
        alignItems : "center",
        paddingTop : 20,
        paddingBottom : 45,
    },
    sectionOne_title : {color : "white", fontSize : 20, fontFamily : "Poppins_600SemiBold", marginBottom : -5},
    sectionOne_wrapperAdresse : {flexDirection : "row", alignItems: 'center',paddingRight:30,paddingLeft:30,paddingTop:8,color:"white"},
    sectionOne_adresse : {color : "white",backgroundColor:"transparent", fontSize : 14, fontFamily : "Poppins_400Regular",marginBottom : -5, alignSelf : "center", width : width - 150, textAlign : "center", marginTop : 10,padding:3 },
    sectionOne_wrapperTimers : {flexDirection : "row",justifyContent : 'space-between', width: width - 180, marginTop : 8},
    sectionOne_delivery : {backgroundColor : Colors.blue, borderRadius : 3, color : "white", paddingHorizontal : 8, fontFamily : "Poppins_400Regular", marginBottom : -5},
    sectionOne_time: {color : Colors.primary, fontFamily : "Poppins_400Regular", marginBottom : -5},
    sectionOne_long: {color : Colors.primary, fontFamily : "Poppins_400Regular", marginBottom : -5},
    sectionTwo : {
        backgroundColor : Colors.light_grey,
        justifyContent : "center",
        alignItems : "center",
        // paddingTop : 10,
        paddingBottom : 15,
        marginTop : 15
        // borderWidth : 1
    },
    deviderTitle : {
        flexDirection : "row",justifyContent : 'space-around', width
    },
    deviderTitle_text : {
        fontSize : 13,
        color : Colors.dark_grey,
        fontFamily : "Poppins_600SemiBold"
    },
    sectionThree : {
        flexDirection : "row",
        justifyContent : "space-evenly",
        paddingVertical : 25
    },
    sectionThree_element : {
        backgroundColor : Colors.medium_grey,
        paddingHorizontal : 8,
        paddingVertical : 5,
        borderRadius : 20,
        width : 100,
        height : 40,
        justifyContent : "center",
        alignItems : "center"
    },
    sectionThree_element__active : {
        backgroundColor : Colors.primary,
    },  
    sectionThree_element__text : {
        color : "white"
    },
    wrapperAmount : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
        paddingVertical: 15,
        width : 100,
        alignSelf : "center",
        paddingTop : 25
    },
    amountInput : { 
        textAlign : "center",
        fontSize : 18,
        fontFamily : "Poppins_400Regular",
        marginBottom : -5,
        maxWidth : 25,
    },
    wrapperTopping : {
        paddingVertical : 15
    }, 
    topping : {
        flexDirection : 'row',
        justifyContent : "center",
        paddingHorizontal : 30,
        paddingVertical : 10,width:width
    },
    topping_text : {
        fontFamily : "Poppins_400Regular",
        color:"black"
    },
    wrapperBuy : {
        flexDirection : 'row',
        justifyContent : "space-between",
        paddingLeft: 30,
        paddingVertical : 25,
        alignItems : 'center'
    },
    wrapperBuy_price : {
        color : Colors.primary,
        fontFamily : "Poppins_600SemiBold",
        fontSize : 18,
    },
    wrapperBuy_btn : {
        backgroundColor : Colors.secondary,
        paddingHorizontal : 30,
        borderTopLeftRadius : 42,
        borderBottomLeftRadius : 42,
        height : 42,
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : "space-between",
        width : 200
    },
    wrapperBuy_btnText : {
        fontFamily : "Poppins_600SemiBold",
        marginBottom : -5
    },
    featuredPropertyContentStyle: {
        marginHorizontal: 2.0,
        elevation: 3.0,
        backgroundColor: 'white',
        // borderRadius: Sizes.fixPadding,
        marginBottom: 5.0,
    },
    card : {
        width: 80,
        textAlign: 'center',
        justifyContent: 'center',
        elevation: 5.0,
        marginBottom: '5%',
        marginTop: '5%',

    },
    cardPopular_wrapperRight : {
        justifyContent : "flex-start"
    }, 
    popularItem_title : {
        color : Colors.primary, 
        fontSize : 17,
        fontFamily : "Poppins_600SemiBold",
        marginTop : 5,
        textAlign : 'center', 
    },
    popularItem_adresse : {
        flexDirection : "row",
        color : Colors.grey, 
        fontSize : 15,
        fontFamily : "Poppins_300Light",
        marginTop : -3,
        // textAlign : 'center', 
    },
    popularItem_ratings : {
        color : Colors.grey,
        opacity : 0.7,
        fontSize : 13,
        fontFamily : "Poppins_300Light",
        // textAlign : 'center', 
    },
    popularItem_image : {
        width : 100, height : 100, margin : 10, borderRadius : 3
    },
    popularItem : {
        flexDirection : "row",
        // borderWidth : 1,
        color:"black",
        width  : width ,
        // paddingHorizontal : 15,
        // paddingVertical : 10,
        borderRadius : 8,
        elevation : 5,
        backgroundColor : "white",
        marginBottom : 15,
        alignSelf : "center",
        justifyContent:"center"
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
      midElement:{
          flex:1,
          flexDirection:"column",
          width:width,
          marginTop:"-7%",
          paddingBottom:4,
          justifyContent:"center",
          alignItems:"center"
      },shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        maxHeight:300,
        minHeight:0,
        marginBottom:130,
        paddingBottom:30,
        marginTop:40
      },
      listItem:{flexDirection:"column",justifyContent:"center",alignItems:"center",padding:5,color:"black",fontFamily:"Poppins_400Regular",fontSize:13},
      cardContainer:{borderRadius:9,height:450,backgroundColor:"white",paddingBottom:20,marginBottom:10}
      

});
