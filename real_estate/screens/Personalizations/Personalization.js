import React, { Component, Fragment } from "react";
import {
  Text,
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Image,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  Button,
  Slider,
  ActivityIndicator
} from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { BottomSheet } from "react-native-elements";
import { TransitionPresets } from "react-navigation-stack";
import { LinearGradient } from "expo-linear-gradient";
import SearchableDropdown from "react-native-searchable-dropdown";
import { Dimensions } from "react-native";
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import { Row } from "react-native-table-component";

import MultiSlider from "@ptomasroos/react-native-multi-slider";

// var items = [
//   //   {
//   //     id: 1,
//   //     name: 'JavaScript',
//   //   },
//   //   {
//   //     id: 2,
//   //     name: 'Java',
//   //   },
//   //   {
//   //     id: 3,
//   //     name: 'Ruby',
//   //   },
//   //   {
//   //     id: 4,
//   //     name: 'React Native',
//   //   },
//   //   {
//   //     id: 5,
//   //     name: 'PHP',
//   //   },
//   //   {
//   //     id: 6,
//   //     name: 'Python',
//   //   },
//   //   {
//   //     id: 7,
//   //     name: 'Go',
//   //   },
//   //   {
//   //     id: 8,
//   //     name: 'Swift',
//   //   },
// ];
const PropTypes = [
  { value: "Detached" },
  { value: "Semi-Detached" },
  { value: "Condo Townhouse" },
  { value: "Condo Apt" },
];
// const Region = [
//  add the required values
//   { value: "Detached" },
//   { value: "Semi-Detached" },
//   { value: "Condo Townhouse" },
//   { value: "Condo Apt" },
// ];

var width = Dimensions.get("window").width;

class Personalization extends Component {
  
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
    this.setState({
      animating:false
    })

