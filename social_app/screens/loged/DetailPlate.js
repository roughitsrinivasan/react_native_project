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

export default function DetailPlate({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [amount, setAmount] = React.useState(0);

  if (!fontsLoaded) {
    return <Text>Loading DetailPlate...</Text>;
  } 

  return (
      <View>
        {/* <FontAwesome name="share" size={24} color="#2a2a2a"  style={{ elevation : 100, position : "absolute", top : Constants.statusBarHeight + 15, right : 20 }}/> */}
        {/* <Entypo name="dots-three-vertical" size={24} color="#2a2a2a" style={{ elevation : 100, position : "absolute", top : Constants.statusBarHeight + 15, right : 20 }} /> */}
        <TouchableOpacity style={{ elevation : 100, position : "absolute", top : Constants.statusBarHeight + 15, right : 20 }}>
            <AntDesign name="hearto" size={24} color="black" color="#2a2a2a" />
        </TouchableOpacity>
        <ScrollView style={styles.container}>
        {/* header && background image */}
        <View style={styles.backgroundImage}>
            <Image source={require("../../assets/illustrations/rice_tomate.png")} style={{width : 250, height : 250}} />
        </View>
        {/* detail article */}
        <View>
            {/* first section */}
            <View style={styles.sectionOne}>
                <Text style={styles.sectionOne_title}>Grilled Beefsteak</Text>
                <View style={styles.sectionOne_wrapperAdresse}>
                    <Text style={styles.sectionOne_adresse}> Enjoy this plate, lorem ipsum lorem ipsum lorem ipsum </Text>
                </View>
            </View>
            {/* second section // stats */}
            <View style={styles.sectionTwo}>
                <View style={styles.deviderTitle}>
                    <Text style={styles.deviderTitle_text}>Choose Size</Text>
                </View>
            </View>
            {/* second section // stats */}
            <View style={styles.sectionThree}>
                <TouchableOpacity style={[styles.sectionThree_element, styles.sectionThree_element__active]}>
                    <Text style={styles.sectionThree_element__text}>Small</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sectionThree_element]}>
                    <Text style={styles.sectionThree_element__text}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sectionThree_element]}>
                    <Text style={styles.sectionThree_element__text}>Large</Text>
                </TouchableOpacity>
            </View>
            {/* choose amount */}
            <View style={styles.sectionTwo}>
                <View style={styles.deviderTitle}>
                    <Text style={styles.deviderTitle_text}>Choose Amount</Text>
                </View>
            </View>
            <View style={styles.wrapperAmount}>
                <TouchableOpacity onPress={() => { if(amount > 0) { setAmount(parseInt(amount-1)) } }}>
                    <AntDesign name="minuscircleo" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <TextInput 
                    placeholder="0"
                    style={styles.amountInput}
                    value={amount.toString()}
                    keyboardType="number-pad"
                    onChangeText={(value) => {
                        if(value >= 0 && value <= 99) {
                            setAmount(value);
                        }else{
                            setAmount(0);
                        }
                    }}
                />
                <TouchableOpacity onPress={() => { if(amount < 99) { setAmount(parseInt(amount+1)) } }}>
                    <AntDesign name="pluscircleo" size={24} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            {/* Extra Topping */}
            <View style={styles.sectionTwo}>
                <View style={styles.deviderTitle}>
                    <Text style={styles.deviderTitle_text}>Extra topping</Text>
                </View>
            </View>
            {/* select extra topping */}
            <View style={styles.wrapperTopping}>
                <TouchableOpacity style={styles.topping}>
                    <Text style={styles.topping_text}>Cheese</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topping}>
                    <Text style={[styles.topping_text, { fontFamily : "Poppins_700Bold" }]}>Strawberry</Text>
                    <AntDesign name="check" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.topping}>
                    <Text style={styles.topping_text}>Cherry</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topping}>
                    <Text style={styles.topping_text}>Beef</Text>
                </TouchableOpacity>
            </View>
            {/* Choose Sauce */}
            <View style={styles.sectionTwo}>
                <View style={styles.deviderTitle}>
                    <Text style={styles.deviderTitle_text}>Choose Sauce</Text>
                </View>
            </View>
            <View style={styles.wrapperTopping}>
                <TouchableOpacity style={styles.topping}>
                    <Text style={styles.topping_text}>Sweet sauce</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topping}>
                    <Text style={[styles.topping_text, { fontFamily : "Poppins_700Bold" }]}>Hot sauce</Text>
                    <AntDesign name="check" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.topping}>
                    <Text style={styles.topping_text}>Salsa sauce</Text>
                </TouchableOpacity>
            </View>
            {/* buy button */}
            <View style={styles.wrapperBuy}>
                <Text style={styles.wrapperBuy_price}>$28.00</Text>
                <TouchableOpacity style={styles.wrapperBuy_btn} onPress={() => {navigation.navigate("Address")}}>
                    <Text style={styles.wrapperBuy_btnText}>PAY NOW</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    bolder : {
        fontFamily : "Poppins_600SemiBold", color : Colors.primary
    },  
    backgroundImage : {
        width,
        height : 400,
        resizeMode : "cover",
        backgroundColor : Colors.secondary,
        justifyContent : "center",
        alignItems : "center"
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
    sectionOne_title : {color : Colors.primary, fontSize : 20, fontFamily : "Poppins_600SemiBold", marginBottom : -5},
    sectionOne_wrapperAdresse : {flexDirection : "row", alignItems: 'center',},
    sectionOne_adresse : {color : Colors.grey, fontSize : 14, fontFamily : "Poppins_400Regular",marginBottom : -5, alignSelf : "center", width : width - 150, textAlign : "center", marginTop : 8 },
    sectionOne_wrapperTimers : {flexDirection : "row",justifyContent : 'space-between', width: width - 180, marginTop : 8},
    sectionOne_delivery : {backgroundColor : Colors.blue, borderRadius : 3, color : "white", paddingHorizontal : 8, fontFamily : "Poppins_400Regular", marginBottom : -5},
    sectionOne_time: {color : Colors.primary, fontFamily : "Poppins_400Regular", marginBottom : -5},
    sectionOne_long: {color : Colors.primary, fontFamily : "Poppins_400Regular", marginBottom : -5},
    sectionTwo : {
        backgroundColor : Colors.light_grey,
        justifyContent : "center",
        alignItems : "center",
        paddingTop : 10,
        paddingBottom : 10,
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
        justifyContent : "space-between",
        paddingHorizontal : 30,
        paddingVertical : 10
    },
    topping_text : {
        fontFamily : "Poppins_400Regular"
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
    }
});
