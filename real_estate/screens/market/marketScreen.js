import React, { Component } from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Animated,
    Platform,
    Dimensions,
    Button,
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import {PROD_NAME} from '@env'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit';
import { MaterialIcons } from '@expo/vector-icons';
import SkeletonContent from "react-native-skeleton-content";


const places = [
    {
        id: '1',
        place: 'Toronto',
        isExpandable: false,
        more: [
            {
                id: '1',
                name: 'GTA - All',
                time: '8 min | 2.5 km',
            },
            {
                id: '2',
                name: 'GTA - Central',
                time: '14 min | 4.0 km',
            },
            {
                id: '3',
                name: 'GTA - North',
                time: '8 min | 2.5 km',
            },
            {
                id: '4',
                name: 'GTA - East',
                time: '8 min | 2.5 km',
            },
            {
                id: '5',
                name: 'GTA - West',
                time: '14 min | 4.0 km',
            },
            {
                id: '6',
                name: 'Ottawa Area',
                time: '20 min | 6.0 km',
            },
            {
                id: '7',
                name: 'Hamilton - Niagara',
                time: '5 min | 1.5 km',
            },
            {
                id: '8',
                name: 'Central Ontario',
                time: '14 min | 4.0 km',
            },
            {
                id: '9',
                name: 'Southwestern Ontario',
                time: '20 min | 6.0 km',
            },
            {
                id: '10',
                name: 'Eastern Ontario',
                time: '5 min | 1.5 km',
            },
        ],
    },
   
];

const communities = [
    {
        id: '1',
        place: 'All Comunities',
        isExpandable: false,
        more: [
            {
                id: '1',
                name: 'Toronto',
                time: '8 min | 2.5 km',
            },
            {
                id: '2',
                name: 'Notrth York',
                time: '14 min | 4.0 km',
            },
            {
                id: '3',
                name: 'Scarborough',
                time: '8 min | 2.5 km',
            },
            {
                id: '4',
                name: 'Etobicoke',
                time: '8 min | 2.5 km',
            },
           
        ],
    },
   
];

const nearByPropertyList = [
    {
        id: '1',
        properyImage: require('../../assets/images/house/house_1.jpg'),
        propertyName: 'Sky View House',
        propertyAddress: 'Opera Street, New York',
        propertyAmount: '360000',
        isFavourit: false,
    },
    {
        id: '2',
        properyImage: require('../../assets/images/house/house_2.jpg'),
        propertyName: 'Vraj House',
        propertyAddress: 'Yogi Street, New York',
        propertyAmount: '920000',
        isFavourit: false,
    },
    {
        id: '3',
        properyImage: require('../../assets/images/house/house_3.jpg'),
        propertyName: 'Yogi Villa',
        propertyAddress: 'Opera Street, New York',
        propertyAmount: '490000',
        isFavourit: false,
    },
    {
        id: '4',
        properyImage: require('../../assets/images/house/house_5.jpg'),
        propertyName: 'Sky View House',
        propertyAddress: 'Opera Street, New York',
        propertyAmount: '300000',
        isFavourit: false,
    },
    {
        id: '5',
        properyImage: require('../../assets/images/house/house_6.jpg'),
        propertyName: 'Sky View House',
        propertyAddress: 'Opera Street, New York',
        propertyAmount: '360000',
        isFavourit: false,
    },
];

