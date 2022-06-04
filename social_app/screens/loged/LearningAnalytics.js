import React , {useEffect,useState} from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View,Image, Dimensions, TextInput, ScrollView ,StatusBar,SafeAreaView} from 'react-native';
import Colors from "../../assets/colors/Colors";
import HeatMap from 'react-native-heatmap-chart';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign,FontAwesome, Entypo  } from '@expo/vector-icons';


import {
    useFonts,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  } from '@expo-google-fonts/poppins';
  
import Constants from "expo-constants"
  
const {width, height} = Dimensions.get("window");


const LearningAnalytics = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
      });
      
      let values=[]
      for(let i=0;i<80;i++){
          values[i]=i;
      }
      for(let i=0;i<20;i++){
        values[i]=0;
    }
      

    //   let heatSignColors=['#7fc4f8', '#36A3F4', '#0303B6']
    let heatSignColors=['#87cefa','#36A3F4'  , '#0303B6']
      //0303B6
      //7fc4f8
      let Days=["M","W","F"]
    //   let topic='Scala Custom Exception - javatpoint',author='ponshriharini'
      let info=[{
            topic:'Scala File Handling - javatpoint',
            author:'ponshriharini'
      },{
        topic:'Split in Python: An Overview of Split() Function [Updated] ',
        author:'Saaisri'
      }];




  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
        <ScrollView>
                <View style={[{zIndex:-3,marginBottom:30},styles.backgroundImage]}>
                    <Image source={require("../../assets/illustrations/assessment.png")} style={{width : Dimensions.get("window").width, height : 300}} />
                </View>
                {/* assets/illustrations/assessment.png */}
                    <View style={styles.sectionOne}>
                                            <Text style={styles.sectionOne_title}>LearningAnalytics</Text>
                                            {/* <View style={styles.sectionOne_wrapperAdresse}> */}
                                            {/* <Text style={styles.sectionOne_wrapperAdresse}> {context}</Text> */}
                                            {/* </View> */}


                     </View>
                    
                <View style={[styles.header]}>
                    {/* <TouchableOpacity style={styles.wrapperInputSearch} onPress={() => navigation.navigate("Search")}>
                        <EvilIcons name="search" size={24} color={Colors.grey} />
                    <TextInput 
                            placeholder="Search"
                            style={styles.inputSearch}
                            placeholderTextColor={Colors.medium_grey}
                            editable={false}
                            />
                    </TouchableOpacity> */}

                    <View style={{margin:40,flexDirection:"row",justifyContent:"space-evenly"}}>
                      <View style={{flex :1}}>
                      {
                        //    ['M','T','W','T','F','S','S'].map((item,id)=>(<Text key={id}> {item} </Text>))
                       }
                      </View>
                    <HeatMap values={values} onBlockPress={(click)=>console.log("clicked")} blocksSize={35.5} blocksStyle={styles.heatBlock} colors={heatSignColors}/>
                    </View>

                            {/* add depiction for heatmap */}


                    


                    <View >
                        <View>
                        <TouchableOpacity style={{width:width,paddingEnd:25}}>
                                <Text style={[styles.popularItem,{textAlign:"center",fontFamily:"Poppins_600SemiBold",color:Colors.blue}]}>Contriubutors LeaderBoard</Text>
                        </TouchableOpacity>
                        </View>
                    <View style={styles.relativeContainer}> 
                            <View style={styles.relativeSubContainer}>
                            <View style={{margin:10}}>
                                <Text style={[styles.popularItem,{borderRadius:3,fontFamily:"Poppins_600SemiBold",textAlign:"center",color:Colors.fb}]}>Recently Added Links</Text>
                            </View>
                            {
                              info.map((item,id)=>(
                                //   {let topic=item.topic,author=item.author}
                                <View style={[styles.popularItem,{flexDirection:"column"}]}key={id}>
                                <TouchableOpacity>
                                <View style={{margin:10}}>
                                    {
                                        console.log(item.topic)
                                    }
                                      <Text style={{color:"black",fontFamily:"Poppins_400Regular"}}>{item.topic}</Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                <View style={{margin:10}}>
                                      <Text style={{color:"black",fontFamily:"Poppins_400Regular",color:Colors.fb,textTransform:"capitalize"}}>{item.author}</Text>
                                  </View>
                                </TouchableOpacity>
                            </View>
  ))
                            }
                            </View>
                    </View>
                    </View>

                </View>
                
        </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin:20,
    },
    bolder : {
        fontFamily : "Poppins_600SemiBold", color : Colors.primary
    },  
    backgroundImage : {
        width,
        height : 400,
        resizeMode : "cover",
        backgroundColor : Colors.blue,
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
    },    inputSearch : {
        marginLeft : 15,
        fontSize : 14,
        color : Colors.primary,
        fontFamily : "Poppins_400Regular",
        textAlignVertical: 'center',
        // borderWidth : 1,,
        padding:10,
        width : "90%", 
        height : "100%",
        lineHeight : 12
    },
    sectionOne_title : {color : Colors.primary, fontSize : 24, fontFamily : "Poppins_600SemiBold", marginBottom : -15},
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
    },    wrapperInputSearch : {
        borderWidth : 1,
        borderColor : Colors.medium_grey,
        borderRadius : 42,
        height : 45,
        paddingHorizontal : 20,
        flexDirection : 'row',
        alignItems : 'center',
        flex : 0.95, 
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
    },
    featuredPropertyContentStyle: {
        marginHorizontal: 2.0,
        elevation: 3.0,
        backgroundColor: 'white',
        // borderRadius: Sizes.fixPadding,
        marginBottom: 5.0,
    },
    card : {
        width: width,
        textAlign: 'center',
        justifyContent: 'center',
        elevation: 5.0,
        marginBottom: '5%',
        marginTop: '5%',
        height:50,
       

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
        width  : width - 40,
        paddingHorizontal : 15,
        paddingVertical : 20,
        borderRadius : 8,
        elevation : 5,
        backgroundColor : "white",
        marginBottom : 15,
        alignSelf : "center"
    },
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: StatusBar.currentHeight ,
      },
      header:{
          flex:1,
          marginTop:50,
          padding:10, 
          width:width,
          flexDirection:"column",
          justifyContent:"space-between"
      },
      heatBlock:{
          borderRadius:20,
      },
      radiusPat1:{
        borderBottomStartRadius:20,
        borderTopStartRadius:20,
      },
      relativeContainer:{
          flex:1,
          width:width,
          justifyContent:"center",
          marginTop:10,
          marginBottom:10,
          paddingEnd:28
      },
      relativeSubContainer:{
        flex:1,
        width:width,
        justifyContent:"center",
        marginTop:10,
        marginBottom:10,
        marginStart:-10,
        backgroundColor:Colors.light_grey,
        paddingTop:20
      }
});


export default LearningAnalytics