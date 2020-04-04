import React from 'react';
import '../page/App.less';
import {Link} from "react-router-dom";

export default function Nav(props) {
    return (
        <div className='nav'>
            <div className='container nav-content'>
                <Link to={'/'+window.location.search}>
                    <div className='nav-title'>Dr.Vis</div>
                </Link>
                <Link to={'/settings'+window.location.search}>
                    <div className='iconfont icon-icon-test'/>
                </Link>
            </div>
        </div>
    )
}