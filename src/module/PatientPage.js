import React from 'react';
import '../page/App.less';
// import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import APIHelper from "../util/APIHelper";
import PatientInfo from "./PatientInfo";
import PatientGraph from "./PatientGraph";

class PatientPage extends React.Component{
    constructor(...args){
        super(...args);
        this.state={patient:{},lab:[],analyze:{},selectedGraph:[]}
    }

    async componentDidMount() {
        const [patient,lab]=await Promise.all([APIHelper.getPatientById(this.props.pdid),APIHelper.getLabById(this.props.pdid)]);
        this.setState({patient,lab});
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
                <PatientGraph
                    patient={this.state.lab}
                    item={["cl", "co2", "wbc", "hgb", "urea", "ca" ,"k" , "na", "cre", "p", "alb", "crp", "glu", "amount", "weight", "sys", "dia"]}
                    rows={10}
                    selected={this.state.selectedGraph}
                    onChartClick={(key,i)=>{
                        console.log(key,i);
                        const newSelectedGraph={...this.state.selectedGraph};
                        newSelectedGraph[key]=!newSelectedGraph[key];
                        this.setState({selectedGraph:newSelectedGraph})
                    }}
                />
            </div>
        );
    }

}

export default PatientPage;