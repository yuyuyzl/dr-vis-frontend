import React from 'react';
import '../page/App.less';
import APIHelper from "../util/APIHelper";
import I18N from "../util/i18n";
const i18n=I18N(I18N.getPreferredLanguage());

function InfoColumn(props){
    return (
        <div className={"info-column"}>
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
        patient.height=patient.height?patient.height:i18n.common.nodata;
        patient.weight=patient.weight?patient.weight:i18n.common.nodata;
        const propertyName=i18n.patient;
        return (
            <div className={"patient-info"}>
                {["pdid","age","gender","height","weight","death","deathDate","deathAge","deathReason","deathReasonText","originDisease","diabetes","outcome","duplicate",'scr',
                    'heart_failure',
                    'lung_infect',
                    'chd',
                    'mi',
                    'ci',
                    'ch',
                    'amputation',
                    'urea',
                    'albumin',
                    'hgb',
                    'ca',
                    'p',
                    'pth',
                    'bmi',
                    'epi',
                    'sbp',
                    'dbp',
                    'death_number'].map(key=>
                    patient[key]?<InfoColumn key={key} title={propertyName[key]||key} content={patient[key]}/>:null
                )}
            </div>
        )
    }
}



export default PatientInfo;