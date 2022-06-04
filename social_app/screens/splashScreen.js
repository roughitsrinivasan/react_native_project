import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions } from 'react-native';

// import { AppLoading } from 'expo-app-loading';
// import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

import { AntDesign } from '@expo/vector-icons';

const {width} = Dimensions.get("window");

export default function Splash({ navigation }) {

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <Text>Chargement ...</Text>;
  } 

  return (
    <View style={styles.container}>
      <View style={styles.sectionOne}>
        <Image 
          source={require("../assets/illustrations/plate.png")}
          style={styles.image}
        />
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.heading}>to</Text>
        <Text style={styles.heading}>F<Text style={styles.heading_white}>o</Text>odies</Text>
      </View>
      <View style={styles.sectionTwo}>
        <TouchableOpacity style={styles.btn_next} onPress={() => { 
            navigation.navigate("OnBoarding") 
          }}>
          <Text style={styles.btn_next__text}>NEXT</Text>
          <AntDesign name="arrowright" size={16} color="black"/>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor : "#fbaf03",
  },
  sectionOne : {
    flex : 0.7,justifyContent: 'flex-end', paddingTop : -150
  },
  sectionTwo : {
    flex: 0.3, alignItems : "flex-end", justifyContent : "flex-end", paddingBottom : 50
  },
  image : {
    position : "absolute", left : -100, width : 400, height : 400, top : -50
  },  
  heading : {
    fontSize : 35,
    // fontWeight : "bold",
    marginLeft : 30,
    fontFamily : "Poppins_700Bold",
    lineHeight : 50
  },
  heading_white : {
    color : "white"
  },
  btn_next : {
    backgroundColor : "white",
    borderTopLeftRadius : 50,
    borderBottomLeftRadius : 50,
    paddingVertical : 8,
    paddingHorizontal : 35,
    alignSelf : "flex-end", 
    flexDirection : "row",
    alignItems : "center", 
    justifyContent : "space-between",
    height : 50,
    width : width / 2
  },
  btn_next__text : {
    fontWeight : "bold",
    marginRight : 10
  }
});