    // this.fetchAllHouseData();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButton.bind(this)
    );
  }

  handleBackButton = () => {
    this.props.navigation.pop();
    return true;
  };

  // matchString = (arr, str) =>
  //   arr.map((e) => e.address.toLowerCase().search(str.toLowerCase()) !== -1);



  // searchAddress(input) {
  //   var matchingAdresses = this.matchString(data, input);
  // }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedAddress: "",
      minPrice: "0",
      maxPrice: "4500000",
      selectedPropTypes: [],
      array: [],
      btnText:"Set Preference",
      animating:false
    };
  }
   post() {
  
    this.props.navigation.navigate("PersonalizedList", {
      requestData:{
        minPrice:this.state.minPrice,
        maxPrice:this.state.maxPrice,
      }
    });
    
  }


  form(){
    return(
      <View style={styles.container}>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.blackColor16SemiBold,
                textAlign: "center",
                textTransform: "capitalize",
                backgroundColor:"whitesmoke",
                borderRadius:4,
                padding:10
              }}
            >
              Enter Your Preferences
            </Text>
           
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: Sizes.fixPadding * 2.0,
              }}
            >
              {this.slider()}
              {this.property()}
            </ScrollView>
            {this.continueButton()}
           
                 
          </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
        <View style={{ flex: 1 }}>
          {this.header()}
         
          {this.form()}          
        </View>
      </SafeAreaView>
    );
  }
  _groupButtonOnSelectedValuesChange(selectedValues) {
    this.setState({ selectedPropTypes: selectedValues });
    // console.log("Selected Prop Types ",this.state.selectedPropTypes)
  }

  header() {
    return (
      <View style={styles.headerStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={{ ...Fonts.primaryColor18Bold }}>House Market Search</Text>
          
        </View>
        <View></View>
      </View>
    );
  }

  slider() {
    return (
      <View style={styles.container}>
        {/* <Text style = {{fontSize: 20}}>Slider Value = { this.state.SliderValue }</Text> */}
        
        <View>
          <View>
            <Text
              style={{
                ...Fonts.blackColor14SemiBold,
                marginTop: Sizes.fixPadding,
                paddingTop: "2%",
                paddingBottom: "6%",
                paddingLeft: "-5%",
              }}
            >
              PRICE RANGE
            </Text>
          </View>
        
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              ...Fonts.blackColor18Bold,
              marginTop: Sizes.fixPadding,
            }}
          >
           {this.state.minPrice}
          </Text>
          <Text
            style={{
              ...Fonts.blackColor18Bold,
              marginTop: Sizes.fixPadding,
            }}
          >
            {this.state.maxPrice}
          </Text>
        </View>
         
          
        <MultiSlider
          markerStyle={{
            backgroundCOlor:"#3270fc",
          }}
          pressedMarkerStyle={{
            backgroundCOlor:"#3270fc"

          }}
          
          selectedStyle={{
            backgroundColor: "#3270fc",
          }}
          trackStyle={{
            backgroundColor: "#CECECE",
          }}
          touchDimensions={{
            height: 40,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40,
          }}
          values={[0, 4500000]}
          sliderLength={width/1.2}
          onValuesChange={(values) => {
            this.setState({
              minPrice: values[0],
              maxPrice: values[1],
            });
            
          }}
          min={0}
          max={4500000}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
        />
       
      </View>
    );
  }
  

  propertyText() {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 3 }}>
          <Text style={{ ...Fonts.blackColor16SemiBold, marginLeft: "5%" }}>
            Square Footage
          </Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            value={
              this.state.selectedAddress
                ? this.state.selectedAddress.sqft
                : null
            }
            placeholder="Sqrt"
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ ...Fonts.blackColor16SemiBold, marginLeft: "5%" }}>
            Property Tax
          </Text>
          <TextInput
            style={styles.input}
            // onChangeText={onChangeNumber}
            value={
              this.state.selectedAddress
                ? this.state.selectedAddress.propertyTax
                : null
            }
            placeholder="Per year"
            keyboardType="numeric"
          />
        </View>
      </View>
    );
  }

  property() {
    return (
      <View>
        <Text style={{ ...Fonts.blackColor18SemiBold }}>
          Property Type{"\n"}
        </Text>
        <View>
          <SelectMultipleGroupButton
            containerViewStyle={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              margin: 0,
              padding: 10,
            }}
            highLightStyle={{
              borderColor: "gray",
              backgroundColor: "transparent",
              textColor: "#3270fc",
              backgroundTintColor: "#3270fc",
              textTintColor: "white",
              borderColor: Colors.primaryColor,
              borderTintColor: "white",
            }}
            buttonViewStyle={{
              padding: 4,
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "center",
              width: "45%",
              borderRadius: 8,
              borderWidth: 2,
            }}
            onSelectedValuesChange={(selectedValues) =>
              this._groupButtonOnSelectedValuesChange(selectedValues)
            }
            group={PropTypes}
          />
        </View>
      </View>
    );
  }

  property1() {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={[{ width: 120, marginTop: "5%" }]}>
            <Button
              onPress={this.onPressButton}
              title="Condo Apt"
              color="#3270fc"
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={[{ width: 160, marginLeft: "-32%", marginTop: "5%" }]}>
            <Button title="Condo Townhouse" color="#3270fc" />
          </View>
        </View>
      </View>
    );
  }

  property2() {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={[{ width: 180, marginTop: "2.5%" }]}>
            <Button
              onPress={this.onPressButton}
              title="Freehold Townhouse"
              color="#3270fc"
            />
          </View>
        </View>
      </View>
    );
  }
  handlePost() {
    if (this.state.maxPrice == "450000" || this.state.minPrice == "0") {
      alert("Please set Maximum and Minimum Value ");
      return;
    }
    const jsonData = {
      min_price: this.state.minPrice,
      maxprice:this.state.maxPrice,
      // proptypes:this.state.selectedPropTypes
    };
    // console.log(jsonData)
    this.post();
  
  }

  continueButton() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          this.handlePost();
        }}
      >
        <LinearGradient
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          colors={["#3270fc", "#3270fc", "#3270fc"]}
          style={styles.continueButtonStyle}
        >
          <Text style={{ ...Fonts.whiteColor18Medium }}>{this.state.btnText}</Text>
          

        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
 
  headerStyle: {
    height: 60.0,
    elevation: 5.0,
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: Sizes.fixPadding * 2.0,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textFieldContentStyle: {
    // alignItems: 'center',
    justifyContent: "center",
    borderColor: "gray",
    // height: 40.0,
    // paddingHorizontal: Sizes.fixPadding * 2.0,
    // backgroundColor: "rgba(128, 128, 128, 0.8)",
    // borderRadius: Sizes.fixPadding * 2.0,
    // marginBottom: Sizes.fixPadding * 0.5,
    marginTop: "2%",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  continueButtonStyle: {
    borderRadius: Sizes.fixPadding * 0.5,
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "white",
    borderColor: 'rgba(128, 128, 128, 0.8)",',
  },
  slider:{
    alignItems: "center",
    justifyContent: "center",
  },
  spinner:{justifyContent:"center",alignItems:"center",height:"100%"}
});

Personalization.navigationOptions = () => {
  return {
    header: () => null,
    ...TransitionPresets.SlideFromRightIOS,
  };
};

export default withNavigation(Personalization);

