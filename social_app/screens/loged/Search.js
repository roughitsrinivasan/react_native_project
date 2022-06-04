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
import { EvilIcons, AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function Search({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading Search...</Text>;
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
            <TouchableOpacity>
                <AntDesign name="bells" size={24} color={Colors.grey} />
            </TouchableOpacity>
        </View>
        {/* recent research */}
        <View style={styles.deviderTitle}>
            <Text style={styles.title}>Recent Search</Text>
        </View>
        {/* research */}
        <View style={styles.wrapperResearch}>
            <TouchableOpacity style={styles.search}>
                <Text style={styles.searchTitle}>Restaurant CHIC</Text>
                <Text style={styles.searchSubTitle}>22 Naruto land.</Text>
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
            <Text style={styles.clearText}>Clear Recent</Text>
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
        paddingHorizontal : 20,
        paddingTop : 25
    },
    search : {
        // borderWidth : 1,
        paddingVertical : 8
    },
    searchTitle : {
        fontFamily : "Poppins_600SemiBold",
        fontSize : 15
    },
    searchSubTitle : {
        color : Colors.grey
    },
    wrapperClear : {
        paddingHorizontal : 20,
        marginTop : 30
    },  
    clearText : {
        color : Colors.secondary,
        textDecorationLine : "underline",
        textDecorationColor : Colors.secondary
    }
});
