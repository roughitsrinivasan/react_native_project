import React, { Component } from 'react';
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
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';


const {width, height} = Dimensions.get("window");

export default class LeaderBoard extends Component {
//   let [fontsLoaded] = useFonts({
//     Poppins_400Regular,
//     Poppins_600SemiBold,
//     Poppins_700Bold,
//   });

//   const [amount, setAmount] = React.useState(0);

  constructor(props) {
    super(props);
    const {params} = this.props;
    this.state = {
        tableHead: ['Rank', 'Team Name', 'Score'],
        tableData: [
            ['North York', '137', '1221'],
            ['Scarborough', '165', '1641'],
            ['Toronto', '161', '1975'],
            ['Etobicoke', '79', '1019']
          ],

        tableDataCentral: [],
      }
      this.fetchReportsData();
}

async fetchReportsData(){
    fetch(`http://18.118.172.175:8372/api/get/investment/ratio/reports`)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if (json.error_code == 0) {
        let result = json.result;
        // let tempEast = [], tempWest = [], tempNorth = [], tempCentral = [], tempOther = [];
        let tempArray, temp, data1;
        tempArray = []
        for (data1 of result["GTA-Central"]) {
             temp = []
             temp.push(data1.city)
             temp.push(data1.rents_after_sold)
             temp.push(data1.sold)
             temp.push(data1.rental_ratio)
             tempArray.push(temp)
        }
        console.log(tempArray);
        this.setState({tableDataCentral: tempArray})

      }
    });

}

//   if (!fontsLoaded) {
//     return <Text>Loading DetailPlate...</Text>;
//   } 

  
  render() {
    const state = this.state;
  return (
      <View>
        {/* <FontAwesome name="share" size={24} color="#2a2a2a"  style={{ elevation : 100, position : "absolute", top : Constants.statusBarHeight + 15, right : 20 }}/> */}
        {/* <Entypo name="dots-three-vertical" size={24} color="#2a2a2a" style={{ elevation : 100, position : "absolute", top : Constants.statusBarHeight + 15, right : 20 }} /> */}
        <TouchableOpacity style={{ elevation : 100, position : "absolute", top : Constants.statusBarHeight + 15, right : 20 }}>
            <AntDesign name="hearto" size={24} color="black"/>
        </TouchableOpacity>
        <ScrollView style={styles.container}>
        {/* header && background image */}
        <View style={styles.backgroundImage}>
            <Image source={require("../../assets/illustrations/lead.jpg")} style={{width : Dimensions.get("window").width, height : 400}} />
        </View>
        {/* detail article */}
        <View>
            {/* first section */}
            <View style={styles.sectionOne}>
                <Text style={styles.sectionOne_title}>Leaderboard</Text>
                <View style={styles.sectionOne_wrapperAdresse}>
                    <Text style={styles.sectionOne_adresse}> Get to know about your scores </Text>
                </View>
            </View>
            {/* second section // stats */}
            {/* <View style={styles.sectionTwo}>
                <View style={styles.deviderTitle}>
                    <Text style={styles.deviderTitle_text}>Choose Size</Text>
                </View>
            </View> */}
            {/* second section // stats */}
            {/* Table */}
            <View >
            <Row data={this.state.tableHead} style={styles.head} textStyle={{ textAlign: 'left', color: 'white', marginLeft: '9%' }}/>
            <Table borderStyle={{borderColor: 'transparent', }}>
              
              {
                state.tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={styles.row}>
                    {
                      rowData.map((cellData, cellIndex) => (
                        <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                      ))
                    }
                  </TableWrapper>
                ))
              }
            </Table>
          </View>
          {/* Table End */}
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
            </View> */}
            {/* Extra Topping */}
            {/* <View style={styles.sectionTwo}>
                <View style={styles.deviderTitle}>
                    <Text style={styles.deviderTitle_text}>Extra topping</Text>
                </View>
            </View> */}
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
            {/* <View style={styles.sectionTwo}>
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
            </View> */}
            {/* buy button */}
            {/* <View style={styles.wrapperBuy}>
                <Text style={styles.wrapperBuy_price}>$28.00</Text>
                <TouchableOpacity style={styles.wrapperBuy_btn} onPress={() => {navigation.navigate("Address")}}>
                    <Text style={styles.wrapperBuy_btnText}>PAY NOW</Text>
                    <AntDesign name="arrowright" size={24} color="black" />
                </TouchableOpacity>
            </View> */}
        </View>
    </ScrollView>
    </View>
    );
    }
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
        backgroundColor : 'whitesmoke',
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
    },
    featuredPropertyContentStyle: {
        marginHorizontal: 2.0,
        elevation: 3.0,
        backgroundColor: 'white',
        // borderRadius: Sizes.fixPadding,
        marginBottom: 5.0,
    },
    card : {
        width: "100%",
        textAlign: 'center',
        justifyContent: 'center',
        elevation: 5.0,
        marginBottom: '5%',
        marginTop: '5%'

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
        textAlign : 'center', 
    },
    popularItem_ratings : {
        color : Colors.grey,
        opacity : 0.7,
        fontSize : 13,
        fontFamily : "Poppins_300Light",
        textAlign : 'center', 
    },
    popularItem_image : {
        width : 100, height : 100, margin : 10, borderRadius : 3
    },
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
    head: { height: 60, backgroundColor: '#055791' },
    text: { textAlign: 'left', marginTop: '10%', marginBottom: '10%', marginLeft: '9%'},
    row: { flexDirection: 'row', backgroundColor: 'white' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }

});
