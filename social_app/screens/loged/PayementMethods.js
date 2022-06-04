import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions, Modal } from 'react-native';
import Colors from "../../assets/colors/Colors";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import Constants from "expo-constants"
import { FontAwesome, Entypo } from '@expo/vector-icons';

const {width, height} = Dimensions.get("window");

export default function PayementMethods({ navigation }) {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [modalVisible, setModalVisible] = React.useState(false);

  if (!fontsLoaded) {
    return <Text>Loading PayementMethods...</Text>;
  } 

  return (
    <View style={styles.container}>
        {/* modal successfully order ! */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                navigation.navigate("SignIn");
            }}
            >
                <View style={styles.blackBg}></View>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image source={require("../../assets/illustrations/checked.png")} style={{width : 150, height:150}} />
                    <Text style={styles.modal__title}>Your order is successfully !</Text>
                    <TouchableOpacity
                        style={styles.modal_btn}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            navigation.navigate("Explore");
                        }}>
                        <Text style={styles.modal_btn_text}>Continue shopping</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <View style={styles.wrapperMethods}>
            {/* Choose card */}
            <TouchableOpacity style={[styles.card, styles.card_active]}>
                <Entypo name="credit-card" size={60} color="white" />
                <Text style={[styles.card_text, {color : "white"}]}>Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
                <FontAwesome name="dollar" size={60} color={Colors.primary} />
                <Text style={[styles.card_text]}>Cash</Text>
            </TouchableOpacity>
        </View>
        {/* visa card information */}
        <TouchableOpacity style={styles.informationCard}>
            <View>
                <Text style={styles.informationCard_title}>VISA **** **** 0134</Text>
                <Text style={styles.informationCard_credit} >$150.00</Text>
            </View>
            <View style={styles.iconCheck}>
                <Entypo name="check" size={24} color="black" />
            </View>
        </TouchableOpacity>
        {/* link choose another card */}
        <TouchableOpacity>
            <Text style={styles.link}>Choose another card</Text>
        </TouchableOpacity>
        {/* button pay now */}
        <TouchableOpacity style={styles.wrapperNext} onPress={() => setModalVisible(true)}>
            <Text style={styles.wrapperNext_text}>PAY NOW</Text>
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
    wrapperMethods : {
        flexDirection : 'row',
        justifyContent : 'space-evenly'
    },  
    card : {
        // backgroundColor : Colors.primary,
        width : width / 2.5,
        height : 130,
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 8,
        elevation : 2,
        backgroundColor : "white"
    },
    card_active : {
        backgroundColor : Colors.primary
    },
    card_text : {
        fontFamily : "Poppins_400Regular",
        marginTop : 10
    },
    informationCard : {
        paddingHorizontal : 30,
        marginTop : 50,
        flexDirection : 'row',
        justifyContent : "space-between"
    },
    informationCard_title : {
        fontFamily : "Poppins_600SemiBold",
        fontSize : 18
    },
    informationCard_credit : {
        color : Colors.grey,
        fontFamily : "Poppins_400Regular"
    },
    iconCheck : {
        alignItems : "center",
        justifyContent : "center"
    },
    link : {
        color : Colors.blue,
        paddingHorizontal : 30,
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
        color : "black",
        fontFamily : 'Poppins_600SemiBold'
    }, 
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    blackBg : {
        position: 'absolute',
        left:  0,
        right : 0,
        bottom : 0,
        top : 0,
        backgroundColor : "rgba(0,0,0,0.7)"
    },
    modal__title : {
      color : Colors.primary, 
      fontSize : 18,
      fontFamily : "Poppins_600SemiBold", 
      textAlign : "center"
    },
    modal_btn : {
      backgroundColor : Colors.secondary,
      borderRadius : 42,
      width : width /2,
      height : 42,
      justifyContent : "center",
      alignItems : "center",
      marginTop : 30
    },
    modal_btn_text : {
        color : Colors.primary,
        fontFamily : "Poppins_600SemiBold",
    }
});
