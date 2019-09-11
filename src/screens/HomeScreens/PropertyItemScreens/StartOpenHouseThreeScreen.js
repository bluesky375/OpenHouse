import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../../store/actions';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
    StyleSheet, View, Text, Image, Animated, Keyboard, Platform, KeyboardAvoidingView, LayoutAnimation,
    TouchableOpacity, ImageBackground, Dimensions,
    TextInput,Alert,ScrollView,
} from 'react-native';

import {Button, Container, Header, Content, Form, Item, Input, Label,Picker  ,Icon} from 'native-base';
import {Images,Fonts} from '@commons';
// import Image from 'react-native-image-progress';
import UUIDGenerator from 'react-native-uuid-generator';

import Spinner from 'react-native-loading-spinner-overlay';

class StartOpenHouseThreeScreen extends Component {

    
    

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

    buyerbtn=()=>{
        this.props.navigation.navigate('buyerActivity');
    }
    agentbtn=()=>{
        
    }
    render() {

        return (
            <ImageBackground
                source={Images.siginbackgroundimage}
                style={styles.container}
                resizeMode="cover"
            >
                <View style={styles.header}>
                    <TouchableOpacity style ={styles.lockbtnview} onPress={this.gobackdashboard}>
                       <Text style={styles.backtxt}>Back</Text>
                    </TouchableOpacity>
                </View>    
                <View style={styles.formviewcontainer}>
                    <View style={styles.imgcontainer1}>
                        <Text style={{fontSize: 19,marginTop: 10,marginBottom: 20,}}>I AM...</Text>
                    </View>
                    <View style={styles.imgcontainer}>
                        <Button
                                block
                                style={styles.btn}
                                onPress = {()=>this.buyerbtn()}
                            >
                                {this.props.dashboard.selectedproperty.property_type === 'R' ? (
                                    <Text style={styles.btntxt}>A POTENTIAL TENTANT</Text>
                                ) :(<Text style={styles.btntxt}>A POTENTIAL BUYER</Text>)}
                        </Button>
                    </View>
                    <View style={styles.imgcontainer}>
                        <Button
                                block
                                style={styles.btn}
                                onPress = {()=>this.agentbtn()}
                            >
                                <Text style={styles.btntxt}>REAL ESTATE AGENT</Text>
                        </Button>
                    </View>
                </View>

                <View style={styles.profileview}>
                    <View style ={styles.profilelogview} >
                        <Image source={{uri:this.props.login.account.agent_photo_url}} style={styles.lockimg1}/>
                    </View>
                    <View style={styles.textdetail}>
                        <Text style={styles.textitem}>
                            {this.props.login.account.agent_first_name} {this.props.login.account.agent_last_name}
                        </Text>
                        <Text style={styles.textitem}>
                            {this.props.login.account.agent_title} 
                        </Text>
                        <Text style={styles.textitem}>
                            {this.props.login.account.agent_office_name} 
                        </Text>
                    </View>
                </View>
            </ImageBackground>
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
        width: '100%',
        height: 250,
        // alignSelf:'center',
        // justifyContent:'center',
    },
    officelog:{
        width: 300,
        height: 100,
        resizeMode:'contain'
    },
    imgcontainer1:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'white',
    },
    imgcontainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 10,
    },
    btn:{
        backgroundColor: '#37c0e5',
        width: '90%',
        height: 60,
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
        height: 60,
        width: '70%',
        bottom: 30,
        right: 0,
        backgroundColor:'#8c8c8c',
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

export default connect(mapStateToProps, mapDispatchToProps)(StartOpenHouseThreeScreen);
