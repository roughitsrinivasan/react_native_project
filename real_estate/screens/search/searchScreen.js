import React, { Component, Fragment } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TextInput,
    Image,
    TouchableOpacity,
    SafeAreaView,
    BackHandler,
    Button,
    Dimensions
} from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import SearchableDropdown from 'react-native-searchable-dropdown';


var items = [ ];


const featuredPropertyList = [
    
];

class SearchScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
    }

    handleBackButton = () => {
        this.props.navigation.pop();
        return true;
    };

    matchString = (arr, str) => arr.map(e => e.address.toLowerCase().search(str.toLowerCase()) !== -1)

    async fetchHouseData(addr) {
        if (addr) {
            
        
        fetch('http://18.118.172.175:8372/api/get/house/details/by/address', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({
              "address": addr,
            }),
          })
            .then((response) => response.json())
            .then(json => {
            this.arrayNew = []
            if (json.result) {
                for (const house of json.result) {
                    this.arrayNew.push(
                        {
                            "name" : house.address,
                            "id": house.house_id,
                            "price": house.price,
                            "community": house.community
                        }
                    );
                }
            }
            this.setState({ data: this.arrayNew } )
        })
        }
            // .catch((error) => {
            //     //display error message
            //     console.log("error!!");
            //     console.log(error);
            // });
        
        

        // fetch(`http://18.118.172.175:8372/api/get/hn/house/10`)
        // .then(res => res.json())
        // .then(json => {
        //     this.arrayNew = []
        //     if (json.result.result) {
        //         for (const house of json.result.result) {
        //             this.arrayNew.push(
        //                 {
        //                     "name" : house.address,
        //                     "id": house.house_id,
        //                     "bathrooms": house.room_details.bathroom,
        //                     "bedrooms": house.room_details.bedroom,
        //                     "rooms": house.room_details.rooms,
        //                     "price": house.price,
        //                     "community": house.community
        //                 }
        //             );
        //         }
        //     }
        //     console.log( "arrayNew" ,this.arrayNew);
        //     this.setState({ data: items } )
        // })
    }


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedAddress : '',
            value: '',
            
        }

        this.arrayNew = [
            // { name: 'Robert' },
            // { name: 'Bryan' },
            // { name: 'Vicente' },
            // { name: 'Tristan' },
            // { name: 'Marie' },
            // { name: 'Onni' },
            // { name: 'sophie' },
            // { name: 'Brad' },
            // { name: 'Samual' },
            // { name: 'Omur' },
            // { name: 'Ower' },
            // { name: 'Awery' },
            // { name: 'Ann' },
            // { name: 'Jhone' },
            // { name: 'z' },
            // { name: 'bb' },
            // { name: 'cc' },
            // { name: 'd' },
            // { name: 'e' },
            // { name: 'f' },
            // { name: 'g' },
            // { name: 'h' },
            // { name: 'i' },
            // { name: 'j' },
            // { name: 'k' },
            // { name: 'l' },
          ];
    }

    state = {
        isSearch: false,
        featuredPropertyChangableList: featuredPropertyList,
        showSnackBar: false,
        isInWishList: false,
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor, }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    <FlatList
                        ListHeaderComponent={
                            <>
                            {this.backArrow()}
                                {this.search()}
                                {this.title({ title: 'Locations' },)}
                                {this.Searchaddress()}

                            </>
                        }
                        data={this.state.featuredPropertyChangableList}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        )
    }

    handleFeaturedPropertyUpdate({ id }) {
        const newList = this.state.featuredPropertyChangableList.map((property) => {
            if (property.id === id) {
                const updatedItem = { ...property, isFavourit: !property.isFavourit };
                return updatedItem;
            }
            return property;
        });
        this.setState({ featuredPropertyChangableList: newList })
    }

    renderItem = ({ item }) => (
        
        <View style={{
            ...styles.featuredPropertyContentStyle,
            marginTop: item.id == '1' ? Sizes.fixPadding - 5.0 : 0.0
        }}>
            <View style={styles.featuredPropertyInfoContentStyle}>
                <View style={{ width: '10%', }}>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {item.propertyAddress}
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        Bedroom: 3, Bathroom: 2, Garage: 1
                    </Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        Listing Date: 2022-02-28, Listed 2 times
                    </Text>
                    
                </View>
                <View>
                    <Text style={{ ...Fonts.redColor16Medium }}>
                        ${item.propertyAmount}
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Medium }}>
                        Detached
                    </Text>
                </View>
            </View>
        </View>
        
    )

    // recentSearches() {

    //     const renderItem = ({ item }) => (
    //         <View style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             marginBottom: Sizes.fixPadding - 5.0,
    //             marginHorizontal: Sizes.fixPadding * 2.0,
    //         }}>
    //             <MaterialIcons name="history" size={23} color={Colors.grayColor} />
    //             <Text style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 3.0 }}>
    //                 {item.searchText}
    //             </Text>
    //         </View>
    //     )
    //     return (
    //         <View>
    //             <FlatList
    //                 data={recentSearchesList}
    //                 keyExtractor={(item) => `${item.id}`}
    //                 renderItem={renderItem}
    //                 scrollEnabled={false}
    //                 contentContainerStyle={{
    //                     paddingTop: Sizes.fixPadding - 5.0,
    //                     paddingBottom: Sizes.fixPadding
    //                 }}
    //             />
    //         </View>

    //     )
    // }


    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#CED0CE',
            }}
          />
        );
      };
    
      searchItems = text => {
        const newData = this.arrayNew.filter(item => {
          const itemData = `${item.name.toUpperCase()}`;
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
          value: text,
        });
      };
    
      renderHeader = () => {
        return (
            <>
        <View style={styles.searchFieldStyle}>
            <MaterialIcons name="search" size={24}
                color={this.state.isSearch ? Colors.primaryColor : Colors.grayColor} />
          <TextInput
            style={{ marginBottom: "10%" ,flexDirection: 'row',
        }}
            placeholder="Search for properties"
            style={{
                flex: 1,
                ...Fonts.grayColor14Medium,
                marginLeft: Sizes.fixPadding,
                paddingTop: 2.0,

            }}
            selectionColor={Colors.primaryColor}
            onFocus={() => this.setState({ isSearch: true })}
            onBlur={() => this.setState({ isSearch: false })}
            onChangeText={text => {
                this.fetchHouseData(text)
                this.searchItems(text);            
            }}
            value={this.state.value}
          />
          </View>
          {this.title({ title: 'Listings' })}
          
        </>
        );
      };

      search () {
          return (
            <View
            style={{
              flex: 1,
              width: Dimensions.get('window').width,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => (
                <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.props.navigation.navigate('Property', 
                    {
                        propertyId: item.id
                    })}
                style={styles.featuredPropertyContentStyle}>

                        <View style={{
                    ...styles.featuredPropertyContentStyle,
                    marginTop: item.id == '1' ? Sizes.fixPadding - 5.0 : 0.0
                }}>
                    <View style={styles.featuredPropertyInfoContentStyle}>
                        <View style={{ width: '72%', }}>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.name}
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                {item.community}
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                Bedroom: 3, Bathroom: 2, Garage: 1
                            </Text>
                            
                        </View>
                        <View>
                            <Text style={{ ...Fonts.redColor16Medium }}>
                                ${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </Text>
                            <Text style={{ ...Fonts.grayColor14Medium }}>
                                Detached
                            </Text>
                        </View>
                    </View>
                        
                </View>
                    
                </TouchableOpacity>  
                
              )}
              keyExtractor={item => item.name}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />
          </View>
          
          
          )
      }

    

    Searchaddress () {

        // const renderItem = ({ item }) => (
        //     <View>
        //         <Text>
        //             Yogi
        //         </Text>
        //     </View>
        // )

        return (
            // <View>
            //     <FlatList
            //         data={this.state.featuredPropertyChangableList}
            //         keyExtractor={(item) => `${item.id}`}
            //         renderItem={renderItem}
            //         scrollEnabled={false}
            //         contentContainerStyle={{
            //             paddingTop: Sizes.fixPadding - 5.0,
            //             paddingBottom: Sizes.fixPadding
            //         }}
            //     />
            // </View>
            <View style={styles.featuredPropertyInfoContentStyle}>
            <View style={{ width: '72%', }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Yogi Street, New York
                </Text>
                
            </View>
            <View>
            <Button  
                        onPress={this.onPressButton}  
                        title="Address"  
                        color="#3270fc"  
                    /> 
            </View>
        </View>
       
        )
    }

    title({ title }) {
        return (
            <View style={{ backgroundColor: 'whitesmoke', marginTop: '5%' }}>
            <Text style={{ ...Fonts.blackColor16SemiBold, paddingTop: '2%', paddingBottom: '2%', marginLeft: '2%'}}>
                {title}
            </Text>
            </View>
        )
    }

    // searchTextField() {
    //     return (
    //         <View style={styles.searchFieldStyle}>
    //             <MaterialIcons name="search" size={24}
    //                 color={this.state.isSearch ? Colors.primaryColor : Colors.grayColor} />
    //             <TextInput
    //                 placeholder="Search for properties"
    //                 style={{
    //                     flex: 1,
    //                     ...Fonts.grayColor14Medium,
    //                     marginLeft: Sizes.fixPadding,
    //                     paddingTop: 2.0,

    //                 }}
    //                 selectionColor={Colors.primaryColor}
    //                 onFocus={() => this.setState({ isSearch: true })}
    //                 onBlur={() => this.setState({ isSearch: false })}
    //             />
    //         </View>
    //     )
    // }

    backArrow() {
        return (
            <MaterialIcons name="arrow-back" size={24} color="black"
                onPress={() => this.props.navigation.goBack()}
                style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding }}
            />
        )
    }
}

const styles = StyleSheet.create({
    addToFavouriteContainerStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        position: 'absolute',
        right: 10.0,
        top: 10.0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchFieldStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 37.0,
        backgroundColor: 'rgba(128, 128, 128, 0.25)',
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        marginVertical: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    featuredPropertyContentStyle: {
        elevation: 3.0,
        backgroundColor: Colors.whiteColor,
        
    },
    featuredPropertyInfoContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
        marginVertical: Sizes.fixPadding,
        alignItems: 'center',
    },
    featuredPropertyAmountContentStyle: {
        borderWidth: 1.0,
        alignItems: 'center',
        height: 30.0,
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(128, 128, 128, 0.5)',
    },
    
})

SearchScreen.navigationOptions = () => {
    return {
        header: () => null
    }
}

export default withNavigation(SearchScreen);