import React from 'react';
import '../page/App.less';
import APIHelper from "../util/APIHelper";
import { Link } from "react-router-dom";

export default function Search(props) {
    const [resList,setResList]=React.useState([]);
    const [reqTimeout,setReqTimeout]=React.useState(null);
    const getResult=async (key)=>{
        reqTimeout && clearTimeout(reqTimeout);
        if(key.length>0)
            setReqTimeout(setTimeout(async ()=>setResList(await APIHelper.searchPatient(key)),500))
    };
    const searchInput=React.useRef(null);
    return (
        <div className='search' onClick={()=>{searchInput.current.focus()}}>
            <div className='iconfont icon-search'/>
            <input className='search-input' onChange={e=>getResult(e.target.value)} ref={searchInput}/>
            {resList.length?
                <div className='search-menu'>
                    {resList.map(o => (
                        <Link to={"/patient/" + o.pdid} className='search-menu-item'>
                            <div>
                                {o.name}
                            </div>
                        </Link>
                    ))}
                </div>:null
            }
        </div>
    )
}