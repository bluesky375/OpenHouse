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

class StartOpenHouseOneScreen extends Component {

    
    

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

    signin=()=>{
        if(this.props.dashboard && this.props.dashboard.makehousedata && this.props.dashboard.makehousedata.type ==='public'){
            // go startopenhouse two
            let downloadmortgage = this.props.login.downloadmortgage.filter(item=>item.is_selected === '1');
            if(downloadmortgage && downloadmortgage.length){
                this.props.setmortgageitem(downloadmortgage[0]);
                this.props.navigation.navigate('startOpenHouseTwoScreen');
            }
        }
        else{
            // go brkoer one activity
        }
    }
    gobackdashboard=()=>{
        Alert.alert(
            '',
            'Do you want to end the Open House?',
            [
                {text: 'YES', onPress: this.godashboard},
                {text: 'NO'},
            ]
        )
    }
    godashboard=()=>{
        this.props.navigation.navigate('dashboard');
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
                        <Image
                            source ={Images.lock}
                            style={styles.lockimg}
                        />
                    </TouchableOpacity>
                </View>    
                <View style={styles.formviewcontainer}>
                    <View style={styles.imgcontainer}>
                        <Image
                            source ={{uri:this.props.login.account.agent_office_logo_url}}
                            style={styles.officelog}
                        />
                    </View>
                    <View style={styles.imgcontainer}>
                        <Button
                                block
                                style={styles.btn}
                                onPress = {()=>this.signin()}
                            >
                                <Text style={styles.btntxt}>PLEASE SIGN IN</Text>
                        </Button>
                    </View>
                    <View style={styles.imgcontainer}>
                        <Text style={styles.txtitem}>
                            I understand that by pressing sign-in, I am agreeing with the terms and conditions of Open House Marketing System. I am also granting full permission to be contacted via text, email or phone calls by
                            or any of his/her affiliates.You are also granting permission to be contacted by any of Open House Marketing System partners and affiliates.
                        </Text>
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
        right: 10,
        
    },
    lockbtnview:{
        width: 50,
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
        borderWidth: 1,
        borderColor:'#CDCECD',
        borderRadius: 5,

    },
    officelog:{
        width: 200,
        height: 100,
        resizeMode:'contain'
    },
    imgcontainer:{
        flexDirection:'row',
        justifyContent:'center',
    },
    btn:{
        backgroundColor: '#37c0e5',
        width: '90%',
        height: 60,
        margin: 10,
    },
    btntxt:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16
    },
    txtitem:{
        width: '90%',
        fontSize:7,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        
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


};


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setmortgageitem: Actions.setmortgageitem,
    }, dispatch);
}

function mapStateToProps({login,dashboard})

{
    return {
        login: login,
        dashboard:dashboard,


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartOpenHouseOneScreen);
