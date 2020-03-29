// eslint-disable-next-line
import React,{useState,useEffect} from 'react';
import '../page/App.less';
import SettingsHelper from "../util/SettingsHelper";

function Settings() {
    const [settings,setSettings] = useState(SettingsHelper.load());

    useEffect(()=>{
        SettingsHelper.save(settings);
    },[settings]);

    return (
        <div className='settings'>
            <h3>Settings</h3>
            <table>
                <thead>
                    <tr>
                        <th>别名</th>
                        <th>URL</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                {settings.analyzeApi.map((api,index) => (
                    <tr>
                        <td>{api.alias}</td>
                        <td>{api.url}</td>
                        <td onClick={()=>{
                            setSettings(settings=>{
                                const temp={...settings};
                                temp.analyzeApi[index].enabled=!temp.analyzeApi[index].enabled;
                                return temp;
                            })
                        }}>{api.enabled ? "启用" : "禁用"}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default Settings;