import axios from "axios";
import config from "../config";

config.apiUrl=config.apiUrl+(config.apiUrl.endsWith("/")?"":"/");
config.predictionUrl=config.predictionUrl+(config.predictionUrl.endsWith("/")?"":"/");

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
};

export default APIHelper;