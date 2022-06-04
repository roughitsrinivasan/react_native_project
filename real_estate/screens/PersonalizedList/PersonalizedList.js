import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  FlatList,
  BackHandler
} from "react-native";
import { withNavigation } from "react-navigation";
import { SwipeListView } from "react-native-swipe-list-view";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SkeletonContent from "react-native-skeleton-content";

var shortListData = [
  // {
  //     key: '1',
  //     properyImage: require('../../assets/images/house/house_1.jpg'),
  //     propertyName: 'Sky View House',
  //     propertyAddress: 'Opera Street, New York',
  //     propertyAmount: '360000',
  //     isFavourit: false,
  // },
  // {
  //     key: '2',
  //     properyImage: require('../../assets/images/house/house_2.jpg'),
  //     propertyName: 'Vraj House',
  //     propertyAddress: 'Yogi Street, New York',
  //     propertyAmount: '920000',
  //     isFavourit: false,
  // },
];

const { width } = Dimensions.get("screen");

class ShortlistScreen extends Component {
    constructor(props){
      super(props)
      this.state={
        data:[],
        
        loading:true
      }
      

    }
    

  
    requestData=this.props.navigation.getParam("requestData");
    
    componentDidMount() {
      // console.log("Data1",this.data1)
      // console.log("[DATA]",this.data_obj.result)
        console.log(this.requestData);
      // fetch("http://127.0.0.1:8063/api/get/preference", {
      fetch("http://18.118.172.175:8372/api/get/preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          min_price: this.requestData.minPrice,
          max_price: this.requestData.maxPrice,
          // prop_types:this.state.selectedPropTypes
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("[data]",data);
          this.setState({
            data:data.result,
            loading:false
          })
        })
        .then(() => {
    
          //
        }).catch(err=>{
         
          console.log(err)
        });


      console.log("STATE",this.state)
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButton.bind(this)
    );
  }
  getData(){
    console.log(this.requestData)
  }
  

  handleBackButton = () => {
    this.props.navigation.navigate("BottomBar");
    return true;
  };

  render() {
    console.log(
      "calling render********************************************************"
    );
    console.log("shortlistdata before render", shortListData);
    return (
      <View style={{ flex: 1,backgroundColor:"white" }}>
        {this.header()}
        <SkeletonContent
          containerStyle={{ flex: 1, width: "100%", borderRadius: 10 }}
          isLoading={this.state.loading}
          layout={[
            {
              width: 350,
              height: 220,
              elevation: 3,
              marginHorizontal: 20,
              marginTop: 20,
            },
            { width: 150, height: 30, marginLeft: 20, marginTop: 8 },
            {
              width: 190,
              height: 20,
              marginBottom: 15,
              marginLeft: 18,
              marginTop: 5,
            },
            {
              height: 30,
              width: 77,
              marginLeft: 280,
              marginTop: -58,
              marginBottom: 20,
            },

            { width: 350, height: 220, elevation: 3, marginHorizontal: 20 },
            { width: 160, height: 30, marginLeft: 20, marginTop: 8 },
            {
              width: 190,
              height: 20,
              marginBottom: 15,
              marginLeft: 20,
              marginTop: 5,
            },
            {
              height: 30,
              width: 77,
              marginLeft: 280,
              marginTop: -58,
              marginBottom: 20,
            },
          ]}
        >
          <ShortList data={this.state.data} navigation={this.props.navigation}/>
        </SkeletonContent>
      </View>
    );
  }

  header() {
    return (
      <View style={styles.headerStyle}>
        <Text style={{ ...Fonts.primaryColor18Bold }}>Personalized</Text>
      </View>
    );
  }
}




