import axios from 'axios';
import {Constants} from '@commons';

const axios_instance = axios.create({
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});
const axios_instance1 = axios.create({
    headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'},
    withCredentials: false
});

class DashboardService {
    getproperties =  (accountnum) => {
        return new Promise((resolve, reject) => {
            axios_instance.get(`${Constants.BASE_API_URL}/get_properties.php?accountnum=${accountnum}`)
                .then( res => {
                    if(res.status===200) {
                        resolve({data:res.data,IsSuccess:true});
                    }
                    else if(res.status!==200){
                        reject({data:res.data,IsSuccess:false});
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    };
    createProperty =  (accountnum,propertytype,propertyid,propertyaddress,propertycity,propertystate,propertyzipcode,propertyprice,propertytaxes) => {
        let bodyFormData = new FormData();
        bodyFormData.append('accountnum', accountnum);
        bodyFormData.append('propertytype', propertytype);
        bodyFormData.append('propertyid', propertyid);
        bodyFormData.append('propertyaddress', propertyaddress);
        bodyFormData.append('propertycity', propertycity);
        bodyFormData.append('propertystate', propertystate);
        bodyFormData.append('propertyzipcode', propertyzipcode);
        bodyFormData.append('propertyprice', propertyprice);
        bodyFormData.append('propertytaxes', propertytaxes);
        return new Promise((resolve, reject) => {
            axios_instance1.post(`${Constants.BASE_API_URL}/create_property.php`,bodyFormData)
                .then( res => {
                    if(res.status===200) {
                        resolve({data:res.data,IsSuccess:true});
                    }
                    else if(res.status!==200){
                        reject({data:res.data,IsSuccess:false});
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    };

    createnewattendeeagent =  (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('accountnum', data.accountnum);
        bodyFormData.append('propertyrecordnum', data.propertyrecordnum);
        bodyFormData.append('attendeeagentfullname', data.attendeeagentfullname);
        bodyFormData.append('attendeeagenttelephone', data.attendeeagenttelephone);
        bodyFormData.append('attendeeagentcompanyname', data.attendeeagentcompanyname);
        bodyFormData.append('attendeefirstname', data.attendeefirstname);
        bodyFormData.append('attendeelastname', data.attendeelastname);
        bodyFormData.append('attendeeemail', data.attendeeemail);
        bodyFormData.append('attendeetelephone', data.attendeetelephone);
        bodyFormData.append('attendeeworkingwithagentyesorno', data.attendeeworkingwithagentyesorno);
        bodyFormData.append('advertisingid', data.advertisingid);
        bodyFormData.append('uniqueid', data.uniqueid);
        bodyFormData.append('attendeetype', data.attendeetype);
        return new Promise((resolve, reject) => {
            axios_instance1.post(`${Constants.BASE_API_URL}/post_public_oh_attendee_working_with_agent.php`,bodyFormData)
                .then( res => {
                    if(res.status===200) {
                        resolve({data:res.data,IsSuccess:true});
                    }
                    else if(res.status!==200){
                        reject({data:res.data,IsSuccess:false});
                    }
                })
                .catch(error=>{
                    resolve(error);
                })
        });
    };

}
const instance = new DashboardService();
export default instance;