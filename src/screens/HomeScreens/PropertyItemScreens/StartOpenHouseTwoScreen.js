import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../../store/actions';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
    StyleSheet, View, Text,  Animated, Keyboard, Platform, KeyboardAvoidingView, LayoutAnimation,
    TouchableOpacity, ImageBackground, Dimensions,
    TextInput,Alert,ScrollView,
} from 'react-native';

import {Button, Container, Header, Content, Form, Item, Input, Label,Picker  ,Icon} from 'native-base';
import {Images,Fonts} from '@commons';
import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';

class StartOpenHouseTwoScreen extends Component {

    
    

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
       
    }
    
    componentWillUnmount() {
       
    }
    componentDidUpdate(prevProps, prevState){


    }

    continue=()=>{
        this.props.navigation.navigate('startOpenHouseThreeScreen');
    }
    gobackdashboard=()=>{
        this.props.navigation.goBack();
    }
    render() {

        return (
            <View
                style={styles.container}
            >
                <View style={styles.header}>
                    <TouchableOpacity style ={styles.lockbtnview} onPress={this.gobackdashboard}>
                       <Text style={styles.backtxt}>Back</Text>
                    </TouchableOpacity>
                </View>    
                <View style={styles.formviewcontainer}>
                    <View style={styles.imgcontainer_text}>
                        <Text>Brought To You By</Text>
                    </View>
                    <View style={styles.imgcontainer}>
                        <Image
                            source ={{uri:this.props.dashboard.mortgageitem.logo_url}}
                            style={styles.officelog}
                        />
                    </View>
                    {/* <View style={styles.imgcontainer}>
                        <Button
                                block
                                style={styles.btn}
                                onPress = {()=>this.continue()}
                            >
                                <Text style={styles.btntxt}>CONTINUE</Text>
                        </Button>
                    </View> */}
                </View>
                <View style={styles.profileview}>
                        <Button
                                block
                                style={styles.btn}
                                onPress = {()=>this.continue()}
                            >
                                <Text style={styles.btntxt}>CONTINUE</Text>
                        </Button>
                </View>
            </View>
        );

    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
    },
    header:{       
        position:'absolute',
        top: 10,
        left: 20,
        
    },
    lockbtnview:{
        width: 70,
        height: 50,
        marginTop: 10,
        marginRight: 10,
        
    },
    lockimg:{
        width: 50,
        height: 50,
        resizeMode:'contain'
    },
    lockimg1:{
        width: 40,
        height: 40,
        borderRadius: 20,
        // resizeMode:'contain'
    },
    formviewcontainer:{
        width: '80%',
        height: 250,
        marginLeft: '10%',
        marginRight: '10%',
        // alignSelf:'center',
        // justifyContent:'center',
        backgroundColor:'white',   
    },
    officelog:{
        width: 300,
        height: 100,
        resizeMode:'contain'
    },
    imgcontainer:{
        flexDirection:'row',
        justifyContent:'center',
        width: '100%',
    },
    imgcontainer_text:{
        justifyContent:'center',
        fontSize: 18,
        marginBottom: 30,
        alignItems:'center',
    },
    btn:{
        backgroundColor: '#37c0e5',
        width: '90%',
        height: 60,
        marginLeft:'5%',
    },
    btntxt:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16
    },
    txtitem:{
        width: '90%',
        fontSize:7,
        textAlign:'center'
    },
    profileview:{
        position: 'absolute',
        height: 70,
        width: '100%',
        bottom: 30,
        alignSelf:'center',
        flexDirection:'row',
        alignItems:'center',

    },
    profilelogview:{
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth:1,
        flexDirection:'row',
        alignItems:'center',
        borderColor:'white',
        backgroundColor:'white',
        marginLeft: 10,

    },
    textdetail:{
        flexDirection:'column',
        // alignItems:'center',
        marginLeft: 10,
        
    },
    textitem:{
        fontSize: 10,
        color:'white',
    },
    backtxt:{
        fontFamily:Fonts.bodonitalic,
        fontSize: 18
        //
    }


};


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        
    }, dispatch);
}

function mapStateToProps({login,dashboard})

{
    return {
        login: login,
        dashboard:dashboard,


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartOpenHouseTwoScreen);
