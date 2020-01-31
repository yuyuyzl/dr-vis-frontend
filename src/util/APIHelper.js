import axios from "axios";
import config from "../config";

config.apiUrl=config.apiUrl+(config.apiUrl.endsWith("/")?"":"/");

const getApi=async (api,params)=>{
    return (await axios.get(config.apiUrl+api,{
        params:{
            data:JSON.stringify(params)
        }
    })).data.data;
}

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
        return (await axios.post(config.apiUrl+'analyze',patient)).data;
    }
};

export default APIHelper;