import React from 'react';
import '../page/App.less';
import {Link} from "react-router-dom";

export default function Nav(props) {
    return (
        <div className='nav'>
            <div className='container nav-content'>
                <Link to={'/'}>
                    <div className='nav-title'>Dr.Vis</div>
                </Link>
            </div>
        </div>
    )
}