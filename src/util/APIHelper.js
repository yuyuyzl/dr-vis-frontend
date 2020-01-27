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
    getAllPatients: async ()=>{
        return (await axios.get(config.apiUrl+"patient")).data.data;
    },
    getPatientById: async (id)=>{
        return await getApi('patient',{pdid:+id});
    },
    getPatientsByName:async (name)=>{
        return (await axios.get(config.apiUrl+"p?name="+name)).data;
    },
    getLabById:async (id)=>{
        return await getApi('lab',{pdid:+id});
    },
};

export default APIHelper;