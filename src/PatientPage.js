import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import APIHelper from "./APIHelper";
import PatientInfo from "./PatientInfo";
import PatientGraph from "./PatientGraph";

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
            <div className={"container"}>
                <div>
                    <PatientInfo patient={this.state.patient}/>
                </div>
                <div>
                    <PatientGraph
                        patient={this.state.lab}
                        item={["cl", "co2", "wbc", "hgb", "urea", "ca" ,"k" , "na", "cre", "p", "alb", "crp", "glu", "amount", "weight", "sys", "dia"]}
                    />
                </div>

                <p>
                    {JSON.stringify({patient:this.state.patient,lab:this.state.lab})}
                </p>
            </div>
        );
    }

}

export default PatientPage;