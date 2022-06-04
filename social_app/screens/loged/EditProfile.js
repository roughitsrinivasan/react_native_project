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
import { FontAwesome } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function Favorite({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading Favorite...</Text>;
  } 

  return (
    <View style={styles.container}>
        {/* card */}
        <View style={styles.card}>
            {/* avatar user */}
            <Image 
                source={{uri : `https://i.pravatar.cc/200`}}
                style={styles.card_avatar}
            />
            {/* update image button */}
            <TouchableOpacity onPress={() => { alert("Use ImageGallery HERE !!") }} style={styles.card_editImage}>
                <FontAwesome name="camera" size={18} color="white" style={{  alignSelf : "center"}} />
            </TouchableOpacity>
            {/* form */}
            <View style={styles.cardForm}>
                <Text style={styles.cardForm_label}>Username</Text>
                <TextInput 
                    placeholder="Your username"
                    value="Bens Yans"
                    style={styles.card_input}
                />
            </View>
            <View style={styles.cardForm}>
                <Text style={styles.cardForm_label}>Email</Text>
                <TextInput 
                    placeholder="Your username"
                    value="contact@server.com"
                    style={styles.card_input}
                />
            </View>
            <View style={styles.cardForm}>
                <Text style={styles.cardForm_label}>Phone</Text>
                <TextInput 
                    placeholder="Your username"
                    value="+213 781 00 00 00"
                    style={styles.card_input}
                />
            </View>
            <View style={styles.cardForm}>
                <Text style={styles.cardForm_label}>Gender</Text>
                <TextInput 
                    placeholder="Your username"
                    value="Female"
                    style={styles.card_input}
                />
            </View>
            <View style={[styles.cardForm, {borderBottomWidth : 0}]}>
                <Text style={styles.cardForm_label}>Date of birth</Text>
                <TextInput 
                    placeholder="Your username"
                    value="05/03/1993"
                    style={styles.card_input}
                />
            </View>
        </View>
        <TouchableOpacity style={styles.updateBtn}>
            <Text style={styles.updateBtn_text}>Update now</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop : Constants.statusBarHeight + 10,
    },
    card : {paddingHorizontal : 15, marginHorizontal : 20, marginTop : 150/2, borderRadius : 8, elevation : 10, backgroundColor : "white"},
    card_avatar : {width : 150, height : 150, borderRadius : 150, borderWidth : 4, borderColor : "white", alignSelf : "center", marginTop : -150 / 2},
    card_editImage : {marginBottom : 35,width : 35, height : 35,borderRadius : 30, backgroundColor : Colors.primary, alignSelf : "center", marginLeft : 150 / 2, marginTop : -35, justifyContent : "center", alignItems : "center"},
    cardForm : {borderBottomWidth : 1,borderBottomColor : Colors.medium_grey,paddingVertical :20,flexDirection : 'row', justifyContent : "space-between", alignItems : "center"},
    cardForm_label : {color : Colors.medium_grey},
    card_input : {flex : 1,textAlign : "right", fontFamily : "Poppins_600SemiBold"},
    updateBtn : {
        width : width - 40,
        height : 50, 
        borderRadius : 50/2, 
        alignSelf : "center",
        position : "absolute",
        bottom : 40,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : Colors.secondary
    },
    updateBtn_text : {
        color : "white", 
        fontFamily : "Poppins_400Regular"
    }
});
