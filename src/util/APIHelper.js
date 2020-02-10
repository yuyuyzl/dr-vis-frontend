import axios from "axios";
import config from "../config";

config.apiUrl=config.apiUrl+(config.apiUrl.endsWith("/")?"":"/");

const getApi=async (api,params)=>{
    return (await axios.get(config.apiUrl+api+window.location.search,{
        params:{
            data:JSON.stringify(params)
        }
    })).data.data;
};

const flipObjectAsArray=(obj)=>{
    const arr=[];
    for(let [key,value] of Object.entries(obj)){
        value.forEach((o,i)=>{
            if(!arr[i])arr[i]={};
            arr[i][key]=o;
        })
    }
    return arr;
};

const APIHelper={
    getPatientById: async (id)=>{
        return await getApi('patient',{pdid:+id});
    },
    searchPatient: async(key)=>{
        return await getApi('search',{key:key});
    },
    getLabById:async (id)=>{
        return await getApi('lab',{pdid:+id});
    },
    getAnalyze:async (patient)=>{
        const res= (await axios.post(config.apiUrl+'analyze'+window.location.search,patient)).data.data;
        if(res&&res.attention)res.attention=flipObjectAsArray(res.attention);
        if(res&&res.predict_next_value)res.predict_next_value=flipObjectAsArray(res.predict_next_value);
        return res;
    }
};

export default APIHelper;