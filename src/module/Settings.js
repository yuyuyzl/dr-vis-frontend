// eslint-disable-next-line
import React,{useState,useEffect} from 'react';
import '../page/App.less';
import SettingsHelper from "../util/SettingsHelper";

function Settings() {
    const [settings] = useState(SettingsHelper.load());
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
                {settings.analyzeApi.map(api => (
                    <tr key={api.url}>
                        <td>{api.alias}</td>
                        <td>{api.url}</td>
                        <td>{api.enabled ? "启用" : "禁用"}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
    )
}

export default Settings;