import React from 'react';
import './App.less';
import { BrowserRouter, Route, } from "react-router-dom";
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
