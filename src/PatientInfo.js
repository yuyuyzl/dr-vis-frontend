import React from 'react';
import './App.css';
import APIHelper from "./APIHelper";
import I18N from "./i18n";
const i18n=I18N(I18N.getPreferredLanguage());

function InfoColumn(props){
    return (
        <div>
            <div className={"info-title"}>{props.title}</div>
            <div className={"info-content"}>{props.content}</div>
        </div>
    )
}

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
        const patient={...Number.isInteger(this.props.patient)?this.state.patient:this.props.patient};
        patient.gender=patient.gender?i18n.common.male:i18n.common.female;
        patient.death=patient.death===0?i18n.common.no:i18n.common.yes;
        const propertyName=i18n.patient;
        return (
            <div className={"patient-info"}>
                {["name","birthDate","age","gender","height","weight","death","deathDate","deathAge","deathReason"].map(key=>
                    patient[key]?<InfoColumn title={propertyName[key]} content={patient[key]}/>:null
                )}
            </div>
        )
    }
}



export default PatientInfo;