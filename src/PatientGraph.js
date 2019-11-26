import React from 'react';
import './App.css';
import APIHelper from "./APIHelper";
import I18N from "./i18n";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts"
const i18n=I18N(I18N.getPreferredLanguage());

class PatientGraph extends React.Component{
    constructor(...args){
        super(...args);
        this.state={patient:{}}
    }
    async componentDidMount() {
        if(Number.isInteger(this.props.patient)){
            this.setState({patient:await APIHelper.getLabById(this.props.patient)})
        }
    }
    render() {
        const patient=[...Number.isInteger(this.props.patient)?this.state.patient:this.props.patient];
        if(patient.length===0)return null;
        const option=({
            xAxis: {
                type: 'time',
            },
            yAxis: {
                type: 'value'
            },
            tooltip : {trigger:"axis"},
            legend:{},
            series:
                this.props.item.map(key=>({
                    type:"line",
                    name:key,
                    data:patient.map(event=>[event.date,event[key]])
                }))

        });



        return (
            <div className={"patient-graph"}>
                <ReactEcharts option={option}/>
                <p>{JSON.stringify(patient)}</p>
            </div>
        )
    }
}



export default PatientGraph;