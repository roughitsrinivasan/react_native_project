import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View,Image, Dimensions, TextInput } from 'react-native';
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

    const [modalVisible, setModalVisible] = React.useState(false);

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
                    <Image source={require("../assets/illustrations/illustration_forgot.png")} style={{width : 150, height:150}} />
                    <Text style={styles.modal__title}>Your password has been Reset !</Text>
                    <TouchableOpacity
                        style={styles.modal_btn}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            navigation.navigate("SignIn")
                        }}>
                        <Text style={styles.modal_btn_text}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <View style={{flex : 1, justifyContent : "center"}}>
            <View style={[styles.form_group]}>
                <Text style={styles.form_group__label}>New Password</Text>
                <TextInput placeholder="*****************" placeholderTextColor={Colors.grey} style={styles.form_group__input} />
            </View>
            <View style={[styles.form_group]}>
                <Text style={styles.form_group__label}>Confirm New Password</Text>
                <TextInput placeholder="*****************" placeholderTextColor={Colors.grey} style={styles.form_group__input} />
            </View>
        </View>
        <View style={[styles.form_group]}>
            <TouchableOpacity style={styles.btnNext} onPress={() => { setModalVisible(!modalVisible) }}>
                <Text style={styles.btnNext__text}>CHANGE PASSWORD</Text>
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
    form_group : {
        paddingBottom : 10,
        alignSelf : "center", 
        width : width - 60,
        marginBottom : 20,
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
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
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
