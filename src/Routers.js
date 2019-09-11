import React from 'react';
import {StyleSheet} from 'react-native';

import {createAppContainer, createStackNavigator, createSwitchNavigator, createDrawerNavigator} from 'react-navigation';

import {
    SigninScreen,LoginScreen,ForgotPassScreen,
    CreateAccountScreen,CreateAccountTwoScreen,CreateAccountThreeScreen,CreateAccountFourScreen,
    CreateAccountReviewScreen,
    HomeScreen,DashboardScreen,PropertyScreen,SplashScreen,

    CreatePropertyScreen,
    StartOpenHouseOneScreen,StartOpenHouseTwoScreen,
    StartOpenHouseThreeScreen,BuyerActivity,
    BuyerYesActivity,BuyerYesOneActivity,ThankPropertyScreen,
    BuyerNoActivity,BuyerNoOneActivity,
} from './screens';


const SplashStack = createStackNavigator(
    {
        signinScreen: SigninScreen,
        splashScreen: SplashScreen,
        
    },
    {
        initialRouteName: 'splashScreen',
        defaultNavigationOptions: {
            header: null
        },
    }
);
// const styles = StyleSheet.create({
//     navigationBarTitleStyle: {
//         // centering for Android
//         flex: 1,
//         textAlign: 'center',
//     }
// });
const NonHeaderStack = createStackNavigator(
    {
        startOpenHouseOneScreen          : StartOpenHouseOneScreen,
        startOpenHouseTwoScreen          : StartOpenHouseTwoScreen,
        startOpenHouseThreeScreen        : StartOpenHouseThreeScreen,
        buyerActivity                    : BuyerActivity,
        buyerYesActivity                 : BuyerYesActivity,
        buyerYesOneActivity              : BuyerYesOneActivity,
        thankPropertyScreen              : ThankPropertyScreen,
        buyerNoActivity                   : BuyerNoActivity,
        buyerNoOneActivity               : BuyerNoOneActivity,
    },
    {
        defaultNavigationOptions: {
            header: null
        },
    }
)
const AuthStack = createStackNavigator(
    {
        signin :  SigninScreen,
        login : LoginScreen,
        resetpass : ForgotPassScreen,
        creataccount : CreateAccountScreen,
        creataccounttwo : CreateAccountTwoScreen,
        CreateAccountthreeScreen : CreateAccountThreeScreen,
        CreateAccountfourScreen : CreateAccountFourScreen,
        CreateAccountreviewScreen : CreateAccountReviewScreen,
    },
    {

        defaultNavigationOptions:{
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            }
        }
    }
);



const HomeStack = createStackNavigator(
    {
        home                        : SigninScreen,
        homescreen                  : HomeScreen,
        dashboard                   : DashboardScreen,
        propertyScreen              : PropertyScreen,
        createPropertyScreen              : CreatePropertyScreen,
        
        

    },
    {
        // defaultNavigationOptions:{
        //     headerStyle: {
        //         // backgroundColor: '#3C4252',
        //     },
        //     headerTitleStyle: {
        //         // color: 'black',
        //         // fontFamily: Fonts.primaryRegular,
        //         flex: 1,
        //         textAlign: 'center',
        //     },
        //     headerTintColor: '#000000',
        // }
        defaultNavigationOptions:{
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center',
            }
        }
    }
);

// const NavStacker = createDrawerNavigator(
//     {
//         HomeStack: {
//             screen: SigninScreen,
//         },
//         // AuthStack: {
//         //     screen: AuthStack,
//         // },
//     },
//     // {
//     //     // contentComponent: DrawerMenu
//     // }
// );

const AppContainer = createAppContainer(
    createSwitchNavigator({SplashStack,HomeStack,AuthStack,NonHeaderStack})
);


export default AppContainer;
