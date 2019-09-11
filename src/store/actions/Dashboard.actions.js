import {DashboardService} from '@services';

export const GET_PROPERTIES_START   = 'GET_PROPERTIES_START';
export const GET_PROPERTIES_SUCCESS = 'GET_PROPERTIES_SUCCESS';
export const GET_PROPERTIES_FAILD   = 'GET_PROPERTIES_FAILD';

export const CREATE_PROPERTY_ITEM_START   = 'CREATE_PROPERTY_ITEM_START';
export const CREATE_PROPERTY_ITEM_SUCCESS = 'CREATE_PROPERTY_ITEM_SUCCESS';
export const CREATE_PROPERTY_ITEM_FAILD   = 'CREATE_PROPERTY_ITEM_FAILD';

export const SELECT_PROPERTY_ITEM_START     = 'SELECT_PROPERTY_ITEM_START';
export const SELECT_PROPERTY_ITEM_SUCCESS   = 'SELECT_PROPERTY_ITEM_SUCCESS';
export const SELECT_PROPERTY_ITEM_FAILD     = 'SELECT_PROPERTY_ITEM_FAILD';

export const UPDATE_HOUSE_HANDLE_TYPE_START     ='UPDATE_HOUSE_HANDLE_TYPE_START';
export const UPDATE_HOUSE_HANDLE_TYPE_SUCCESS   = 'UPDATE_HOUSE_HANDLE_TYPE_SUCCESS';
export const UPDATE_HOUSE_HANDLE_TYPE_FAILD     = 'UPDATE_HOUSE_HANDLE_TYPE_FAILD';

export const SELECT_MORTGAGE_ITEM_START         = 'SELECT_MORTGAGE_ITEM_START';
export const SELECT_MORTGAGE_ITEM_SUCCESS       = 'SELECT_MORTGAGE_ITEM_SUCCESS';
export const SELECT_MORTGAGE_ITEM_FAILD         = 'SELECT_MORTGAGE_ITEM_FAILD';

export const CREATE_NEW_AGENT_INFO_ITEM_START         = 'CREATE_NEW_AGENT_INFO_ITEM_START';
export const CREATE_NEW_AGENT_INFO_ITEM_SUCCESS       = 'CREATE_NEW_AGENT_INFO_ITEM_SUCCESS';
export const CREATE_NEW_AGENT_INFO_ITEM_FAILD         = 'CREATE_NEW_AGENT_INFO_ITEM_FAILD';

export const POST_NEW_ATTENDEE_ITEM_START         = 'POST_NEW_ATTENDEE_ITEM_START';
export const POST_NEW_ATTENDEE_ITEM_SUCCESS       = 'POST_NEW_ATTENDEE_ITEM_SUCCESS';
export const POST_NEW_ATTENDEE_ITEM_FAILD         = 'POST_NEW_ATTENDEE_ITEM_FAILD';



export function getproperties() {
    return (dispatch,getState)=>{
        dispatch({
            type:GET_PROPERTIES_START,
        });
        let accountnum = (getState().login.account !== null && getState().login.account.account_num) ? getState().login.account.account_num : '';
        (async() =>{
            let res = await DashboardService.getproperties(accountnum);
            if(res.IsSuccess){
                dispatch({
                    type: GET_PROPERTIES_SUCCESS,
                    payload: res.data,
                });
            }
            else {
                dispatch({
                    type: GET_PROPERTIES_FAILD,
                })
            }

        })()
    }
}


export function createproperty(accountnum,propertytype,propertyid,propertyaddress,propertycity,propertystate,propertyzipcode,propertyprice,propertytaxes) {
    return (dispatch)=>{
        dispatch({
            type:CREATE_PROPERTY_ITEM_START,
        });

        (async() =>{
            let res = await DashboardService.createProperty(accountnum,propertytype,propertyid,propertyaddress,propertycity,propertystate,propertyzipcode,propertyprice,propertytaxes);
            if(res.IsSuccess){
                dispatch({
                    type: CREATE_PROPERTY_ITEM_SUCCESS,
                    payload: res.data[0],
                });
            }
            else {
                dispatch({
                    type: CREATE_PROPERTY_ITEM_FAILD,
                })
            }

        })()
    }
}


export function setpropertyitem(item) {
    return (dispatch,getState)=>{
        dispatch({
            type:SELECT_PROPERTY_ITEM_START,
        });
        if(item && item !== null){
            dispatch({
                type:SELECT_PROPERTY_ITEM_SUCCESS,
                payload:item,
            });    
        }
        else {
            dispatch({
                type:SELECT_PROPERTY_ITEM_FAILD,
            });
        }
    }
}


export function sethousehandletype(item) {
    return (dispatch,getState)=>{
        dispatch({
            type:UPDATE_HOUSE_HANDLE_TYPE_START,
        });
        if(item && item !== null){
            dispatch({
                type:UPDATE_HOUSE_HANDLE_TYPE_SUCCESS,
                payload:item,
            });    
        }
        else {
            dispatch({
                type:UPDATE_HOUSE_HANDLE_TYPE_FAILD,
            });
        }
    }
}

export function setmortgageitem(item) {
    return (dispatch,getState)=>{
        dispatch({
            type:SELECT_MORTGAGE_ITEM_START,
        });
        if(item && item !== null){
            dispatch({
                type:SELECT_MORTGAGE_ITEM_SUCCESS,
                payload:item,
            });    
        }
        else {
            dispatch({
                type:SELECT_MORTGAGE_ITEM_FAILD,
            });
        }
    }
}

export function setagentitem(item) {
    return (dispatch,getState)=>{
        dispatch({
            type:CREATE_NEW_AGENT_INFO_ITEM_START,
        });
        if(item && item !== null){
            dispatch({
                type:CREATE_NEW_AGENT_INFO_ITEM_SUCCESS,
                payload:item,
            });    
        }
        else {
            dispatch({
                type:CREATE_NEW_AGENT_INFO_ITEM_FAILD,
            });
        }
    }
}

export function postnewattendeeagent(data) {
    return (dispatch)=>{
        dispatch({
            type:POST_NEW_ATTENDEE_ITEM_START,
        });

        (async() =>{
            let res = await DashboardService.createnewattendeeagent(data);
            if(res.IsSuccess){
                dispatch({
                    type: POST_NEW_ATTENDEE_ITEM_SUCCESS,
                    payload: res.data,
                });
            }
            else {
                dispatch({
                    type: POST_NEW_ATTENDEE_ITEM_FAILD,
                })
            }

        })()
    }
}