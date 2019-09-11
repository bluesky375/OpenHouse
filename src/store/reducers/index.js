import { combineReducers } from 'redux';
import login from './login.reducer';
import createaccount from './createaccount.reducer';
import dashboard from './dashboard.reducer';



const mainReducers = (asyncReducers) =>
    combineReducers({
        login,
        createaccount,
        dashboard,
        ...asyncReducers
    });

export default mainReducers;
