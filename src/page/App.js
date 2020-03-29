import React from 'react';
import './App.less';
import { BrowserRouter, Route, } from "react-router-dom";
import Analytics from 'react-router-ga';
import PatientPage from "../module/PatientPage";
import Nav from "../module/Nav";
import Search from "../module/Search";
import Settings from "../module/Settings";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Analytics id="UA-74076320-5">
                    <Nav/>
                    <div className="container">
                        <Route path={"/"} exact>
                            <div className='wrapper-search'>
                                <Search/>
                            </div>
                        </Route>
                        <Route path={"/patient/:pdid"} render={route=><PatientPage pdid={route.match.params.pdid}/>}/>
                        <Route path={"/settings"} exact>
                            <Settings/>
                        </Route>
                    </div>
                </Analytics>
            </BrowserRouter>
        </div>
    );
}

export default App;
