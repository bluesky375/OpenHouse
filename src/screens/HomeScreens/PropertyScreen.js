import React, { Component } from 'react';
import Timer from 'react-timer-mixin';

import * as Actions from '../../store/actions';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
    StyleSheet, View, Text,  Animated, Keyboard, Platform, KeyboardAvoidingView, LayoutAnimation,
    TouchableOpacity, ImageBackground, Dimensions,TouchableHighlight,
    TextInput,Alert,FlatList,Linking,
} from 'react-native';
import { Button,Icon} from 'native-base';
import {Images,Fonts,Constants} from '@commons';
import Image from 'react-native-image-progress';
// import * as Progress from 'react-native-progress';
import Spinner from 'react-native-loading-spinner-overlay';
import DialogInput from 'react-native-dialog-input';
import {SearchBar} from 'react-native-elements';
import {ProgressCircle,CircleSnail} from '@components';
import Modal from 'react-native-modalbox';

const _keyExtractor = item => item.uniqueid;

class PropertyScreen extends Component {

    static navigationOptions =({navigation})=> {
        return {
            title:'Properties',
            headerTitleStyle: { fontSize: 18,fontWeight:'bold',alignSelf:'center' ,
                textAlign:"center",
                flex:1 },
            headerRight:(
                <TouchableOpacity style={{marginRight:20,flex:1,alignSelf:'center',justifyContent:'center'}}
                                  onPress={navigation.getParam('addproperty')}
                >
                    {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
                    <Image source={Images.createicon}
                           imageStyle={{width: 28,
                               height: 28,
                           }}
                           style={{width: 28,
                               height: 28,
                           }}
                    />
                </TouchableOpacity>
            ),
            headerLeft:(
                <TouchableOpacity style={{
                    marginLeft:15,flex:1,alignSelf:'center',justifyContent:'center'}}
                                  onPress={()=>navigation.goBack()}
                >
                    <Image source={Images.backicon}
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
            isDisabled: false,
            isOpen: false,
            newtitle:'',
            searchText:'',
            checkmanage: false,
            dashboard:(this.props.dashboard && this.props.dashboard.properties) ? this.props.dashboard.properties : [],
        };

    }
    componentDidUpdate(prevProps, prevState){

    }
    componentDidMount() {
        this.props.navigation.setParams({ addproperty: this._addproperty });
        
        
    }
    componentWillUnmount() {

    }
    
    _addproperty=()=>{
        this.props.navigation.navigate('createPropertyScreen');
    }
    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={()=>this.itemClick(item)} style={styles.itemcontainer}>
                <Image
                    style={styles.itemview}
                    imageStyle={styles.itemview1}
                    source={{uri:item.property_photo_url}}
                />
                <View style={styles.itmeimgcontainer}>
                        <View style={styles.itemtxtview}>
                            <Text style={styles.itemtxt}>${item.property_price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
                            {item.property_status==="A" ?(
                                <Text style={{color:'white',}}>Active</Text>
                            ):(
                                <Text style={{color:'red'}}>Inactive</Text>
                            )}
                        </View>
                        <View style={styles.itemtxtview}>
                            <Text style={styles.itemtxt2}>{item.property_address},{item.property_city},{item.property_state}</Text>
                        </View>
                    </View>

            </TouchableOpacity>
        )
    }

    showDialog=(status)=>{
        this.setState({isDialogVisible:status});
    }
    checkmanagestatus=(_item)=>{
        let downloadpropertiesattende = (this.props.login && this.props.login.downloadpropertiesattende !== null) ? this.props.login.downloadpropertiesattende: [];
        let downloadpropertiesbrokerattende = (this.props.login && this.props.login.downloadpropertiesbrokerattende !== null) ? this.props.login.downloadpropertiesbrokerattende: [];
        let property = downloadpropertiesattende.filter(item=>item.attendee_rec_num === _item.property_record_num );
        let broker = downloadpropertiesbrokerattende.filter(item =>item.property_record_num === _item.property_record_num);
        if(property.length && broker.length){
            this.setState({checkmanage: true});
        }
        else {
            this.setState({checkmanage: false});
        }
    }
    itemClick=(item)=>{
        if(item.property_status === 'A'){
            this.refs.modal3.open();
            this.checkmanagestatus(item);
            this.props.setpropertyitem(item);
        }
        else {
            this.props.setpropertyitem(null);
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

    search = (searchText) => {
        this.setState({searchText:searchText});
        this.changesearch();
      };
    clearsearch=()=>{
        this.setState({searchText:''});
        let properties = (this.props.dashboard && this.props.dashboard.properties) ?this.props.dashboard.properties :[];
        this.setState({dashboard:properties});
    }
    changesearch=()=>{
        const {searchText} = this.state;
        let properties = (this.props.dashboard && this.props.dashboard.properties) ?this.props.dashboard.properties :[];
        let res = [];
        
        if(!searchText || searchText===''){
            res =[...properties];
        }
          else if(properties && properties.length) {
            res = properties.filter(item=>item.property_address.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            item.property_city.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || item.property_state.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            item.property_zipcode.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||item.property_price.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
            item.property_mls_num.toLowerCase().indexOf(searchText.toLowerCase()) > -1
            )
        }
        this.setState({dashboard:res});
    } 
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    goproperty=(id)=>{
        this.refs.modal3.close();
        if(id === 1){
            //start open house           
            this.refs.modal2.open();
        }
        else if(id === 2){
            //share this property

            Linking.canOpenURL(Constants.shareurl).then(supported => {
                if (supported) {
                  Linking.openURL(Constants.shareurl);
                } else {
                  console.log("Don't know how to open URI: " + Constants.shareurl);
                }
              });
        }
        else if(id === 3){
            //upload new photo
            
        }
        else if(id === 5){
            //manage
            
        }
        else if(id === 4){
            //cancel
            
        }
    }
    handlehousetype=(id)=>{
        let downloaddisclosure = (this.props.login && this.props.login.downloaddisclosure.length) ?this.props.login.downloaddisclosure : [];
        let getselproperty = (this.props.dashboard && this.props.dashboard.selectedproperty) ? this.props.dashboard.selectedproperty: null;
        if(id === 1){
            if(getselproperty && getselproperty !== null && getselproperty.disclosure_form_required ===1){
                let flag = 0;
                if(downloaddisclosure.length > 0){
                    let disclosure = downloaddisclosure.filter((item)=>item.property_type === getselproperty.property_type && item.state === getselproperty.property_state);        
                    if(disclosure.length > 0){
                        flag = 1;
                    }
                }
                if(flag === 0 ){
                    Alert.alert(
                        'Agency disclosure form has not been downloaded for this property',
                        '',
                    );
                    return ;
                }
                
            }
            let data ={data:getselproperty,type:'public'};
            this.props.sethousehandletype(data);
            this.props.navigation.navigate('startOpenHouseOneScreen');

        }
        else if(id === 2){
            let data ={data:getselproperty,type:'broker'};
            this.props.sethousehandletype(data);
            this.props.navigation.navigate('startOpenHouseOneScreen');
        }
        else if(id === 3){


        }
        this.refs.modal2.close();
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
                <SearchBar
                    // round={true}
                    lightTheme={true}
                    placeholder="Search..."
                    platform={Platform.OS}
                    containerStyle={styles.searchbar}
                    inputContainerStyle={styles.searchbartxt}
                    // showLoading={true}
                    onCancel={this.clearsearch}
                    onClear={this.clearsearch}
                    autoCorrect={false}
                    onChangeText={this.search}
                    
                    value={this.state.searchText}
                    />
                <FlatList
                    data={this.state.dashboard}
                    numColumns={1}
                    keyExtractor={_keyExtractor}
                    renderItem={this._renderItem}
                />
                <Modal style={[styles.modal, styles.modal2]} position={"center"} ref={"modal2"} >
                    <View style={styles.modalview_head}>
                        <Text style={{fontSize: 15, fontWeight:'bold'}}>Choose Open House Type</Text>
                        <Text style={{fontSize: 15, fontWeight:'bold'}}>Is this a Broker or Public Open House?</Text>
                    </View>
                    {/* <View style={styles.modalview}>
                        <Text style={{fontSize: 15, fontWeight:'bold'}}>Is this a Broker or Public Open House?</Text>
                    </View> */}
                    <TouchableOpacity style={styles.modalview} onPress={()=>this.handlehousetype(1)}>
                        <Text>Public</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalview} onPress={()=>this.handlehousetype(2)}>
                        <Text>Broker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalview} onPress={()=>this.handlehousetype(3)}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </Modal>
                
                <Modal style={[styles.modal, this.state.checkmanage? styles.modal4 :styles.modal3]} position={"bottom"} ref={"modal3"} >
                    <TouchableOpacity style={styles.modalview} onPress={()=>this.goproperty(1)}>
                        <View style={styles.modalimgviewcontainer}>
                            <Image
                                style={styles.modalimg}
                                imageStyle={styles.mdoalimgsty}
                                source={Images.start_openhouse}
                            />
                        </View>
                        <View style={styles.modaltxtview}>
                            <Text style={styles.modaltxt}>Start Open House</Text>
                        </View>    
                    </TouchableOpacity>
                    {this.state.checkmanage && (
                        <TouchableOpacity style={styles.modalview} onPress={()=>this.goproperty(5)}> 
                            <View style={styles.modalimgviewcontainer}>
                                <Image
                                    style={styles.modalimg}
                                    imageStyle={styles.mdoalimgsty}
                                    source={Images.manage_attendees}
                                />
                            </View>
                            <View style={styles.modaltxtview}>
                                <Text style={styles.modaltxt}>View Property Attendees</Text>
                            </View>    
                        </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity style={styles.modalview} onPress={()=>this.goproperty(2)}> 
                        <View style={styles.modalimgviewcontainer}>
                            <Image
                                style={styles.modalimg}
                                imageStyle={styles.mdoalimgsty}
                                source={Images.share_property}
                            />
                        </View>
                        <View style={styles.modaltxtview}>
                            <Text style={styles.modaltxt}>Share This Property</Text>
                        </View>    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalview} onPress={()=>this.goproperty(3)}> 
                        <View style={styles.modalimgviewcontainer}>
                            <Image
                                style={styles.modalimg}
                                imageStyle={styles.mdoalimgsty}
                                source={Images.add_photo}
                            />
                        </View>
                        <View style={styles.modaltxtview}>
                            <Text style={styles.modaltxt}>Upload New Photo</Text>
                        </View>    
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalview} onPress={()=>this.goproperty(4)}>
                        <View style={styles.modalimgviewcontainer}>
                            <Image
                                style={styles.modalimg}
                                imageStyle={styles.mdoalimgsty}
                                source={Images.cancel}
                            />
                        </View>
                        <View style={styles.modaltxtview}>
                            <Text style={styles.modaltxt}>Cancel</Text>
                        </View>    
                    </TouchableOpacity>
                </Modal>
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
        width: Dimensions.get('window').width*0.96,
        height: Dimensions.get('window').width*0.6,
        marginLeft:Dimensions.get('window').width*0.02,
        marginRight:Dimensions.get('window').width*0.02,
        marginBottom:5,
        marginTop:5,

    },
    itemview:{
        width: '100%',
        height: '100%',
        resizeMode:"stretch",
    },
    itemview1:{
        borderRadius: 10,
    },
    itemimg:{
        width: '80%',
        height: '80%',
        resizeMode:"contain",
        margin:'10%',

    },
    itemimgview:{
        height: Dimensions.get('window').width*0.1,
        width: Dimensions.get('window').width*0.1,
        borderWidth: 1,
        borderColor: '#CDCECD',
        marginTop: 15,
        backgroundColor:'white',
    },
    itemtxtview:{
        width: '98%',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    itemtxt:{
        color:'white',
    },
    itemtxt2:{
        fontSize: 12,
        color:'white',
        marginTop: 4,
    },
    itmeimgcontainer:{
        width: '100%',
        backgroundColor:'#524e4ec2',
        height: 50,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
        position:'absolute',
        padding: 5,
        bottom:0,
    },
    searchbar:{
        backgroundColor:'#F4F4F4'
    },
    searchbartxt:{
        backgroundColor:'white'
    },
    modal: {
        // justifyContent: 'center',
        alignItems: 'center'
    },
    
    modal2: {
        height: 200,
        width: '90%',
        borderRadius: 5,        
        // backgroundColor: "#3B5998"
    },
    
    modal3: {
        height: 250,
        width: '96%',
        bottom: 10,
        borderRadius: 5,        
    },
    modal4: {
        height: 300,
        width: '96%',
        bottom: 10,
        borderRadius: 5,        
    },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },
    modalview:{
        width: '90%',
        flexDirection:'row',
        paddingTop:10,
        paddingBottom: 10,
       
    },
    modalview_head:{
        width: '90%',
        paddingTop:10,
        paddingBottom: 10,
       
    },
    modalimg:{
        width: 40,
        height: 40,
    },
    mdoalimgsty:{
        width: 40,
        height: 40,
        alignSelf:'center',
        alignItems:'center',
    },
    modaltxt:{
        fontSize: 16,
        marginLeft: 10,
        // textAlign:'center',
        justifyContent:'center',
        
    },
    modalimgviewcontainer:{
        width: 50,
        justifyContent:'center',alignContent:'center'
    },
    modaltxtview:{
        width: '80%',
        justifyContent:'center',
        borderBottomWidth:1,
        borderBottomColor:'#D4D4D4',
    }
    

};


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        logout : Actions.logout,
        setpropertyitem : Actions.setpropertyitem,
        sethousehandletype : Actions.sethousehandletype,
        
    }, dispatch);
}

function mapStateToProps({login,dashboard})

{
    return {
        login: login,
        dashboard:dashboard,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyScreen);
