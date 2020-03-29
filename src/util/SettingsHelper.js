const defaultSettings={
    secret:"",
    analyzeApi:[
        {
            url:"http://api.drvis.yuyuyz.ltd:10406/",
            alias:"Adacare",
            enabled:true,
        },
        {
            url:"http://api.drvis.yuyuyz.ltd:10407/",
            alias:"Concare",
            enabled:true,
        },
        {
            url:"http://api.drvis.yuyuyz.ltd:10408/",
            alias:"LM",
            enabled:true,
        },
        {
            url:"http://api.drvis.yuyuyz.ltd:10409/",
            alias:"Stagenet",
            enabled:true,
        },
    ],
};

const load=()=>{
    return(localStorage.settings?JSON.parse(localStorage.settings):defaultSettings)
};

const save=(settings)=>{
    localStorage.settings=JSON.stringify(settings);
};

const reset=()=>{
    localStorage.removeItem('settings')
};

const SettingsHelper={load,save,reset,defaultSettings};

export default SettingsHelper;