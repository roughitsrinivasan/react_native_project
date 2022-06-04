import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions } from 'react-native';
import Colors from "../assets/colors/Colors";
import { LinearGradient } from 'expo-linear-gradient';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function OnBoarding({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading ...</Text>;
  } 

  return (
    <View style={styles.container}>
      <LinearGradient
        // Button Linear Gradient
        colors={['transparent','transparent','transparent','transparent', '#ffffffdb','white']}
        style={styles.sectionOne}>
          <Image 
            source={require("../assets/illustrations/illustration_plate_coulant.jpg")}
            resizeMode="contain"
            style={styles.image}
            />
      </LinearGradient>
      <LinearGradient
        // Button Linear Gradient
        colors={['transparent','white']}
        style={{flex :0.3}}>
          <View>
            <Text style={styles.title}>Order food</Text>
            <Text style={styles.title}>faster {"&"} easier</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</Text>
          </View>
          <View style={styles.wrapper_button}>
            <TouchableOpacity style={styles.btn_next} onPress={() => { navigation.navigate("SignIn") }}>
                <Text style={styles.btn_next__text}>START</Text>
                <AntDesign name="arrowright" size={16} color="black"/>
              </TouchableOpacity>
          </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent : "center",
    alignItems : "center",
  },
  title : {fontFamily : "Poppins_700Bold",textAlign : "center", fontSize : 22, color : Colors.primary},
  description : {fontFamily: "Poppins_400Regular",alignSelf : "center", textAlign : "center", fontSize : 12,width : width / 1.5, marginTop : 8, lineHeight : 20},
  wrapper_button : {flex : 0.1, alignItems : "flex-end", width,marginTop : 25},
  sectionOne : { flex : 0.7,overflow : "hidden"},
  btn_next : {
    backgroundColor : Colors.secondary,
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
    // fontWeight : "bold",
    marginRight : 10,
    fontFamily : "Poppins_700Bold"
  },
  image : {height : "100%", width, zIndex : -1}
});