const pie = [
    { name: 'Seoul', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Toronto', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Beijing', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'New York', population: 8538000, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Moscow', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
];

const { width } = Dimensions.get('screen');

class MarketScreen extends Component {

    state = {
        expanded: false,
        toronto : places,
        communties: communities,
        showSnackBar: false,
        isInWishList: false,
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         chartOptions: {
    //             series: [{
    //                 data: [1, 3, 2]
    //             }]
    //         }
    //     };
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
            
                {this.header()}
                <ScrollView>
                {this.header1()}
                {this.horizontal()}
                {this.users()}  
                            
            
                </ScrollView>
            </View>
  

            
        )
    }

    users() {

        const line = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [{
            data: [ 20, 45, 28, 80, 99, 43 ]
            }]
        }

        const benzel = {
            labels: ['2012-03', '2013-11', '2015-07', '2017-03', '2018-11', '2020-07'],
            datasets: [{
              data: [ 2351, 2050, 3000, 2500, 3300, 5000 ]
            }]
          }


        const pie = [
            { name: 'Att/Row/Twnhouse', population: 21500000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Condo Apt', population: 2800000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Detached', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Link', population: 8538000, color: 'yellow', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Semi-Detached', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Condo Townhouse', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
            { name: 'Other', population: 11920000, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 }
        ];


        // const renderItem = ({ item }) => (
        return (

        <View style={{ backgroundColor: 'whitesmoke' }}>
            <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center", }}>
                    {"\n"}Toronto                        
                    </Text>
                    <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center" }}>
                        All Communities                        
                    </Text>
            <View style={[styles.container, {
                flexDirection: "row",marginTop: '5%'
            }]}>
                <View style={{ flex: 3 }}>
                    <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center"}}>
                        January 2022 Median Price{"\n"}                         
                    </Text>
                    <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "center" }}>
                        $1,737,500                            
                    </Text>
                    
                </View>
                <View style={{ flex: 3 }}>
                <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center" }}>
                        January 2022 New Listing{"\n"}                           
                    </Text>
                <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "center" }}>
                    251                         
                </Text>
                </View>    
                <View style={{ flex: 3 }}>
                <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center"}}>
                        Median Price Change{"\n"}                           
                    </Text>
                    <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "center" }}>
                        1 year ^ 7.6%                          
                </Text>
                <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "center" }}>
                        5 year ^ 46%                          
                </Text>
                <Text style={{ ...Fonts.blackColor16SemiBold, textAlign: "center" }}>
                        10 year ^ 149%                          
                </Text>
                </View>
            </View>
            
            
            <View style={styles.featuredPropertyContentStyle}>
                    <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center",}}>
                            {"\n"}Median Sold Price $ Average Days On Market *{"\n"}                       
                            </Text>
                        <View style={{height: 290}}>
                <WebView 
                style={styles.container}
                source={{ html: '<div id="everviz-_96V0QFXd" class="everviz-_96V0QFXd" style= "height: 750px;font-size: 30px;"><script src="https://app.everviz.com/inject/_96V0QFXd/" defer="defer"></script></div>' }}
                renderLoading={this.renderLoading}
                startInLoadingState
                />
                </View>
                <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center" }}>
                        Toronto / All Communities / All property types                           
                    </Text>
            </View>

            <View style={styles.featuredPropertyContentStyle}>
            <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center",}}>
                    {"\n"}Sold & Active Listing *{"\n"}                       
                    </Text>
                    <View style={{height: 290}}>
                    <WebView 
                style={styles.container}
                source={{ html: '<div id="everviz-_LN1Wk1-a" class="everviz-_LN1Wk1-a" style= "height: 700px;font-size: 30px;"><script src="https://app.everviz.com/inject/_LN1Wk1-a/" defer="defer"></script></div>' }}
                renderLoading={this.renderLoading}
                startInLoadingState

                />
                </View>
                        <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center" }}>
                        {"\n"}Toronto / All Communities / All property types                           
                        </Text>
                    </View>

                

            <View style={styles.featuredPropertyContentStyle}>
                    <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center",}}>
                            {"\n"}Market Temperature (absorption rate) *                      
                            </Text>
                            <Text style={{ ...Fonts.grayColor12Medium, textAlign: "center" }}>
                            * Absorption rate indicates how fast homes are selling. It's calculated as homes sold divided by homes currently listed.                           
                    </Text>
                        <View style={{height: 290}}>
                        <WebView 
                style={styles.container}
                source={{ html: '<div id="everviz-w7KnIfVSj" class="everviz-w7KnIfVSj" style= "height: 750px;font-size: 30px;"><script src="https://app.everviz.com/inject/w7KnIfVSj/" defer="defer"></script></div> ' }}
                />
                </View>
                <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center" }}>
                        Toronto / All Communities / All property types                           
                    </Text>
            </View>

                 
    
                <View style={styles.featuredPropertyContentStyle}>
                        <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center",}}>
                                {"\n"}Investor Demand (rent ratio) *{"\n"}                       
                        </Text>
                                <Text style={{ ...Fonts.grayColor12Medium, textAlign: "center" }}>
                                * How many sold properties are listed on MLS® for lease right after purchase (in percentage).                           
                    </Text>
                    <View style={{height: 290}}>
                        <WebView 
                        style={styles.container}
                        source={{ html: '<div id="everviz-OHxO0SKnO" class="everviz-OHxO0SKnO" style= "height: 750px;font-size: 30px;"><script src="https://app.everviz.com/inject/OHxO0SKnO/" defer="defer"></script></div>' }}
                        renderLoading={this.renderLoading}
                        startInLoadingState
                        />
                    </View>
                    <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center" }}>
                        {"\n"}Toronto / All Communities / All property types                           
                    </Text>
                </View>

                <View style={styles.featuredPropertyContentStyle}>
                        <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center",}}>
                                {"\n"}Property Type Distribution               
                        </Text>
                    <View style={{height: 290}}>
                        <WebView 
                        style={styles.container}
                        source={{ html: '<div id="everviz-FziBTg-c0"" class="everviz-FziBTg-c0" style= "height: 750px;font-size: 30px;"><script src="https://app.everviz.com/inject/FziBTg-c0/" defer="defer"></script></div>' }}
                        renderLoading={this.renderLoading}
                        startInLoadingState
                        /> 
                    </View>
                    <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center" }}>
                        {"\n"}Toronto / All Communities / All property types                           
                    </Text>
                </View>

                                <View style={styles.featuredPropertyContentStyle}>
                        <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center",}}>
                                {"\n"}Sold Price Distribution (last 6 months)                      
                        </Text>
                    <View style={{height: 290}}>
                        <WebView 
                        style={styles.container}
                        source={{ html: '<div id="everviz--VyUKuP8i" style= "height: 750px;font-size: 30px; class="everviz--VyUKuP8i"><script src="https://app.everviz.com/inject/-VyUKuP8i/" defer="defer"></script></div>"' }}
                        renderLoading={this.renderLoading}
                        startInLoadingState
                        />
                    </View>
                    <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center" }}>
                        {"\n"}Toronto / All Communities / All property types                           
                    </Text>
                </View>


    
                       {/* linechart */}
                {/* <View style={styles.featuredPropertyContentStyle}>
                
                <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center",}}>
                        {"\n"} Sold Price Distribution (last 6 months) * {"\n"}                     
                        </Text>
                        
                    <LineChart
                        data={line}
                        width={Dimensions.get('window').width}
                        height={200}
                        chartConfig={{
                            backgroundGradientFrom: '#FFF',
                            backgroundGradientTo: '#FFF',
                            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`
                            }}
                        /> 
                        
                        <Text style={{ ...Fonts.grayColor14Medium, textAlign: "center" }}>
                            Toronto / All Communities / All property types                           
                        </Text>
                        </View> */}

                    {/* piechart */}
                    {/* <View style={{marginBottom:'25%'}}>
                    <View style={styles.featuredPropertyContentStyle}>
            <Text style={{ ...Fonts.blackColor18SemiBold, textAlign: "center",}}>
                    {"\n"}Property Type Distribution *                        
                    </Text>
                <PieChart
                    data={pie}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="-14"
                    />
            <Text style={{ ...Fonts.grayColor12Medium, textAlign: "center" }}>
                        * Source: Based on analysis of information from past listings from respective real estate boards.                           
                    </Text>
                    </View>
                    </View> */}
            </View>
            
        )
        }

    renderLoading(){
        return (
            <SkeletonContent 
                    // containerStyle={{flex: 1, width: '100%', borderRadius:10}}
                    isLoading={true}
                    layout={[
                        { width: '100%', height: 500, margin:20 }
                        // { width: 190, height: 20, marginBottom: 15, marginLeft:18, marginTop:5 },  
                        // { height:30, width:77, marginLeft:250, marginTop: -58, marginBottom:20 },    
                        
                    ]}
            />
            

        )
    }

    header() {
        return (
            <View style={styles.headerStyle}>
                <View style={styles.headerContentStyle}>
                    <Text style={{ ...Fonts.primaryColor18Bold }}>{PROD_NAME}</Text>
                    <View style={{ flexDirection: 'column' }}>

                        {/* <MaterialIcons name="search" size={24} color={Colors.primaryColor}
                            onPress={() => this.props.navigation.navigate('Search')}
                        />
                        <MaterialIcons name="notifications" size={24} color={Colors.primaryColor}
                            style={{ marginLeft: Sizes.fixPadding + 5.0 }}
                            onPress={() => this.props.navigation.navigate('Notification')}
                        /> */}
                    </View>
                </View>
                <View>
                    
                </View>
            </View>

        )
    }

    torontoUpdate({ id, isExpanded }) {
        const newList = this.state.toronto.map((property) => {
            if (property.id === id) {
                const updatedItem = { ...property, isExpandable: isExpanded };
                return updatedItem;
            }
            return property;
        });
        this.setState({ nearestPlacesChangableList: newList })

    }

    communitiesUpdate({ id, isExpanded }) {
        const newList = this.state.toronto.map((property) => {
            if (property.id === id) {
                const updatedItem = { ...property, isExpandable: isExpanded };
                return updatedItem;
            }
            return property;
        });
        this.setState({ nearestPlacesChangableList: newList })

    }

    header1() {
        return (
            <View style={styles.headerStyle1}>
                 <View style={[styles.container, {
                flexDirection: "row",
            }]}>
                
                <View style={{ flex: 3 }}>
                    {/* <Text style={{ ...Fonts.blackColor16Medium, marginLeft: 2.0, marginTop: 1.5, textAlign: 'left' }}>
                            Type : hi
                    </Text> */}
                    <View>
                {this.state.toronto.map((item) => (
                    <View key={item.id} style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <Collapse>
                            <CollapseHeader>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginVertical: Sizes.fixPadding - 18.0
                                    }}>
                                    <Text style={{ ...Fonts.blackColor16Bold, }}>
                                        {item.place}
                                    </Text>
                                    <MaterialIcons
                                        name={item.isExpandable ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                        size={24} color={Colors.primaryColor}
                                    />
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={{ marginVertical: Sizes.fixPadding - 5.0 }}>
                                    {item.more.map((item) => (
                                        <View key={item.id}
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginVertical: Sizes.fixPadding - 7.0,
                                            }}>
                                            <Text style={{ ...Fonts.grayColor16SemiBold }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </CollapseBody>
                        </Collapse>
                    </View>
                ))}
            </View>
                </View>
                <View style={{ flex: 3 }}>

                    <View>
                {this.state.communties.map((item) => (
                    <View key={item.id} style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <Collapse
                            onToggle={(isExpanded) => this.communitiesUpdate({ id: item.id, isExpanded })}
                        >
                            <CollapseHeader>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginVertical: Sizes.fixPadding - 18.0
                                    }}>
                                    <Text style={{ ...Fonts.blackColor16Bold }}>
                                        {item.place}
                                    </Text>
                                    <MaterialIcons
                                        name={item.isExpandable ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                        size={24} color={Colors.primaryColor}
                                    />
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <View style={{ marginVertical: Sizes.fixPadding - 5.0 }}>
                                    {item.more.map((item) => (
                                        <View key={item.id}
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginVertical: Sizes.fixPadding - 7.0,
                                            }}>
                                            <Text style={{ ...Fonts.grayColor16SemiBold }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </CollapseBody>
                        </Collapse>
                    </View>
                ))}
            </View>
                </View>
                    
                </View>
                <View>
                    
                </View>
            </View>

        )
    }


    horizontal() {  
        return ( 
            <View style={{backgroundColor: '#3270fc'}}>  
            <ScrollView  horizontal={true} style={{}}>  
            
                <View style={[{ width: 180,height: 40, }]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="All property types"  
                        color="#3270fc"  
                    />  
                </View>  

                <View style={[{ width: 100,height: 40, }]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Detached"  
                        color="#3270fc"  
                    />  
                </View>  
                <View style={[{ width: 160,height: 40,}]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Semi-Detached"  
                        color="#3270fc"  
                    />  
                </View>   
                <View style={[{ width: 220,height: 40, }]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Freehold Townhouse"  
                        color="#3270fc"  
                    />  
                </View>   
                <View style={[{ width: 160,height: 40, }]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Condo Townhouse"  
                        color="#3270fc"  
                    />  
                </View>  
                <View style={[{ width: 120,height: 40, }]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Condo Apt"  
                        color="#3270fc"  
                    />  
                </View>  
                <View style={[{ width: 80,height: 40, }]}>  
                    <Button  
                        onPress={this.onPressButton}  
                        title="Link"  
                        color="#3270fc"

                    />  
                </View> 
                 
            </ScrollView>  
            </View> 
        );  
    }  
}  






const styles = StyleSheet.create({
    headerStyle: {
        height: 60.0,
        elevation: 4.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    headerStyle1: {
        height: 'auto',
        elevation: 3.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    useInfoContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 40.0,
        alignSelf: 'center',
        alignItems: 'center'
    },
    isReadableUserHintStyle: {
        width: 8.0,
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding - 7.0,
    },
    userImageStyle: {
        height: 80.0,
        width: 80.0,
        borderRadius: 40.0,
        borderColor: Colors.primaryColor,
        borderWidth: 0.3,
    },
    dividerStyle: {
        backgroundColor: 'rgba(128, 128, 128, 0.8)',
        height: 0.8,
        marginVertical: Sizes.fixPadding + 7.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
   
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    featuredPropertyContentStyle: {
        width: Dimensions.get('window').width,
        // marginHorizontal: Sizes.fixPadding * 1.0,
        elevation: 3.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding + 5.0,
        
    },
})

export default withNavigation(MarketScreen);




