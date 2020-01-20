import axios from "axios";
import config from "./config";

config.apiUrl=config.apiUrl+(config.apiUrl.endsWith("/")?"":"/");

const APIHelper={
    getAllPatients: async ()=>{
        return (await axios.get(config.apiUrl+"patient")).data.data;
    },
    getPatientById: async (id)=>{
        return (await axios.get(config.apiUrl+`patient`,{
            params:{
                data:JSON.stringify({
                    pdid:+id
                })
            }
        })).data.data;
    },
    getPatientsByName:async (name)=>{
        return (await axios.get(config.apiUrl+"p?name="+name)).data;
    },
    getLabById:async (id)=>{
        return (await axios.get(config.apiUrl+`lab`,{
            params:{
                data:JSON.stringify({
                    pdid:+id
                })
            }
        })).data.data;
    }
};

export default APIHelper;