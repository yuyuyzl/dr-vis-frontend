import React from 'react';
import '../page/App.less';
//import APIHelper from "../util/APIHelper";
//import I18N from "./i18n";
import ReactEcharts from "echarts-for-react";
//const i18n=I18N(I18N.getPreferredLanguage());
import ColorHelper from "../util/ColorHelper";

const ch=new ColorHelper();

function PatientDataChart(props) {
    console.log(props.selected[0]);
    if(props.selected.length<1) return null;
    const option=({
        xAxis: [{
            type: 'time',
            show:true,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 2,
        }],
        yAxis: [
            {
                name:props.selected[0],
                type: 'value',
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 2,
                position:"left"
            },
            {
                name:props.selected[1],
                type: 'value',
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 2,
                position:"right"
            }
        ],
        grid:{
            show:false,
            borderWidth: 0,
            backgroundColor: "#fff",
            top:32,
            left:64,
            right:64,
            bottom:32,
        },
        tooltip : {trigger:"axis"},
        series:
            props.selected.map((key,i)=>({
                type:"line",
                name:key,
                data:props.lab.map(event=>[event.date,event[key]]),
                xAxisIndex:0,
                yAxisIndex:i,
                itemStyle: {
                    color: ch.get(key).midColor
                },
                lineStyle:{
                    color: ch.get(key)
                },
            }))
    });
    return (
        <div className={"patient-chart"}>
            <ReactEcharts onChartReady={echart=>{}}
                          option={option}
                          style={{position:'absolute',top:0,left:0,right:0,bottom:0,height:'unset'}}
                          key={props.selected}
            />
        </div>
    )
}

export default PatientDataChart;