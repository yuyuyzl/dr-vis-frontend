import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import APIHelper from "./APIHelper";
import PatientInfo from "./PatientInfo";

class PatientPage extends React.Component{
    constructor(...args){
        super(...args);
        this.state={patient:{},lab:[]}
    }

    async componentDidMount() {
        this.setState({patient:await APIHelper.getPatientById(this.props.pdid)});
        this.setState({lab:await APIHelper.getLabById(this.props.pdid)});
    }

    render() {
        return (
            <div>
                <div>
                    <PatientInfo patient={this.state.patient}/>
                </div>
                <p>
                    {JSON.stringify(this.state.patient)}
                </p>
                <p>
                    {JSON.stringify(this.state.lab)}
                </p>
            </div>
        );
    }

}

export default PatientPage;