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

class BuyerNoActivity extends Component {

    
    

    constructor(props) {
        super(props);
        this.state = {
            attendeefirstname:'',
            attendeelastname:'',
            attendeeemail:'',
            attendeetelephone:'',
            uniqueid:'',
            spinner:false,
            loadingtxt:'',
        };
    }
    componentDidMount() {
        UUIDGenerator.getRandomUUID((uuid) => {
            this.setState({uniqueid:uuid});
        });
    }
    
    componentWillUnmount() {
       
    }
    componentDidUpdate(prevProps, prevState){

        if(this.state.loadingtxt !== this.props.dashboard.loadingtxt){
            this.setState({loadingtxt:this.props.dashboard.loadingtxt});
        }
        if(this.state.spinner === false && this.props.dashboard.status === 100 ){
            this.setState({spinner: true});
        }
        if(this.props.dashboard.status >= 200 && this.state.spinner === true && prevProps.dashboard.status === 100){
            this.setState({spinner: false});
            if(this.props.dashboard.status === 200){
                // this.props.navigation.navigate('CreateAccountfourScreen');
                this.props.navigation.navigate('thankPropertyScreen');
            }
        }
    }
    gobackdashboard=()=>{
        this.props.navigation.goBack();
    }
    
    continue=()=>{
        const {attendeefirstname,attendeelastname,attendeeemail,attendeetelephone} = this.state;
        if(!attendeefirstname || attendeefirstname.length < 3)   {
            Alert.alert(
                '',
                'First Name is Required',
            );
        }
        else if(!attendeelastname || attendeelastname.length < 3){
            Alert.alert(
                '',
                'Last Name is Required',
            );
        }
        else if(!attendeeemail){
            Alert.alert(
                '',
                'Email is Invalid',
            );
        }
        else if(attendeeemail && attendeeemail.length < 11){
            Alert.alert(
                '',
                'Email is Required',
            );
        }
        else if(attendeetelephone.length < 14){
            Alert.alert(
                '',
                'Phone Number is Required',
            );
        }
        else {
            let data ={
                'attendeefirstname':attendeefirstname,
                'attendeelastname': attendeelastname,
                'attendeeemail': attendeeemail,
                'attendeetelephone':attendeetelephone,
                'accountnum':this.props.login.account.account_num,
                'propertyrecordnum':this.props.dashboard.selectedproperty.property_record_num,
                'attendeeagentfullname':this.props.dashboard.agentinfo.attendeeagentfullname,
                'attendeeagenttelephone':this.props.dashboard.agentinfo.attendeeagenttelephone,
                'attendeeagentcompanyname':this.props.dashboard.agentinfo.attendeeagentcompanyname,
                'attendeeworkingwithagentyesorno':'1',
                'advertisingid':this.props.login.account.advertising_id,
                'uniqueid':this.state.uniqueid,
                'attendeetype':'B'
            };
            this.props.postnewattendeeagent(data);
            
            //ThankPropertyScreen
        }
    }
    render() {

        return (
            <ImageBackground
                source={Images.siginbackgroundimage}
                style={styles.container}
                resizeMode="cover"
            >
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.loadingtxt}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={styles.header}>
                    <TouchableOpacity style ={styles.lockbtnview} onPress={this.gobackdashboard}>
                       <Text style={styles.backtxt}>Back</Text>
                    </TouchableOpacity>
                </View>    
                <View style={styles.formviewcontainer}>
                    <View style={styles.imgcontainer1}>
                        <Text style={{fontSize: 19,marginTop:5,marginBottom:5,}}>Enter Your Information</Text>
                    </View>
                    <View style={styles.formitemcontainer}> 
                        <Item stackedLabel style={styles.txtviewitem}>
                            <Label style={styles.txtlabel}>First Name</Label>
                            <Input value={this.state.attendeefirstname} style={styles.txtitem2}
                                onChangeText={(text) => this.setState({attendeefirstname:text})}
                            />
                        </Item>
                        <Item stackedLabel style={styles.txtviewitem}>
                            <Label style={styles.txtlabel}>Last Name</Label>
                            <Input value={this.state.attendeelastname} style={styles.txtitem2}
                                onChangeText={(text) => this.setState({attendeelastname:text})}
                            />
                        </Item>
                        <Item stackedLabel style={styles.txtviewitem}>
                            <Label style={styles.txtlabel}>Email Address</Label>
                            <Input value={this.state.attendeeemail} style={styles.txtitem2}
                                onChangeText={(text) => this.setState({attendeeemail:text})}
                            />
                        </Item>
                        <Item stackedLabel style={styles.txtviewitem}>
                            <Label style={styles.txtlabel}>Phone Number</Label>
                            <Input value={this.state.attendeetelephone} style={styles.txtitem2}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    let num1 = text.replace(/\D+/g, '');
                                    let num2 = this.state.attendeetelephone.replace(/\D+/g, '');
                                    let num = num1.replace(".", '');
                                    if(!text){
                                        this.setState({attendeetelephone:''});
                                    }
                                    if(num1 && num1 ===num2){
                                        num1=num1.slice(0,num1.length-1);
                                    }
                                    if(isNaN(num) || num.length>10){
                                        // Its not a number
                                    }else{
                                        let cleaned = num1;
                                        let match = cleaned.replace(/(\d{0,3})(\d{0,3})(\d{0,4})$/, '($1) $2-$3');
                                        if (match) {
                                            this.setState({attendeetelephone:match});
                                        }
                                        if(!num1){
                                            this.setState({attendeetelephone:''});
                                        }
                                    }
    
                                }}

                            />
                        </Item>
                        <View style={styles.txtviewitemtxt}>
                            <Text style={styles.txtitem}>
                                I understand that by pressing sign-in, I am agreeing with the terms and conditions of Open House Marketing System. I am also granting full permission to be contacted via text, email or phone calls by
                                or any of his/her affiliates.You are also granting permission to be contacted by any of Open House Marketing System partners and affiliates.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.imgcontainer}>
                        <Button
                                block
                                style={styles.btn}
                                onPress = {()=>this.continue()}
                            >
                                <Text style={styles.btntxt}>Continue</Text>
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
        height: 300,
        alignSelf:'center',
        justifyContent:'center',
        // marginTop:Dimensions.get('window').height * 0.1,

    },
    formviewcontainer1:{
        width: '90%',
        height: 200,
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius: 5,
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
        marginLeft:'60%',
        marginTop: 10,
        zIndex: 100,
    },
    btn:{
        backgroundColor: '#37c0e5',
        width: '90%',
        height: 60,
        zIndex: 100,
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
        zIndex: 1,
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
    },
    formitemcontainer:{
        marginTop: 10,
        height: 330,
        width: '90%',
        marginLeft:'5%',
        marginRight: '5%',
        borderRadius: 5,
        backgroundColor:'white',
    },
    txtviewitem:{
        marginRight: 10,
        marginLeft: 10,
        padding: 0,

    },
    txtviewitemtxt:{
        alignItems:'center',
        textAlign:'center',
        marginTop: 10,
    },
    txtlabel:{
        fontSize: 12,
        fontWeight:'bold',
        color:'red',

    },
    spinnerTextStyle: {
        color: '#FFF'
    },

};


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setagentitem: Actions.setagentitem,
        postnewattendeeagent: Actions.postnewattendeeagent,
    }, dispatch);
}

function mapStateToProps({login,dashboard})

{
    return {
        login: login,
        dashboard:dashboard,


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyerNoActivity);
