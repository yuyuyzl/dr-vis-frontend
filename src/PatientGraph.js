import React from 'react';
import './App.less';
import APIHelper from "./APIHelper";
//import I18N from "./i18n";
import ReactEcharts from "echarts-for-react";
//const i18n=I18N(I18N.getPreferredLanguage());

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
        console.log(this.props.patient);
        const patient=[...Number.isInteger(this.props.patient)?this.state.patient:this.props.patient];
        if(patient.length===0)return null;
        const heightGrid=100;
        const marginGrid=100;
        const totHeight=this.props.item.length*(heightGrid+marginGrid)+marginGrid;
        const option=({
            xAxis: this.props.item.map((key,i)=>({
                type: 'time',
                gridIndex:i
            })),
            yAxis: this.props.item.map((key,i)=>({
                type: 'value',
                gridIndex:i
            })),
            grid:this.props.item.map((key,i)=>({
                top:(i*(heightGrid+marginGrid)+marginGrid)*100/totHeight+"%",
                height:heightGrid*100/totHeight+"%"
            })),
            tooltip : {trigger:"axis"},
            legend:{},
            series:
                this.props.item.map((key,i)=>({
                    type:"line",
                    name:key,
                    data:patient.map(event=>[event.date,event[key]]),
                    xAxisIndex:i,
                    yAxisIndex:i,
                }))

        });



        return (
            <div className={"patient-graph"}>
                <ReactEcharts option={option} style={{height:"100vh"}}/>
                <p>{JSON.stringify(patient)}</p>
            </div>
        )
    }
}



export default PatientGraph;