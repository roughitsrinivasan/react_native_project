import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, ScrollView, BackHandler } from "react-native";
import { withNavigation } from "react-navigation";
import { Fonts, Colors, Sizes, } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { TransitionPresets } from 'react-navigation-stack';

class PrivacyPolicyScreen extends Component {

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
                        {this.dummyText1()}
                        {this.dummyText2()}
                        {this.dummyText3()}
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
                This privacy notice discloses the privacy practices for www.housesilon.com. This privacy notice applies solely to information collected by this website. It will notify you of the following:
            </Text>
        )
    }

    dummyText1() {
        return (
            <Text style={{
                ...Fonts.blackColor14Medium,
                marginHorizontal: Sizes.fixPadding * 2.0,
                textAlign: 'justify',
                marginBottom: Sizes.fixPadding,
            }}>
                1. What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.{"\n"}{"\n"}
                2. What choices are available to you regarding the use of your data.{"\n"}{"\n"}
                3. The security procedures in place to protect the misuse of your information.{"\n"}{"\n"}
                4. How you can correct any inaccuracies in the information.{"\n"}{"\n"}
            </Text>
        )
    }

    dummyText2() {
        return (
            <Text style={{
                ...Fonts.blackColor14Medium,
                marginHorizontal: Sizes.fixPadding * 2.0,
                textAlign: 'justify',
                marginBottom: Sizes.fixPadding,
            }}>
                In order to use this website, a user must first complete the registration form. During registration a user is required to give certain information (such as phone number or email address). You activity on this website might also be collected within our own database. This information is used to contact you about the products/services on our site in which you have expressed interest. {'\n'} {'\n'}We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.{'\n'} {'\n'}We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.{'\n'} {'\n'}
                Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.{'\n'} {'\n'}
            </Text>
        )
    }

    dummyText3() {
        return (
            <Text style={{
                ...Fonts.blackColor14Medium,
                marginHorizontal: Sizes.fixPadding * 2.0,
                textAlign: 'justify',
                marginBottom: Sizes.fixPadding,
            }}>
                In order to use this website, a user must first complete the registration form. During registration a user is required to give certain information (such as phone number or email address). You activity on this website might also be collected within our own database. This information is used to contact you about the products/services on our site in which you have expressed interest. {'\n'} {'\n'}We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.{'\n'} {'\n'}We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.{'\n'} {'\n'}
                Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.{'\n'} {'\n'}
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
                    Privacy Policy
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

PrivacyPolicyScreen.navigationOptions = () => {
    return {
        header: () => null,
        ...TransitionPresets.SlideFromRightIOS,
    }
}

export default withNavigation(PrivacyPolicyScreen);