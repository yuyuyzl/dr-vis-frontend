import React from 'react';
import './App.less';
import { BrowserRouter, Route, } from "react-router-dom";
import PatientPage from "../module/PatientPage";
import Nav from "../module/Nav";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Nav/>
                <div className="container">
                    <Route path={"/"} exact>
                        Index
                    </Route>
                    <Route path={"/patient/:pdid"} render={route=><PatientPage pdid={route.match.params.pdid}/>}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
