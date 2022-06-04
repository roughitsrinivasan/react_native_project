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

import Constants from "expo-constants"
import { AntDesign,FontAwesome, Entypo  } from '@expo/vector-icons';
import DisplayCard from './DisplayCard';
const {width, height} = Dimensions.get("window");




export default function ({ navigation }) {
    const route = useRoute();
const { index } = route.params;
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

//   useEffect(()=>{
//     const fetchData = async () => {
//         const response = await fetch(`http://18.118.172.175:8372/api/get/house/details/${index}`);
//         const newData = await response.json(["result"]["result"]);
//         console.log(newData)
//       };
//       fetchData();
//       })

  if (!fontsLoaded) {
    return <Text>Loading DetailPlate...</Text>;
  } 

 const title="Sleeping Beauty"
let context='Call a friend saying that you need to tell them something very important but you forgot what it was about. Send recording of the call as proof..'
context='Call your favourite staff in the middle of the night for clearing a silly doubt that you could have searched in the net. Send recording of the call as proof.'
  context='Sleep for 16 hours straight without any intervention.'


  const Instruction=['          1. A random challenge is to be taken in good spirit.','          2. Each challenge has a stipulated time.','          3. Challenges are categorised as:','            4. Proof is a must for every Challenge you complete.',' 5. The proof is to be sent to to your respective PJs (Peer Judge) ','6. Refrain from using politics and religion in your challenge',
  ' 7. For every successful task, you will be awarded Tact coins.',' 8. These credits can be used for courses or can be converted to Tact coins during other events. ']



return (
      <SafeAreaView style={styles.AndroidSafeArea}>
 
        <ScrollView style={styles.container}>
        {/* header && background image */}
                <View style={{zIndex:-3,marginBottom:30}}>
                    <Image source={require("../../assets/illustrations/bg.jpeg")} style={{width : Dimensions.get("window").width, height : 300}} />
                </View>
                    <View style={styles.sectionOne}>
                                            <Text style={styles.sectionOne_title}>{title}</Text>
                                            {/* <View style={styles.sectionOne_wrapperAdresse}> */}
                                            <Text style={styles.sectionOne_wrapperAdresse}> {context}</Text>
                                            {/* </View> */}
                                            <View style={{height:30,backgroundColor:Colors.light_grey,padding:5,borderTopLeftRadius:25,borderTopRightRadius:25,width:width,marginTop:30,marginBottom:-50}}/>


                     </View>
        
            {/* </View>  */}
            {/* second section // stats */}
            {/* <View style={styles.sectionTwo}>
                <View style={styles.deviderTitle}>
                </View>
            </View> */}
            {/* second section // stats */}
            
            {/* <View style={styles.container}> */}
            {/* onPress={() => { navigation.navigate("DetailResto") }} */}
            <View style={styles.container}>
                    <Card containerStyle={{borderRadius:9}}>
                        <TouchableOpacity onPress={() => { navigation.navigate("RandomSingleAccepted") }} >
                                                <View style={styles.backgroundImage}>
                                                        <Image source={require("../../assets/illustrations/Challenge-Accepted-PNG-HD.png")} style={{width : Dimensions.get("window").width, height : 300,marginRight:70}} />
                                                </View>
                                                <View style={styles.midElement}>
                                                        <Text style={{color : "black", fontSize : 18, fontFamily : "Poppins_600SemiBold", marginBottom : -5,paddingBottom:5,marginEnd:50}}>People engaged          :      {30}</Text>
                                                        <Text style={{color : "black", fontSize : 18, fontFamily : "Poppins_600SemiBold", marginBottom : -5,paddingBottom:5,marginEnd:50}}>People Completed      :      {40}</Text>
                                                </View>
                        </TouchableOpacity> 
                    </Card>   
                                                       
                </View>
                {/* <DisplayCard title={"Instruction"} Instruction={Instruction}></DisplayCard> */}
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
 

        <View style={styles.sectionThree}>
                    
        </View>
    </ScrollView>
    </SafeAreaView>
    );
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
          alignItems:"center",
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

});


 
                        {/* <TouchableOpacity onPress={() => { if(amount > 0) { setAmount(parseInt(amount-1)) } }}>
                            <AntDesign name="minuscircleo" size={24} color={Colors.primary} />
                        </TouchableOpacity> */}
                        {/* <TextInput 
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
                        /> */}
                        {/* <TouchableOpacity onPress={() => { if(amount < 99) { setAmount(parseInt(amount+1)) } }}>
                            <AntDesign name="pluscircleo" size={24} color={Colors.primary} />
                        </TouchableOpacity> */}
            {/* </View>  */}
               
            {/* Extra Topping */}
        
            {/* select extra topping */}
            {/* <View style={styles.wrapperTopping}>
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
            </View> */} 
            {/* Choose Sauce */}
           
       
             {/* <View style={styles.wrapperTopping}>
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
            </View> */}
            {/* buy button */}
            {/* <View style={styles.wrapperBuy}>
                <Text style={styles.wrapperBuy_price}>$28.00</Text>
                <TouchableOpacity style={styles.wrapperBuy_btn} onPress={() => {navigation.navigate("Address")}}>
                    <Text style={styles.wrapperBuy_btnText}>PAY NOW</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                </TouchableOpacity>
            </View> */}
        {/* </View> */}
            {/* <TouchableOpacity onPress={() => { navigation.navigate("DetailResto") }} style={styles.popularItem}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.popularItem_adresse}>
DALL·E Mini - Generate images from a text prompt
                 



GitHub https://lnkd.in/g-p_Qti
Live Demo https://lnkd.in/gzpv94E
Report https://lnkd.in/gqfRk-q</Text>
                        <Text style={styles.popularItem_adresse}><FontAwesome name="map-marker" size={16} color={Colors.grey} /> Naceria, Near JUTE</Text>
                        <Text style={styles.popularItem_ratings}><AntDesign name="star" size={13} color="orange" /><Text style={{fontWeight : "bold"}}>4.8</Text> (12 ratings)</Text>
                    </View>
                    </View>
                </TouchableOpacity> */}

                {/* <TouchableOpacity onPress={() => { navigation.navigate("DetailResto") }} style={styles.popularItem}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.popularItem_adresse}>Paper: SingleStore - A Distributed Database Management System. It's really more than a #database </Text>
                        <Text style={styles.popularItem_adresse}><FontAwesome name="map-marker" size={16} color={Colors.grey} /> Naceria, Near JUTE</Text>
                        <Text style={styles.popularItem_ratings}><AntDesign name="star" size={13} color="orange" /><Text style={{fontWeight : "bold"}}>4.8</Text> (12 ratings)</Text>
                    </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("DetailResto") }} style={styles.popularItem}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.popularItem_adresse}>Paper: SingleStore - A Distributed Database Management System. It's really more than a #database </Text>
                        <Text style={styles.popularItem_adresse}><FontAwesome name="map-marker" size={16} color={Colors.grey} /> Naceria, Near JUTE</Text>
                        <Text style={styles.popularItem_ratings}><AntDesign name="star" size={13} color="orange" /><Text style={{fontWeight : "bold"}}>4.8</Text> (12 ratings)</Text>
                    </View>
                    </View>
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={[styles.sectionThree_element, styles.sectionThree_element__active]}>
                    <Text style={styles.sectionThree_element__text}>Small</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sectionThree_element]}>
                    <Text style={styles.sectionThree_element__text}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.sectionThree_element]}>
                    <Text style={styles.sectionThree_element__text}>Large</Text>
                </TouchableOpacity> */}
     
            {/* choose amount */}
            {/* <View style={styles.sectionTwo}>
                    <View style={styles.deviderTitle}>
                        <Text style={styles.deviderTitle_text}>Choose Amount</Text>
                    </View>
                </View> */}
                {/* <View style={styles.sectionTwo}> */}

                {/* <TouchableOpacity onPress={() => { navigation.navigate("DetailResto") }} style={styles.popularItem}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.popularItem_adresse}>#SingleStore is ANSI SQL-Compatible and natively supports structured semi-structured, and unstructured (full-text search) data.

✔️ Code Generation:
- Uses an LLVM industrial Compiler for low-level optimizations
- Hot code paths
- Generates a C++ based just-in-time execution plan

Each SingleStore node has its own plans and plan cache. A plan cache consists of two layers: the in-memory plan cache and the on-disk plan cache. </Text>
                        <Text style={styles.popularItem_adresse}><FontAwesome name="map-marker" size={16} color={Colors.grey} /> Naceria, Near JUTE</Text>
                        <Text style={styles.popularItem_ratings}><AntDesign name="star" size={13} color="orange" /><Text style={{fontWeight : "bold"}}>4.8</Text> (12 ratings)</Text>
                    </View>
                    </View>
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => { navigation.navigate("DetailResto") }} style={styles.popularItem}>
                <View style={styles.card}>
                    <View>
                        <Text style={styles.popularItem_adresse}>By interpreting SQL statements and implementing compiled query
plans, SingleStore removes interpretation overhead and minimizes code execution paths & the compiled plans do not pre-specify values
for the parameters.
</Text>
                        <Text style={styles.popularItem_adresse}><FontAwesome name="map-marker" size={16} color={Colors.grey} /> Naceria, Near JUTE</Text>
                        <Text style={styles.popularItem_ratings}><AntDesign name="star" size={13} color="orange" /><Text style={{fontWeight : "bold"}}>4.8</Text> (12 ratings)</Text>
                    </View>
                    </View>
                </TouchableOpacity> */}
            