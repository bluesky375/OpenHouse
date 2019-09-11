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
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import {ProgressCircle,CircleSnail} from '@components';
const _keyExtractor = item => item.realtor_title;

class CreateAccountTwoScreen extends Component {

    static navigationOptions =({navigation})=> {
        return {
            title:'What Is Your Title?',
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
        if(this.state.spinner === false && this.props.createaccount.brokernamestatus === 100 ){
            this.setState({spinner: true});
        }
        if(this.props.createaccount.brokernamestatus >= 200 && this.state.spinner === true && prevProps.createaccount.brokernamestatus === 100){
            this.setState({spinner: false});
            if(this.props.createaccount.brokernamestatus === 200){
                this.props.navigation.navigate('CreateAccountthreeScreen');
            }
        }

    }
    componentDidMount() {
        this.props.navigation.setParams({ addnewtitle: this._addnewtitle });
    }
    componentWillUnmount() {
        this.setState({isDialogVisible: false});
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={()=>this.itemClick(item)} style={styles.itemcontainer}>
                <View style={styles.itemview}>
                    <View style={styles.itmeimgcontainer}>
                        <View style={styles.itemimgview}>
                            <Image
                                style={styles.itemimg}
                                // indicator={ProgressCircle}
                                renderError={(e)=>{return (
                                    <View >
                                        <Image source={Images.openhouse} style={styles.itemimg} imageStyle={styles.itemimg}/>
                                    </View>

                                )}}
                                source={{uri: item.realtor_image_url}}
                            />
                        </View>
                    </View>

                    <View style={styles.itemtxtview}>
                        <Text style={styles.itemtxt}>{item.realtor_title}</Text>
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
            this.gonext(txt);
        }
        else {
            Alert.alert(
                'You must enter/select a title to continue',
                '',
            )
        }

    }
    itemClick=(item)=>{
        if(item && item.realtor_title){
            this.gonext(item.realtor_title);
        }
        else {
            Alert.alert(
                'You must enter/select a title to continue',
                '',
            )
        }

    }
    gonext=(txt)=>{
        if(txt){
            this.props.getbrokersname(txt);
        }
        else {
            Alert.alert(
                'You must enter/select a title to continue',
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
                             title={"Please Enter Your Title"}
                             // message={"Message for DialogInput #1"}
                             hintInput ={"Title"}
                             initValueTextInput={this.state.newtitle}
                             submitText={'SET TITLE'}
                             submitInput={ (inputText) => {this.sendInput(inputText)} }
                             closeDialog={ () => {this.showDialog(false)}}>
                </DialogInput>
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.loadingtxt}
                    textStyle={styles.spinnerTextStyle}
                />
                <FlatList
                    data={(this.props.createaccount && this.props.createaccount.realtortitles && this.props.createaccount.realtortitles !== null && this.props.createaccount.realtortitles.length) ? this.props.createaccount.realtortitles : []}
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
        width: 60,
        height: 60,

    },
    itemimgview:{
        height: Dimensions.get('window').width*0.3,
        width: Dimensions.get('window').width*0.3,
        borderRadius: Dimensions.get('window').width*0.3*0.5,
        borderWidth: 1,
        borderColor: '#CDCECD',
        alignItems:'center',
        justifyContent:'center',
    },
    itemtxtview:{
        width: '80%',
        alignItems:'center'
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
    }, dispatch);
}

function mapStateToProps({login,createaccount})

{
    return {
        login: login,
        createaccount:createaccount,


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountTwoScreen);
