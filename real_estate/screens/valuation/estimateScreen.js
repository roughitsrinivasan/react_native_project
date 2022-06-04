import React, { Component, Fragment } from "react";
import { Text, SafeAreaView, View, StatusBar, StyleSheet, Image, BackHandler, ScrollView, TouchableOpacity, Button } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-elements';
import { TransitionPresets } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';
import SearchableDropdown from 'react-native-searchable-dropdown';

var items = [
//   {
//     id: 1,
//     name: 'JavaScript',
//   },
//   {
//     id: 2,
//     name: 'Java',
//   },
//   {
//     id: 3,
//     name: 'Ruby',
//   },
//   {
//     id: 4,
//     name: 'React Native',
//   },
//   {
//     id: 5,
//     name: 'PHP',
//   },
//   {
//     id: 6,
//     name: 'Python',
//   },
//   {
//     id: 7,
//     name: 'Go',
//   },
//   {
//     id: 8,
//     name: 'Swift',
//   },
];


class EstimateScreen extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
        this.fetchAllHouseData();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    matchString = (arr, str) => arr.map(e => e.address.toLowerCase().search(str.toLowerCase()) !== -1)

    async fetchAllHouseData() {
        fetch(`http://18.118.172.175:8372/api/get/hn/house/10`)
        .then(res => res.json())
        .then(json => {
            var houseAddressData = []
            if (json.result.result) {
                for (const house of json.result.result) {
                    items.push(
                        {
                            "name" : house.address,
                            "id": house.house_id,
                            "sqft": "2400",
                            "propertyTax": "10%",
                            "bathrooms": house.room_details.bathroom,
                            "bedrooms": house.room_details.bedroom,
                            "rooms": house.room_details.rooms,
                            "price": house.price,
                            "community": house.community
                        }
                    );
                }
            }
            // console.log( "houseAddressData" ,houseAddressData);
            this.setState({ data: items } )
        })
    }

    searchAddress(input) {
        var matchingAdresses = this.matchString(data, input)
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedAddress : '',

        }
    }


    render() { 
        const {onChange} = this.props;

        return ( 
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <View style={styles.container}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor16SemiBold }}>
                        Please enter your property address
                    </Text>
                    <Fragment> 
           {/* Multi */}
           {this.state.selectedAddress ? 
                       <SearchableDropdown
                    {...console.log("calling searchable dropdown", this.state.selectedAddress)}
                    
                    onItemSelect={(item) => {
                        console.log(item);
                        this.setState({"selectedAddress" : item})
                        console.log("state changed");
                    }}
                
                    itemStyle={{
                        padding: 10,
                        // marginTop: 2,
                        backgroundColor: 'White',
                        // borderColor: '#bbb',
                        // borderWidth: 1,
                        // borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    
                    items={items}
                    // defaultIndex={}
                    chip={true}
                    resetValue={false}
                    textInputProps={
                    {
                        placeholder: "Property Address",
                        value: this.state.selectedAddress.name,
                        underlineColorAndroid: "transparent",
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ccc', 
                            borderRadius: 5,
                        },
                        onTextChange: text => { 
                            // console.log("text change!!!!!!");
                            // console.log(text)
                            this.setState({"selectedAddress" : ''})
                        
                        }
                    }
                    }
                    listProps={
                    {
                        nestedScrollEnabled: true,
                    }
                    }
            />
                    :
                        <SearchableDropdown
                    {...console.log("calling searchable dropdown", this.state.selectedAddress)}
                    
                    onItemSelect={(item) => {
                        console.log(item);
                        this.setState({"selectedAddress" : item})
                        console.log("state changed");
                    }}
                
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: 'White',
                        // borderColor: '#bbb',
                        // borderWidth: 1,
                        // borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    
                    items={items}
                    // defaultIndex={}
                    chip={true}
                    resetValue={false}
                    textInputProps={
                    {
                        placeholder: "Property Address",
                        underlineColorAndroid: "transparent",
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ccc', 
                            borderRadius: 5,
                        },
                        onTextChange: text => { 
                            // console.log("text change!!!!!!");
                            // console.log(text)
                            // this.setState({"typedAddress" : text})
                        }
                    }
                    }
                    listProps={
                    {
                        nestedScrollEnabled: true,
                    }
                    }
            />

           }
          
      </Fragment>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                    >
                        {/* {this.TextField()} */}
                        {this.propertyText()}
                        {this.property()}
                        {this.property1()}
                        {this.property2()}
                        
                        
                    </ScrollView>
                    {this.continueButton()}
                    </View>
                </View>
            </SafeAreaView>

            
         );
    }

    header() {
        return (
            <View style={styles.headerStyle}>
                <View style={styles.headerContentStyle}>
                    <Text style={{ ...Fonts.primaryColor18Bold }}>Housilon</Text>
                    <View style={{ flexDirection: 'column' }}>

                    </View>
                </View>
                <View>
                    
                </View>
            </View>

        )
    }


    propertyText() {
        return (
            <View style={{
                flexDirection: "row",
            }}>
                
                <View style={{ flex: 3 }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold,marginLeft: '5%' }}>
                            Square Footage
                    </Text>
                    <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    value={this.state.selectedAddress ? this.state.selectedAddress.sqft : null}
                    placeholder="Sqrt"
                    keyboardType="numeric"
                    
                />
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold,marginLeft: '5%' }}>
                            Property Tax     
                    </Text>
                    <TextInput
                    style={styles.input}
                    // onChangeText={onChangeNumber}
                    value={this.state.selectedAddress ? this.state.selectedAddress.propertyTax : null}
                    placeholder="Per year"
                    keyboardType="numeric"
                />
                </View>
                    
                </View>
        )
    }

    property() {
        return (
            <View>
                <Text style={{ ...Fonts.blackColor18SemiBold }}>
                            Property Type{'\n'}    
                    </Text>
            <View style={{
                flexDirection: "row",
            }}>
                
                <View style={{ flex: 1 }}>
                <View style={[{ width: 100 }]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Detached"  
                        color="#3270fc"  
                    />  
                </View>
                </View>
                <View style={{ flex: 1 }}>
                <View style={[{ width: 130, marginLeft: '-42%'}]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Semi-detached"  
                        color="#3270fc"  
                    /> 
                </View> 
                </View>
                    
                </View> 
                </View> 
        )

    }

    property1() {
        return (
            <View style={{
                flexDirection: "row",
            }}>
                
                <View style={{ flex: 1 }}>
                <View style={[{ width: 120,marginTop: '5%' }]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Condo Apt"  
                        color="#3270fc"  
                    />  
                </View>
                </View>
                <View style={{ flex: 1 }}>
                <View style={[{ width: 160, marginLeft: '-32%',marginTop: '5%'}]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Condo Townhouse"  
                        color="#3270fc"  
                    /> 
                </View> 
                </View>  
                </View>  
        )

    }

    property2() {
        return (
            <View style={{
                flexDirection: "row",
            }}>
                
                <View style={{ flex: 1 }}>
                <View style={[{ width: 180,marginTop: '2.5%' }]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Freehold Townhouse"  
                        color="#3270fc"  
                    />  
                </View>
                </View>
                
                    
                </View>   
        )

    }

    continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.props.navigation.navigate('Estimatevalue', {data : this.state.selectedAddress} )
                }}
            >
            
                <LinearGradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={['#3270fc', '#3270fc', '#3270fc',]}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Medium }}>
                        Get Estimate
                    </Text>
                </LinearGradient>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        height: 60.0,
        elevation: 5.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textFieldContentStyle: {
        // alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        // height: 40.0,
        // paddingHorizontal: Sizes.fixPadding * 2.0,
        // backgroundColor: "rgba(128, 128, 128, 0.8)",
        // borderRadius: Sizes.fixPadding * 2.0,
        // marginBottom: Sizes.fixPadding * 0.5,
        marginTop: '2%'
    },
    container: {
        flex: 1,
        padding: 15,
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding + 10.0,
        height: 56.0,
        marginBottom: Sizes.fixPadding * 0.5,

    },
    input: {
        height: 20,
        margin: 9,
        borderWidth: 1.2,
        padding: 10,
        borderRadius: Sizes.fixPadding * 0.5,
        backgroundColor: 'white',
        borderColor: 'rgba(128, 128, 128, 0.8)",',
      },
    
})

EstimateScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(EstimateScreen); 


