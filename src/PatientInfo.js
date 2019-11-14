import React from 'react';
import './App.css';
import APIHelper from "./APIHelper";
import I18N from "./i18n";
const i18n=I18N("zh");

class PatientInfo extends React.Component{
    constructor(...args){
        super(...args);
        this.state={patient:{}}
    }
    async componentDidMount() {
        if(Number.isInteger(this.props.patient)){
            this.setState({patient:await APIHelper.getPatientById(this.props.patient)})
        }
    }
    render() {
        const patient=Number.isInteger(this.props.patient)?this.state.patient:this.props.patient;
        const propertyName=i18n.patient;
        return (
            <div className={"patient-info"}>
                {JSON.stringify(propertyName)}
            </div>
        )
    }
}

export default PatientInfo;