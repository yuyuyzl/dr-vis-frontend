import React from 'react';
import './App.css';
import config from "./config";
import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import Axios from "axios";
import PatientPage from "./PatientPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path={"/"} exact>
                    Index
                </Route>
                <Route path={"/patient/:pdid"} render={route=><PatientPage pdid={route.match.params.pdid}/>}/>
            </BrowserRouter>
        </div>
    );
}

export default App;
