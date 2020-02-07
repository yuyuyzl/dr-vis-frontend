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
    if(props.selected.length<1 && !props.analyze.predict) return null;
    const option=({
        xAxis: [{
            type: 'time',
            show:true,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 2,
        }],
        yAxis: [
            ...props.selected.map((key,i)=>({
                name: props.selected[i],
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: ch.get(key).midColor
                    }
                },
                axisLabel: {
                    color: '#000'
                },
                nameTextStyle: {
                    color: '#000'
                },
                offset: i <= 1 ? 0 : i * 48 - 48,
                position: i === 0 ? "left" : "right",
            })),
            {
                type: 'value',
                show: props.selected.length===0,
                min: 0,
                max: 100,
            }
        ],
        grid:{
            show:false,
            borderWidth: 0,
            backgroundColor: "#fff",
            top:32,
            left:48,
            right:64+props.selected.length>1?props.selected.length*48:0,
            bottom:32,
        },
        tooltip : {trigger:"axis"},
        series:[
            ...props.selected.map((key,i)=>({
                type:"line",
                name:key,
                data:props.lab.map(event=>[event.date,event[key]]),
                yAxisIndex:i,
                itemStyle: {
                    color: ch.get(key).midColor
                },
                lineStyle:{
                    color: ch.get(key)
                },
            })),
            {
                type:"line",
                name:"Risk",
                data:props.lab.map((event,i)=>[event.date,props.analyze.predict[i]*100]),
                yAxisIndex:props.selected.length,
                lineStyle:{
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: "#ff0844"
                        }, {
                            offset: 1, color: "#ffb199"
                        }],
                        global: false,
                    },
                    opacity:props.selected.length===0?0.3:0.1
                },
                areaStyle:{
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: "#ff0844"
                        }, {
                            offset: 1, color: "#ffb199"
                        }],
                        global: false,
                    },
                    opacity:props.selected.length===0?0.3:0.1
                },
                symbol:"none",
                smooth:0.2,
            }
        ]
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