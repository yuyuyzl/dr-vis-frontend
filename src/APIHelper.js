import axios from "axios";
import config from "./config";

config.apiUrl=config.apiUrl+(config.apiUrl.endsWith("/")?"":"/");

const APIHelper={
    getAllPatients: async ()=>{
        return (await axios.get(config.apiUrl+"p")).data;
    },
    getPatientById: async (id)=>{
        return (await axios.get(config.apiUrl+"p/"+id)).data;
    },
    getPatientsByName:async (name)=>{
        return (await axios.get(config.apiUrl+"p?name="+name)).data;
    },
    getLabById:async (id)=>{
        return (await axios.get(config.apiUrl+"lab/"+id)).data;
    }
};

export default APIHelper;