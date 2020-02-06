import React from 'react';
import '../page/App.less';
import APIHelper from "../util/APIHelper";
import { Link,useHistory } from "react-router-dom";

export default function Search(props) {
    const [resList,setResList]=React.useState([]);
    const [reqTimeout,setReqTimeout]=React.useState(null);
    //const [pending,setPending]=React.useState(false);
    const history=useHistory();
    const getResult=(key,instant)=>{
        reqTimeout && clearTimeout(reqTimeout);
        if(key.length>0)
            //setPending(true);
            setReqTimeout(setTimeout(async ()=>{
                const res=await APIHelper.searchPatient(key);
                setResList(res);
                //setPending(false);
                if(instant&&res&&res.length)history.push("/patient/" + res[0].pdid);
                },instant?0:500))
    };
    const searchInput=React.useRef(null);
    return (
        <div className='search' onClick={()=>{searchInput.current.focus()}}>
            <div className='iconfont icon-search'/>
            <input className='search-input'
                   onChange={e=>{
                       getResult(e.target.value);
                   }}
                   onKeyDown={(e)=>{
                       if (e.keyCode===13){
                           getResult(e.target.value,true);
                       }
                   }}
                   ref={searchInput}
            />
            {(resList&&resList.length)?
                <div className='search-menu'>
                    {resList.map(o => (
                        <Link to={"/patient/" + o.pdid} key={o.pdid} className='search-menu-item'>
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