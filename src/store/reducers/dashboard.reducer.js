import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as Actions from '../actions';
import {CREATE_PROPERTY_ITEM_START} from "../actions/Dashboard.actions";

export const initialState = {
    status: 10,
    properties: null,
    loadingtxt: '',

    createproperty: null,

    selectedproperty:null,

    makehousedata:{},
    mortgageitem:null,

    agentinfo: null,
    
    createagentitem:null,

}

const dashboard = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.USER_INIT:{
            return {
                ...initialState
            }
        }
        case Actions.USER_LOG_OUT:{
            return {
                ...initialState,
            }
        }
        case Actions.GET_PROPERTIES_START:{
            return {
                ...state,
                loadingtxt:'Updating Properties...',
                status: 100,
                properties: null,
            }
        }
        case Actions.GET_PROPERTIES_SUCCESS:{
            return {
                ...state,
                status: 200,
                properties:action.payload,
            }
        }
        case Actions.GET_PROPERTIES_FAILD:{
            return {
                ...state,
                status: 400,
                properties: null
            }
        }
        case Actions.CREATE_PROPERTY_ITEM_START:{
            return {
                ...state,
                status: 100,
                createproperty:null,
            }
        }
        case Actions.CREATE_PROPERTY_ITEM_SUCCESS:{
            return {
                ...state,
                status : 200,
                createproperty: action.payload,
                properties:[action.payload,...state.properties],
            }
        }
        case Actions.CREATE_PROPERTY_ITEM_FAILD:{
            return {
                ...state,
                status: 400,
                createproperty: null,
            }
        }
        case Actions.SELECT_PROPERTY_ITEM_START:{
            return{
                ...state,
                selectedproperty: null,
            }
        }
        case Actions.SELECT_PROPERTY_ITEM_SUCCESS:{
            return {
                ...state,
                selectedproperty: action.payload,
            }
        }
        case Actions.SELECT_PROPERTY_ITEM_FAILD:{
            return {
                ...state,
                selectedproperty: null,
            }
        }
        case Actions.UPDATE_HOUSE_HANDLE_TYPE_START:{
            return {
                ...state,
                makehousedata:{...state.makehousedata},
            }
        }
        case Actions.UPDATE_HOUSE_HANDLE_TYPE_SUCCESS:{
            return {
                ...state,
                makehousedata:{...state.makehousedata,...action.payload},
            }
        }
        case Actions.UPDATE_HOUSE_HANDLE_TYPE_FAILD:{
            return {
                ...state,
                makehousedata:{...state.makehousedata,...action.payload}
            }
        }
        case Actions.SELECT_MORTGAGE_ITEM_START:{
            return {
                ...state,
                mortgageitem:null,
            }
        }
        case Actions.SELECT_MORTGAGE_ITEM_SUCCESS:{
            return {
                ...state,
                mortgageitem:action.payload,
            }
        }
        case Actions.SELECT_MORTGAGE_ITEM_FAILD:{
            return {
                ...state,
                mortgageitem:null,
            }
        }
        case Actions.CREATE_NEW_AGENT_INFO_ITEM_START:{
            return {
                ...state,
                agentinfo: null,
            }
        }
        case Actions.CREATE_NEW_AGENT_INFO_ITEM_SUCCESS:{
            return {
                ...state,
                agentinfo: action.payload,
            }
        }
        case Actions.CREATE_NEW_AGENT_INFO_ITEM_FAILD:{
            return {
                ...state,
                agentinfo: null,
            }
        }
        case Actions.POST_NEW_ATTENDEE_ITEM_START:{
            return {
                ...state,
                status: 100,
                createagentitem:null,
                loadingtxt:'Synchronizing Data...',
            }
        }
        case Actions.POST_NEW_ATTENDEE_ITEM_SUCCESS:{
            return {
                ...state,
                status: 200,
                createagentitem: action.payload
            }
        }
        case Actions.POST_NEW_ATTENDEE_ITEM_FAILD:{
            return {
                ...state,
                status: 400,
                createagentitem: null,
            }
        }
        default:
        {
            return state
        }
    }
}
const persistConfig = {
    key: 'dashboard',
    storage: storage,
    // blacklist: ['bLoginStart','regionId']
};
export default persistReducer(persistConfig, dashboard);