const ShortList = (props) => {

  

  const [showSnackBar, setShowSnackBar] = useState(false);
 

  const renderItem = (house_data) => {
    return(
      <TouchableHighlight
       
        activeOpacity={0.9}
        onPress={()=>{
          props.navigation.navigate("Property",{
            propertyId:house_data.item.house_id
          })
        }}
      >
        <View style={styles.featuredPropertyContentStyle}>
          <Image
            source={{ uri: house_data.item.house_image }}
            resizeMode="cover"
            style={styles.featuredPropertyImageStyle}
          />
          <View style={styles.featuredPropertyInfoContentStyle}>
            <View style={{ width: width/1.2 ,flexDirection:"row",justifyContent:"space-between" }}>
             <View >
             <Text style={{ ...Fonts.blackColor14SemiBold }}>
                {house_data.item.city}
              </Text>
              <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
                {house_data.item.address}
              </Text>
             </View>
             <View>
             <Text style={{ ...Fonts.blackColor16SemiBold }}>
              $
              {house_data.item.property_amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </Text>
             </View>
            </View>
           
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  // const RenderItem = (house_data) => {
  //   console.log("Inside Render Item")
  //   return(
  //     <TouchableHighlight
       
  //       activeOpacity={0.9}
  //       onPress={()=>{
  //         props.navigation.navigate("Property",{
  //           propertyId:house_data.item.house_id
  //         })
  //       }}
  //     >
  //       <View style={styles.featuredPropertyContentStyle}>
  //         <Image
  //           source={{ uri: house_data.item.house_image }}
  //           resizeMode="cover"
  //           style={styles.featuredPropertyImageStyle}
  //         />
  //         <View style={styles.featuredPropertyInfoContentStyle}>
  //           <View style={{ width: width/1.2 ,flexDirection:"row",justifyContent:"space-between" }}>
  //            <View >
  //            <Text style={{ ...Fonts.blackColor14SemiBold }}>
  //               {house_data.item.city}
  //             </Text>
  //             <Text numberOfLines={1} style={{ ...Fonts.grayColor12Medium }}>
  //               {house_data.item.address}
  //             </Text>
  //            </View>
  //            <View>
  //            <Text style={{ ...Fonts.blackColor16SemiBold }}>
  //             $
  //             {house_data.item.property_amount
  //               .toString()
  //               .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
  //           </Text>
  //            </View>
  //           </View>
           
  //         </View>
  //       </View>
  //     </TouchableHighlight>
  //   );
  // }

  return (
    <View style={{ flex: 1 ,marginTop:10}}>
      {props.data.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MaterialIcons
            name="favorite-border"
            size={50}
            color={Colors.grayColor}
          />
          <Text
            style={{
              ...Fonts.grayColor18Bold,
              marginTop: Sizes.fixPadding * 2.0,
            }}
          >
            No Houses Found
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
            <FlatList
                       
                          data={props.data}
                          keyExtractor={(item) => `${item.house_id+(Math.random()*10)}`}
                          renderItem={renderItem}
                          contentContainerStyle={{
                              paddingBottom: Sizes.fixPadding * 8.0,
                          }}
                          showsVerticalScrollIndicator={false}
            />
            {/* {
              props.data.map((house_data,idx)=>{
                  return(
                    <RenderItem key={idx} house_data={house_data}></RenderItem>
                  )
              })
            } */}
        </View>
      )}
      <Snackbar
        style={styles.snackBarStyle}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
      >
        Removed from shortList
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 60.0,
    elevation: 5.0,
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredPropertyContentStyle: {
    marginHorizontal: Sizes.fixPadding * 2.0,
    elevation: 3.0,
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding,
    marginBottom: Sizes.fixPadding + 5.0,
  },
  featuredPropertyImageStyle: {
    borderTopLeftRadius: Sizes.fixPadding,
    borderTopRightRadius: Sizes.fixPadding,
    width: "100%",
    height: 220.0,
  },
  featuredPropertyInfoContentStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: Sizes.fixPadding,
    marginVertical: Sizes.fixPadding,
    alignItems: "center",
  },
  featuredPropertyAmountContentStyle: {
    borderWidth: 1.0,
    alignItems: "center",
    height: 30.0,
    justifyContent: "center",
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(128, 128, 128, 0.5)",
  },
  snackBarStyle: {
    position: "absolute",
    bottom: 50.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
  },
  backDeleteContinerStyle: {
    alignItems: "center",
    bottom: 15,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 90,
    backgroundColor: "red",
    right: 0,
  },
});

export default withNavigation(ShortlistScreen);
