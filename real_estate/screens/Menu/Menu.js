import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";
import { SwipeListView } from 'react-native-swipe-list-view';
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

const shortListData = [
    {
        key: '1',
        properyImage: require('../../assets/images/house/house_1.jpg'),
        propertyName: 'Sky View House',
        propertyAddress: 'Opera Street, New York',
        propertyAmount: '360000',
        isFavourit: false,

    },
    {
        key: '2',
        properyImage: require('../../assets/images/house/house_2.jpg'),
        propertyName: 'Vraj House',
        propertyAddress: 'Yogi Street, New York',
        propertyAmount: '920000',
        isFavourit: false,
    },
    {
        key: '3',
        properyImage: require('../../assets/images/house/house_1.jpg'),
        propertyName: 'Sky View House',
        propertyAddress: 'Opera Street, New York',
        propertyAmount: '360000',
        isFavourit: false,
    },
    {
        key: '4',
        properyImage: require('../../assets/images/house/house_2.jpg'),
        propertyName: 'Vraj House',
        propertyAddress: 'Yogi Street, New York',
        propertyAmount: '920000',
        isFavourit: false,
    },
    {
        key: '5',
        properyImage: require('../../assets/images/house/house_1.jpg'),
        propertyName: 'Sky View House',
        propertyAddress: 'Opera Street, New York',
        propertyAmount: '360000',
        isFavourit: false,
    },
    {
        key: '6',
        properyImage: require('../../assets/images/house/house_2.jpg'),
        propertyName: 'Vraj House',
        propertyAddress: 'Yogi Street, New York',
        propertyAmount: '920000',
        isFavourit: false,
    },
   
];

const { width } = Dimensions.get('screen');

class Menu extends Component {
    state = {
       data:[]
    };
   
    /*
    
     */
   
   

    render() {
        return (
            <View style={{ flex: 1,paddingTop:0,paddingBottom:20, }}>
                {this.header()}
            </View>
        )
    }

    header() {
        return (
            <View style={styles.headerStyle}>
                <Text style={{ color:Colors.blackColor,paddingLeft:20,fontSize:20,fontWeight:"300" }}>Menu</Text>
            </View>
        )
    }

}




const styles = StyleSheet.create({
    headerStyle: {
        height: 60.0,
        elevation: 2.0,
        backgroundColor: Colors.whiteColor,
        // alignItems: 'center',
        justifyContent: 'center'
    },
    featuredPropertyContentStyle: {
        marginHorizontal: Sizes.fixPadding ,
        elevation: 3.5,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0,
        flexDirection:"row",
        padding:6
    },
    featuredPropertyImageStyle: {
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        borderBottomLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
        width: '100%',
        height: 220.0,
        marginLeft:10,
        marginTop:5
    },
    featuredPropertyInfoContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    featuredPropertyAmountContentStyle: {
        borderWidth: 1.0,
        alignItems: 'center',
        height: 30.0,
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding-10,
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(128, 128, 128, 0.5)',
    },
    snackBarStyle: {
        position: 'absolute',
        bottom: 50.0,
        left: -10.0,
        right: -10.0,
        backgroundColor: '#333333',
    },
    backDeleteContinerStyle: {
        alignItems: 'center',
        bottom: 15,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 90,
        backgroundColor: 'red',
        right: 0,
    },
})

export default withNavigation(Menu);