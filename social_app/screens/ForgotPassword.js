import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions, TextInput } from 'react-native';
import Colors from "../assets/colors/Colors";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { FontAwesome, AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function ForgotPassword({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading ...</Text>;
  } 

  return (
    <View style={styles.container}>
        {/* section one */}
        <View style={styles.wrapper_description}>
            <Text style={styles.description} >Please enter your email address. You will receive a link to create a new password via email.</Text>
        </View>
        <View style={[styles.form_group, {flex : 1}]}>
            <Text style={styles.form_group__label}>Email</Text>
            <TextInput placeholder="contact@foodies.com" placeholderTextColor={Colors.grey} style={styles.form_group__input} />
        </View>
        <View style={[styles.form_group]}>
            <TouchableOpacity style={styles.btnNext} onPress={() => {navigation.navigate("ForgotPassword_update")}}>
                <Text style={styles.btnNext__text}>NEXT</Text>
            </TouchableOpacity>
        </View>
     </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal : 30
    },
    wrapper_description : {
        // marginBottom : 60
    },
    description : {
        color : Colors.grey,
        marginTop : 40
    },
    form_group : {
        paddingBottom : 10,
        alignSelf : "center", 
        width : width - 60,
        marginBottom : 20,
        justifyContent : "center"
    },
    form_group__label : {
        color : Colors.grey,
        fontFamily : "Poppins_400Regular",
        marginBottom : 8
    },
    form_group__input : {
        fontSize : 17,
        fontFamily : "Poppins_400Regular",
        borderBottomWidth : 1,
        borderBottomColor : Colors.light_grey,
        height : 50,
    },
    btnNext: {
        backgroundColor : Colors.secondary,
        paddingVertical : 10,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 42
    },
    btnNext__text : {
        fontSize : 16,
        fontFamily : "Poppins_600SemiBold"
    }
});
