import React, { Component, Fragment, useState, useEffect } from "react";
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
    Slider
} from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Dimensions } from "react-native";
import { WebView } from 'react-native-webview';


class mapScreen extends Component {

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
    
    // constructor(props) {
    //     super(props);
    
    //     this.state = {
    //       data: [],
    //       value: '',
    //       sliderValue: 0,
    //     };
    
        
    //   }

      
    
    
      render() {
        return (
          <View style={{flex:1}}>
            <WebView 
            // style={{flex:1}}
                source={{ uri: 'http://housemarketsearch.org/map' }}            
            />
            </View>

        );
      }
    }

    var width = Dimensions.get('window').width;

    const styles = StyleSheet.create({
      container: {
          flex: 1,
          padding: 20,
      },
      searchFieldStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          height: 37.0,
          backgroundColor: 'rgba(128, 128, 128, 0.25)',
          borderRadius: Sizes.fixPadding,
          paddingHorizontal: Sizes.fixPadding,
          marginVertical: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 1.0,
      },
      MainContainer :{

        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        margin: 10
        
        }
  })    


  mapScreen.navigationOptions = () => {
    return {
        header: () => null
    }
    
}

export default withNavigation(mapScreen);