import React from 'react';
import '../page/App.less';
// import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import APIHelper from "../util/APIHelper";
import PatientInfo from "./PatientInfo";
import PatientGraph from "./PatientGraph";

class PatientPage extends React.Component{
    constructor(...args){
        super(...args);
        this.state={patient:{},lab:[],analyze:{}}
    }

    async componentDidMount() {
        const patient=await APIHelper.getPatientById(this.props.pdid);
        this.setState({patient});
        const lab=await APIHelper.getLabById(this.props.pdid);
        this.setState({lab});
        const analyze=await APIHelper.getAnalyze({patient,lab});
        console.log(analyze);
        this.setState({analyze});
    }

    render() {
        return (
            <div>
                <div>
                    <PatientInfo patient={this.state.patient}/>
                </div>
                <div>
                    <PatientGraph
                        patient={this.state.lab}
                        item={["cl", "co2", "wbc", "hgb", "urea", "ca" ,"k" , "na", "cre", "p", "alb", "crp", "glu", "amount", "weight", "sys", "dia"]}
                        rows={5}
                    />
                </div>
            </div>
        );
    }

}

export default PatientPage;