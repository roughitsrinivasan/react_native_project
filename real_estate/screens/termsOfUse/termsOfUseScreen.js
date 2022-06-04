import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

class TermsOfUseScreen extends Component {

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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                <View style={{ flex: 1 }}>
                    {this.header()}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: Sizes.fixPadding * 2.0 }}
                    >
                        {this.dummyText()}
                        {this.dummyText()}
                        {this.dummyText()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }

    dummyText() {
        return (
            <Text style={{
                ...Fonts.blackColor14Medium,
                marginHorizontal: Sizes.fixPadding * 2.0,
                textAlign: 'justify',
                marginBottom: Sizes.fixPadding,
            }}>
                By using this web site, you are agreeing to comply and be bound by the following terms of service and use. Please review the following terms in their entirety and ensure their comprehension before using and viewing this web site.{'\n'}{'\n'}
                Acknowledge and understand that the Terms of Use do not create an agency relationship and do not impose a financial obligation on the Registrant or create any representation agreement between the Registrant and the Participant.{'\n'}{'\n'}
                Acknowledges that you are entering into a lawful broker-consumer relationship with the HouseSigma Inc. Brokerage{'\n'}{'\n'}
                Acknowledges that after the Terms of Use agreement is opened for viewing, a “mouse click” is sufficient to acknowledge agreement to those terms.{'\n'}{'\n'}
                Understand that HouseSigma assume no responsibility for the accuracy of any information shown on HouseSigma website and mobile app.{'\n'}{'\n'}
                Understand that all data obtained from the VOW (Virtual Office Website) is intended only for your personal, non-commercial use.{'\n'}{'\n'}
                Do have a bona fide interest in the purchase, sale, or lease of real estate of the type being offered through the VOW.{'\n'}{'\n'}
                Agree not to copy, redistribute, retransmit, or otherwise use any of the data or Listing Information provided, except in connection with the Consumer’s consideration of the purchase, sale, or lease of an individual property.{'\n'}{'\n'}
                Acknowledge the Board/Association ownership of and the validity of the copyright in the MLS® database.{'\n'}{'\n'}
                If at anytime, an agreement is entered between HouseSigma Inc. and Consumer imposing a financial obligation on the Consumer or creating representation of the Consumer by the HouseSIgma Inc. must be established separately from the Terms of Use, must be prominently labeled as such, and may not be accepted solely by mouse click{'\n'}{'\n'}




            </Text>
        )
    }

    header() {
        return (
            <View style={styles.headerContentStyle}>
                <MaterialIcons name="arrow-back" size={24}
                    color="black"
                    onPress={() => this.props.navigation.goBack()}
                    style={{ position: 'absolute', left: 20.0, }}
                />
                <Text style={{
                    ...Fonts.blackColor18Bold,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    Terms of use
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 10.0,
    },
})

TermsOfUseScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(TermsOfUseScreen);