import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
    StyleSheet, View, Text,  Animated, Keyboard, Platform, KeyboardAvoidingView, LayoutAnimation,
    TouchableOpacity, ImageBackground, Dimensions,
    TextInput,Alert,FlatList,
} from 'react-native';
import { Button,Icon} from 'native-base';
import {Images,Fonts} from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import {ProgressCircle,CircleSnail} from '@components';
const _keyExtractor = item => item.name;
const _keyExtractor1 = item => item.img;

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const item_height = (screenHeight - 92) / 4;

class DashboardScreen extends Component {

    static navigationOptions =({navigation})=> {
        return {
            // title:'Open',
            // headerTitleStyle: { fontSize: 18,fontWeight:'bold',alignSelf:'center' ,
            //     textAlign:"center",
            //     flex:1 },
            headerTitle: (
                <View style={{alignSelf: 'center', justifyContent:'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{
                            fontSize: 18,fontWeight:'bold',
                        }}>Open</Text>
                        <Text style={{
                            fontSize: 8,
                        }}>TM</Text>
                    </View>
                </View>
            ),
            headerRight:(
                <TouchableOpacity style={{
                    marginRight:20,flex:1,alignSelf:'center',justifyContent:'center'}}
                                  onPress={navigation.getParam('changegrid')}
                >
                    <Image source={Images.switch_layout}
                           imageStyle={{width: 25,
                               height: 25,
                               }}
                           style={{width: 25,
                               height: 25,
                               }}
                    />
                </TouchableOpacity>
            ),
            headerLeft:(
                <TouchableOpacity style={{
                    marginLeft:20,flex:1,alignSelf:'center',justifyContent:'center'}}
                                  onPress={navigation.getParam('logout')}
                >
                    <Image source={Images.logout}
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

    constructor(props) {
        super(props);
        this.state = {
            spinner:false,
            loadingtxt:'',
            isDialogVisible: false,
            newtitle:'',
            gridtype:false,
        };

    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.loadingtxt !== this.props.dashboard.loadingtxt && this.props.dashboard.loadingtxt !==''){
            this.setState({loadingtxt: this.props.dashboard.loadingtxt});
        }
        if(this.props.dashboard.status >=200 && prevProps.dashboard.status === 100 && this.state.spinner ){
            this.setState({spinner: false});
            if(this.props.dashboard.status === 200){
                this.props.navigation.navigate('propertyScreen');
            }
        }
        if(this.props.dashboard.status === 100 && !this.state.spinner){
            this.setState({spinner: true});
        }
    }
    componentDidMount() {

        this.props.navigation.setParams({ changegrid: this._changegrid });
        this.props.navigation.setParams({ logout: this._logout });
    }
    _changegrid=()=>{
        this.props.navigation.navigate('homescreen');
    }
    _logout=()=>{

        Alert.alert(
            '',
            'Are you sure you want to logout?',
            [
                {text: 'NO'},
                {text: 'YES', onPress: this.logouthandle}
            ],
        );

    }
    logouthandle=()=>{
        this.props.logout();
        this.props.navigation.navigate('signinScreen');
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.itemcontainer} onPress={()=>this.godetail(item.img)}>
                <View style={styles.itemview}>
                    <View style={styles.itmeimgcontainer}>
                        <View style={styles.itemimgview}>
                            <Image
                                style={styles.itemimg}
                                imageStyle={styles.itemimg}
                                source={Images[item.img]}
                            />
                        </View>
                    </View>

                    <View style={styles.itemtxtview}>
                        <Text style={styles.itemtxt}>{item.name}</Text>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }
    godetail=(txt)=>{
        if(txt ==='property'){
            this.props.getproperties();
        }
    }
    render() {

        return (
            <View
                style={{flex:1,}}
            >
                <Spinner
                    visible={this.state.spinner}
                    textContent={this.state.loadingtxt}
                    textStyle={styles.spinnerTextStyle}
                />
                    <FlatList
                        data={(this.props.login && this.props.login.homedata) ? this.props.login.homedata : []}
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
        backgroundColor:'#DFE0DF',
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
        height: item_height,
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
        width: '80%',
        height: '80%',
        resizeMode:"contain",
        margin:'10%',

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
        alignItems:'center',
        // marginBottom: 10,
        justifyContent:'center',
    },
    itemtxt:{
        textAlign:'center',
    },
    itmeimgcontainer:{
        marginTop: 10,
        marginBottom: 15,
        alignItems:'center',
        width: '90%',
    }

};


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        logout : Actions.logout,
        getproperties : Actions.getproperties,
    }, dispatch);
}

function mapStateToProps({login,dashboard})

{
    return {
        login: login,
        dashboard:dashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
