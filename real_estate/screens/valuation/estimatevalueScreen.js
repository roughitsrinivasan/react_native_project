import React, { Component } from "react";
import { Text, SafeAreaView, View, StatusBar, StyleSheet, Image, BackHandler, ScrollView, TouchableOpacity, Button } from "react-native";
import { withNavigation } from "react-navigation";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, Ionicons, FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { BottomSheet } from 'react-native-elements';
import { TransitionPresets } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';




class EstimatevalueScreen extends Component {
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

    constructor(props) {
        super(props);
        const {params} = this.props;
        console.log("estimate props", this.props.navigation.getParam('data'));
        this.state = {
            data : this.props.navigation.getParam('data')

        }
    }


    render() { 
        return ( 
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <View style={styles.container}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                    >
                       {this.content()}
                       {this.Estimaterange()}
                        
                    </ScrollView>
                    
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

    content() {
        {console.log(this.state.data)}
        return (
            <View>
                <Text  style={{ ...Fonts.blackColor24Bold,textAlign: 'center', justifyContent: 'center' }}>
                        {this.state.data ? this.state.data.name + " ," + this.state.data.community  : "59 Broadlands Blvd, North York, Ontario"}
                    </Text>
                    <View style={[styles.container, {
                flexDirection: "row", alignContent: 'center' 
            }]}>
                
                <View style={{ flex: 3, alignItems: 'center' }}>
                <Ionicons name="bed" size={30} color={Colors.primaryColor}>
                    </Ionicons>
                </View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                <FontAwesome name="bed" size={30} color={Colors.primaryColor}>
                    </FontAwesome>
                </View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                <MaterialCommunityIcons name="garage-variant" size={30} color={Colors.primaryColor}>
                    </MaterialCommunityIcons>
                </View>
                <View style={{ flex: 3, alignItems: 'center' }}>
                <FontAwesome name="bed" size={30} color={Colors.primaryColor}> 
                    </FontAwesome>
                </View>
                    
                </View>

                <View style={[styles.container, {
                flexDirection: "row", alignContent: 'center' 
            }]}>
                
                <View style={{ flex: 3, alignItems: 'center', marginTop: '-10%' }}>
       
                    <Text  style={{ ...Fonts.grayColor18SemiBold,textAlign: 'center', justifyContent: 'center' }}>
                            {this.state.data ? this.state.data.bathrooms : "3"}

                        </Text>  
         
                </View>
                <View style={{ flex: 3, alignItems: 'center', marginTop: '-10%' }}>
               
                    <Text  style={{ ...Fonts.grayColor18SemiBold,textAlign: 'center', justifyContent: 'center' }}>
                            {this.state.data ? this.state.data.bedrooms  : "3"}
                        </Text>  
                   
                </View>
                <View style={{ flex: 3, alignItems: 'center', marginTop: '-10%' }}>
              
                    <Text  style={{ ...Fonts.grayColor18SemiBold,textAlign: 'center', justifyContent: 'center' }}>
                            {this.state.data ? this.state.data.rooms : "3"}
                        </Text>  
                   
                </View>
                <View style={{ flex: 3, alignItems: 'center', marginTop: '-10%' }}>
                
                    <Text  style={{ ...Fonts.grayColor18SemiBold,textAlign: 'center', justifyContent: 'center' }}>
                        1398 Sqrt
                        </Text>  
               
                </View>
                    
                </View>
                <Text  style={{ ...Fonts.blackColor18Bold,textAlign: 'center', justifyContent: 'center',color: '#3270fc' }}>
                        Detached{'\n'}
                    </Text> 
                    <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.props.navigation.navigate('Estimate')
                }}
            >
            
                <LinearGradient
                    // start={{ x: 1, y: 0 }}
                    // end={{ x: 0, y: 0 }}
                    colors={['#3270fc', '#3270fc', '#3270fc',]}
                    style={styles.continueButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor18Medium }}>
                    <Feather name="edit" size={20} />Edit Property Info
                    </Text>
                </LinearGradient>
            </TouchableOpacity >
                    
                    
                    
 
            </View>
        )
    }

    Estimaterange () {
        return(
            <View style={{ marginTop: '10%'}}>
            <Text  style={{ ...Fonts.blackColor20Bold,textAlign: 'center', justifyContent: 'center' }}>
                        Your estimated range{'\n'}
            </Text>
            <Text  style={{ ...Fonts.blackColor24Bold,textAlign: 'center', justifyContent: 'center',color: '#3270fc' }}>
                            {this.state.data ? "$" + this.state.data.price : "$1,24,556"}
                        </Text>
                        <Text  style={{ ...Fonts.grayColor18SemiBold,textAlign: 'center', justifyContent: 'center' }}>
                            Mid
                        </Text>
                
            <View style={[styles.container, {
                flexDirection: "row",
            }]}>
                
                <View style={{ flex: 4 }}>
                <Text  style={{ ...Fonts.blackColor20Medium,textAlign: 'center', justifyContent: 'center' }}>
                            $1,324,668
                        </Text>
                        <Text  style={{ ...Fonts.grayColor18SemiBold,textAlign: 'center', justifyContent: 'center' }}>
                            Low
                        </Text>
                </View>

                <View style={{ flex: 4 }}>
                <Text  style={{ ...Fonts.blackColor20Medium,textAlign: 'center', justifyContent: 'center' }}>
                    $1,751,111    
                        </Text>
                        <Text  style={{ ...Fonts.grayColor18SemiBold,textAlign: 'center', justifyContent: 'center' }}>
                            High
                        </Text> 
                </View>
                    
                </View>

            </View>
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
    container: {
        flex: 1,
        padding: 20,
    },
    continueButtonStyle: {
        borderRadius: Sizes.fixPadding * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40.0,
        
    },
    
})

EstimatevalueScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(EstimatevalueScreen); 
