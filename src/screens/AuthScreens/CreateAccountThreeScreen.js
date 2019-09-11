import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
    StyleSheet, View, Text,  Animated, Keyboard, Platform, KeyboardAvoidingView, LayoutAnimation,
    TouchableOpacity, ImageBackground, Dimensions,
    TextInput,Alert,FlatList
} from 'react-native';
import { Button,Icon} from 'native-base';
import {Images,Fonts} from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import {ProgressCircle,CircleSnail} from '@components';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
const _keyExtractor = item => item.company_name;


class CreateAccountThreeScreen extends Component {

    static navigationOptions =({navigation})=> {
        return {
            title:'Who Is Your Broker?',
            headerTitleStyle: { fontSize: 18,fontWeight:'bold',alignSelf:'center' ,
                textAlign:"center",
                flex:1 },
            headerRight:(
                <TouchableOpacity style={{marginRight:20}} onPress={navigation.getParam('addnewtitle')}>
                    <Image source={Images.createicon}
                           imageStyle={{width: 25,
                               height: 25,
                           }}
                           style={{width: 25,
                               height: 25,
                           }}
                    />
                </TouchableOpacity>
            )
        }
    };
    state = {
        spinner:false,
        loadingtxt:'',
        isDialogVisible: false,
        newtitle:''
    };
    constructor(props) {
        super(props);

    }
    componentDidUpdate(prevProps, prevState){
        if(this.state.loadingtxt !== this.props.createaccount.loadingtxt){
            this.setState({loadingtxt:this.props.createaccount.loadingtxt});
        }
        if(this.state.spinner === false && this.props.createaccount.originationstatus === 100 ){
            this.setState({spinner: true});
        }
        if(this.props.createaccount.originationstatus >= 200 && this.state.spinner === true && prevProps.createaccount.originationstatus === 100){
            this.setState({spinner: false});
            if(this.props.createaccount.originationstatus === 200){
                this.props.navigation.navigate('CreateAccountfourScreen');
            }
        }

    }
    componentDidMount() {
        this.props.navigation.setParams({ addnewtitle: this._addnewtitle });
    }
    componentWillUnmount() {
        this.setState({isDialogVisible: false});
    }
    _renderItem = ({ item,index }) => {
        return (
            <TouchableOpacity onPress={()=>this.itemClick(item)} style={styles.itemcontainer}>
                <View style={styles.itemview}>
                    <View style={styles.itmeimgcontainer}>
                        <View style={styles.itemimgview}>
                            <Image
                                style={styles.itemimg}
                                imageStyle={styles.itemimg}
                                // indicator={CircleSnail}
                                renderError={(e)=>{return (
                                    <View >
                                        <Image source={Images.openhouse} style={{width: Dimensions.get('window').width*0.2,height: Dimensions.get('window').width*0.2,}} imageStyle={{width: Dimensions.get('window').width*0.2,height: Dimensions.get('window').width*0.2,}}/>
                                    </View>

                                )}}
                                source={{uri: item.company_logo_url}}
                            />
                        </View>
                    </View>

                    <View style={styles.itemtxtview}>
                        <Text style={styles.itemtxt}>{item.company_name}</Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }
    _addnewtitle=()=>{
        this.setState({isDialogVisible: !this.state.isDialogVisible});
    }
    showDialog=(status)=>{
        this.setState({isDialogVisible:status});
    }
    sendInput(txt){
        this.showDialog(false);
        if(txt){
            this.gonext({company_name:txt});
        }
        else {
            Alert.alert(
                'You must enter a name for your company',
                '',
            )
        }

    }
    itemClick=(item)=>{
        if(item && item.company_name){
            this.gonext(item);
        }
        else {
            Alert.alert(
                'You must enter a name for your company',
                '',
            )
        }

    }
    gonext=(txt)=>{
        if(txt){
            this.props.getoriginationlist(txt);
        }
        else {
            Alert.alert(
                'You must enter a name for your company',
                '',
            )
        }
    }
    render() {

        return (
            <View
                style={{flex:1,}}

            >
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                             title={"Please Enter Company Information"}
                             hintInput ={"Name"}
                             initValueTextInput={this.state.newtitle}
                             submitText={'SET INFORMATION'}
                             submitInput={ (inputText) => {this.sendInput(inputText)} }
                             closeDialog={ () => {this.showDialog(false)}}>
                </DialogInput>
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.loadingtxt}
                    textStyle={styles.spinnerTextStyle}
                />
                <FlatList
                    data={(this.props.createaccount && this.props.createaccount !== null && this.props.createaccount.brokername) ? this.props.createaccount.brokername :[]}
                    numColumns={2}
                    keyExtractor={_keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );

    }
}

const styles = {
    container: {
        flex: 1,
    },

    txtinput:{
        height: 50,
        borderColor: '#CDCECD',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor:'white',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        fontWeight:'bold',
        paddingLeft: 10,
        fontSize: 18,

    },
    txtrow:{
        marginTop: 20,
    },
    txtbtn:{
        color:'#0520F1',
        fontWeight:'bold',
        marginTop: 10,
        marginRight: 10,
    },
    txtbtnview:{
        width: '50%',
        flexDirection: 'row-reverse',
    },
    btn:{
        backgroundColor: '#37c0e5',
        height: 60,
        marginLeft: 10,
        marginRight:10,
    },
    btntxt:{
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    itemcontainer:{
        width: '50%',
    },
    itemview:{
        flex:1,
        margin: 8,
        alignItems:'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CDCECD',
    },
    itemimg:{
        width: '100%',
        height: '100%',
        resizeMode:"contain",
    },
    itemimg1:{
        width: 60,
        height: 60,

    },
    itemimgview:{
        width: Dimensions.get('window').width*0.4,
        height: Dimensions.get('window').width*0.25,
        // borderWidth: 1,
        // borderColor: '#CDCECD',
        alignItems:'center',
        justifyContent:'center',
    },
    itemtxtview:{
        width: '80%',
        alignItems:'center',
        marginBottom:10,
    },
    itemtxt:{
        textAlign:'center',
    },
    itmeimgcontainer:{
        marginTop: 20,
        marginBottom: 15,
        alignItems:'center',
        width: '90%',
    }

};


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        addnewaccountinfo : Actions.addnewaccountinfo,
        getbrokersname : Actions.getbrokersname,
        getoriginationlist : Actions.getoriginationlist,
    }, dispatch);
}

function mapStateToProps({login,createaccount})

{
    return {
        login: login,
        createaccount:createaccount,


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountThreeScreen);
