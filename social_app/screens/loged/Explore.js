import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,Image, Dimensions, TextInput, ScrollView } from 'react-native';
import Colors from "../../assets/colors/Colors";
import { useRoute } from '@react-navigation/native';



// const { triggerNotificationHandler } = route.params;

import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import Constants from "expo-constants"
import { EvilIcons,FontAwesome, AntDesign } from '@expo/vector-icons';

// import { AuthContext } from "../../src/components/Context";

const {width, height} = Dimensions.get("window");

export default function Explore(props) {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,  
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading Explore...</Text>;
  } 

  return (
    <View style={styles.container}>
  
      <View style={styles.headerStyle}>
        <View style={styles.headerContentStyle}>
        <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "row",marginTop: '-10%'
    }]}>
      <View style={{ flex: 3 }}>
      <Image source={require("../../assets/illustrations/logo.png")} style={styles.logo_image} />
      </View>
      <View style={{ flex: 4 }}>
      <Text style={{ fontSize : 16, fontFamily : "Poppins_600SemiBold", color : Colors.primary, textAlign: 'center'}}>Featurepreneur</Text>
         
      </View>
      <View style={{ flex: 3 }}>
        <TouchableOpacity onPress={() => { props.navigation.navigate("Profile") }}>
        <AntDesign name="user" size={24} style={{color: 'grey', textAlign: 'right', marginRight: '15%'}} />
          </TouchableOpacity>
      </View>
    </View>
        {/* <View style={{ width: Dimensions.get("window").width}}>
       
          
       
          </View> */}
          <View style={{ flexDirection: "row" }}>
            {/* <MaterialIcons
              name="search"
              size={24}
              color={Colors.primaryColor}
              onPress={() => this.props.navigation.navigate("Search")}
            />
            <MaterialIcons
              name="notifications"
              size={24}
              color={Colors.primaryColor}
              style={{ marginLeft: Sizes.fixPadding + 5.0 }}
              onPress={() => this.props.navigation.navigate("Notification")}
            /> */}
          </View>
        </View>
      </View>

        <View style={styles.header}>
            <TouchableOpacity style={styles.wrapperInputSearch} onPress={() => props.navigation.navigate("Search")}>
                <EvilIcons name="search" size={24} color={Colors.grey} />
                <TextInput 
                    placeholder="Search"
                    style={styles.inputSearch}
                    placeholderTextColor={Colors.medium_grey}
                    editable={false}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <AntDesign name="bells" size={24} color={Colors.grey} />
            </TouchableOpacity>
        </View>
        <ScrollView>
            {/* title */}
            <View style={styles.wrapperTitle}>
                <Text style={styles.wrapperTitle__title}>Popular this week</Text>
            </View>
            {/* items popular */}
            <TouchableOpacity onPress={() => { props.navigation.navigate("MlPost") }} style={styles.cardPopular}>
                <View>
                    <Image source={require("../../assets/illustrations/ml.png")} style={styles.cardPopular_image} />
                </View>
                <View>
                    <Text style={styles.cardPopular_title}>Tech Post</Text>
                    <Text style={styles.cardPopular_subTitle}>Learn</Text>
                    {/* <Text style={styles.cardPopular_adresse}>Sidi Ahmed, Béjaia</Text> */}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.navigate("LeaderBoard") }} style={styles.cardPopular}>
                <View>
                    <Text style={styles.cardPopular_title}>Leaderboard</Text>
                    <Text style={styles.cardPopular_subTitle}>Know your score</Text>
                    {/* <Text style={styles.cardPopular_adresse}>Sidi Ahmed, Béjaia</Text> */}
                </View>
                <View style={styles.wrapper_image}>
                    <Image source={require("../../assets/illustrations/leader.png")} style={[styles.cardPopular_image , styles.cardPopular_image__right]} />
                </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.navigate("Random") }} style={styles.cardPopular}>
                <View >
                    <Image source={require("../../assets/illustrations/dart.png")} style={[styles.cardPopular_image]} />
                </View>
                <View>
                    <Text style={styles.cardPopular_title}>Random Challenge</Text>
                    <Text style={styles.cardPopular_subTitle}>Random suprise</Text>
                    {/* <Text style={styles.cardPopular_adresse}>Sidi Ahmed, Béjaia</Text> */}
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { props.navigation.navigate("LA") }} style={styles.cardPopular}>
                <View>
                    <Image source={require("../../assets/illustrations/ml.png")} style={styles.cardPopular_image} />
                </View>
                <View>
                    <Text style={styles.cardPopular_title}>Learning Analytics</Text>
                    <Text style={styles.cardPopular_subTitle}></Text>
                    {/* <Text style={styles.cardPopular_adresse}>Sidi Ahmed, Béjaia</Text> */}
                </View>
            </TouchableOpacity>
            {/* title NEAR YOU*/}
            {/* <View style={styles.wrapperTitle}>
                <Text style={styles.wrapperTitle__title}>Shop Near You</Text>
            </View> */}
            {/* all items near you */}
            {/* <TouchableOpacity onPress={() => { navigation.navigate("DetailResto") }} style={styles.popularItem}>
                <View>
                    <Image source={require("../../assets/illustrations/nearyou1.jpg")}  style={styles.popularItem_image}/>
                </View>
                <View style={styles.cardPopular_wrapperRight}>
                    <Text style={styles.popularItem_title}>O'feelings</Text>
                    <Text style={styles.popularItem_adresse}><FontAwesome name="map-marker" size={16} color={Colors.grey} /> Naceria, Near JUTE</Text>
                    <Text style={styles.popularItem_ratings}><AntDesign name="star" size={13} color="orange" /><Text style={{fontWeight : "bold"}}>4.8</Text> (12 ratings)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popularItem}>
                <View>
                    <Image source={require("../../assets/illustrations/macaroni.jpg")}  style={styles.popularItem_image}/>
                </View>
                <View style={styles.cardPopular_wrapperRight}>
                    <Text style={styles.popularItem_title}>El Khider</Text>
                    <Text style={styles.popularItem_adresse}><FontAwesome name="map-marker" size={16} color={Colors.grey} /> Les D, el virage</Text>
                    <Text style={styles.popularItem_ratings}><AntDesign name="star" size={13} color="orange" /><Text style={{fontWeight : "bold"}}>4.0</Text> (88 ratings)</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.popularItem}>
                <View>
                    <Image source={require("../../assets/illustrations/sushi.jpg")}  style={styles.popularItem_image}/>
                </View>
                <View style={styles.cardPopular_wrapperRight}>
                    <Text style={styles.popularItem_title}>Artista</Text>
                    <Text style={styles.popularItem_adresse}><FontAwesome name="map-marker" size={16} color={Colors.grey} /> University, targa</Text>
                    <Text style={styles.popularItem_ratings}><AntDesign name="star" size={13} color="orange" /><Text style={{fontWeight : "bold"}}>3.5</Text> (85 ratings)</Text>
                </View>
            </TouchableOpacity> */}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop : Constants.statusBarHeight + 10
    },
    header : {
        flexDirection : "row", 
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 20,
        marginBottom: '3%',
        marginTop: '6%'

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
    wrapperTitle : {
        marginVertical : 30
    },
    wrapperTitle__title : {
        textAlign : 'center',
        fontSize : 18,
        fontFamily : "Poppins_600SemiBold",
        color : Colors.primary
    },
    cardPopular : {
        flexDirection : "row",
        // borderWidth : 1,
        width  : width - 40,
        paddingHorizontal : 15,
        paddingVertical : 10,
        borderRadius : 8,
        elevation : 5,
        backgroundColor : "white",
        marginTop : 20,
        marginBottom : 15,
        alignSelf : "center"
    },
    wrapper_image : {
        flex: 1
    },
    cardPopular_image : {
        width : 90, height : 90, marginTop : 0, marginBottom : 15, marginRight : 15
    },
    logo_image : {
        width : 40, height : 40, marginLeft: '15%', marginTop: '-5%'
    },
    cardPopular_image__right : {
        alignSelf : "flex-end"
    },
    cardPopular_title : {
        color : Colors.primary, 
        fontSize : 16,
        fontFamily : "Poppins_600SemiBold",
    },
    cardPopular_subTitle : {
        color : Colors.dark_grey,
        fontSize : 14,
        marginTop : -5,
        fontFamily : "Poppins_400Regular"
    },
    cardPopular_adresse : {
        color : Colors.grey,
        fontSize : 12,
        fontFamily : "Poppins_300Light"
    },
    // popular items design
    popularItem : {
        flexDirection : "row",
        // borderWidth : 1,
        width  : width - 40,
        paddingHorizontal : 15,
        paddingVertical : 10,
        borderRadius : 8,
        elevation : 5,
        backgroundColor : "white",
        marginBottom : 15,
        alignSelf : "center"
    },
    cardPopular_wrapperRight : {
        justifyContent : "flex-start"
    },  
    popularItem_image : {
        width : 100, height : 100, margin : 10, borderRadius : 3
    },
    popularItem_title : {
        color : Colors.primary, 
        fontSize : 17,
        fontFamily : "Poppins_600SemiBold",
        marginTop : 5
    },
    popularItem_adresse : {
        flexDirection : "row",
        color : Colors.grey, 
        fontSize : 15,
        fontFamily : "Poppins_300Light",
        marginTop : -3
    },
    popularItem_ratings : {
        color : Colors.grey,
        opacity : 0.7,
        fontSize : 13,
        fontFamily : "Poppins_300Light",
    },
    headerStyle: {
        height: 60.0,
        // elevation: 5.0,
        backgroundColor: "white",
        paddingHorizontal: 2.0,
        justifyContent: "center",
        // marginBottom: '3%',
    },
    headerContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    },
});
