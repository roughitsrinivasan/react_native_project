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
import { EvilIcons, FontAwesome } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function Address({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading Address...</Text>;
  } 

  return (
    <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.wrapperInputSearch}>
                <EvilIcons name="search" size={24} color={Colors.grey} />
                <TextInput 
                    placeholder="Search"
                    style={styles.inputSearch}
                    placeholderTextColor={Colors.medium_grey}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert("Activate localisation here !!")}>
                <FontAwesome name="map-marker" size={24} color={Colors.medium_grey} />
            </TouchableOpacity>
        </View>
        {/* recent research */}
        <View style={styles.deviderTitle}>
            <Text style={styles.title}>Recent Positions</Text>
        </View>
        {/* research */}
        <View style={styles.wrapperResearch}>
            <TouchableOpacity style={[styles.search, { backgroundColor : Colors.secondary }]}>
                <Text style={styles.searchTitle}>Sidi ahmed</Text>
                <Text style={styles.searchSubTitle}>béjaia city 0600.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.search}>
                <Text style={styles.searchTitle}>El Chico</Text>
                <Text style={styles.searchSubTitle}>24 Sasuke island.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.search}>
                <Text style={styles.searchTitle}>El Gringo</Text>
                <Text style={styles.searchSubTitle}>24 Itachi Place.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.search}>
                <Text style={styles.searchTitle}>La casa del papel</Text>
                <Text style={styles.searchSubTitle}>16 avenue spain.</Text>
            </TouchableOpacity>
        </View>
        {/* clear button */}
        <TouchableOpacity style={styles.wrapperClear}>
            <Text style={styles.clearText}>Clear Recent positions</Text>
        </TouchableOpacity>
        {/* button NEXT */}
        <TouchableOpacity style={styles.wrapperNext} onPress={() => navigation.navigate("PayementMethods")}>
            <Text style={styles.wrapperNext_text}>Validate Address</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop : Constants.statusBarHeight
    },
    header : {
        flexDirection : "row", 
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 20,
        paddingBottom : 30, 
        // borderWidth : 1
    },  
    wrapperInputSearch : {
        borderWidth : 1,
        borderColor : Colors.medium_grey,
        borderRadius : 42,
        height : 45,
        paddingHorizontal : 20,
        flexDirection : 'row',
        alignItems : 'center',
        flex : 0.95, 
    },  
    inputSearch : {
        marginLeft : 5,
        fontSize : 18,
        color : Colors.primary,
        fontFamily : "Poppins_400Regular",
        textAlignVertical: 'center',
        // borderWidth : 1,
        width : "90%", 
        height : "100%",
        lineHeight : 18
    },
    deviderTitle : {
        backgroundColor : Colors.light_grey,
        paddingVertical : 15,
        alignItems : 'center'
    },
    title : {
        fontFamily : "Poppins_400Regular",
        fontSize : 13
    },
    wrapperResearch : {
        // borderWidth : 1,
        // paddingHorizontal : 20,
        paddingTop : 25
    },
    search : {
        // borderWidth : 1,
        paddingHorizontal : 20,
        paddingVertical : 8
    },
    searchTitle : {
        fontFamily : "Poppins_600SemiBold",
        fontSize : 15
    },
    searchSubTitle : {
        color : Colors.primary
    },
    wrapperClear : {
        paddingHorizontal : 20,
        marginTop : 30
    },  
    wrapperNext : {
        backgroundColor : Colors.secondary,
        width : width - 100,
        alignSelf : 'center',
        borderRadius : 42,
        height : 42,
        alignItems : "center",
        justifyContent : "center",
        position : "absolute",
        bottom : 50
    },  
    wrapperNext_text : {
        color : "white"
    },  
    clearText : {
        color : Colors.secondary,
        textDecorationLine : "underline",
        textDecorationColor : Colors.secondary
    }
});
