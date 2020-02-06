import React from 'react';
import '../page/App.less';
//import APIHelper from "../util/APIHelper";
//import I18N from "./i18n";
import ReactEcharts from "echarts-for-react";
//const i18n=I18N(I18N.getPreferredLanguage());
import ColorHelper from "../util/ColorHelper";

const ch=new ColorHelper();

function PatientLabDataSelector (props){
    //console.log(props.patient);
    const patient=[...props.patient];
    if(patient.length===0)return (<div className={"patient-selector-empty"}>暂无数据</div>);
    const heightGrid=100;
    const widthGrid=100;
    const marginGrid=8;
    const rows=props.rows||5;
    const lines=Math.ceil(props.item.length/rows);
    const totHeight=lines*(heightGrid+marginGrid)+marginGrid;
    const totWidth=rows*(widthGrid+marginGrid)+marginGrid;
    const option=({
        xAxis: props.item.map((key,i)=>({
            type: 'time',
            gridIndex:i,
            show:false,
        })),
        yAxis: props.item.map((key,i)=>({
            type: 'value',
            gridIndex:i,
            show:false,
        })),
        grid:props.item.map((key,i)=>({
            show:true,
            top:(Math.floor(i/rows)*(heightGrid+marginGrid)+marginGrid)*100/totHeight+"%",
            height:heightGrid*100/totHeight+"%",
            left:((i%rows)*(widthGrid+marginGrid)+marginGrid)*100/totWidth+"%",
            width:widthGrid*100/totWidth+"%",
            borderWidth: 0,
            backgroundColor: "#fff",
            shadowColor: (props.selected&&props.selected.indexOf(props.item[i])!==-1)?'rgba(71,167,255,0.8)':'rgba(0, 0, 0, 0.3)',
            shadowBlur: (props.selected&&props.selected.indexOf(props.item[i])!==-1)?4:2,
        })),
        // axisPointer: {
        //     link: {xAxisIndex: 'all'}
        // },
        title:props.item.map((key,i)=>({
            text:key,
            textStyle: {
                fontSize: 12,
                fontWeight: 'normal',
                textBorderColor: 'rgba(255, 255, 255, 0.5)',
                textBorderWidth: 2,
            },
            textAlign:"center",
            left:((i%rows)*(widthGrid+marginGrid)+marginGrid+0.5*widthGrid)*100/totWidth+"%",
            top:(Math.floor(i/rows)*(heightGrid+marginGrid)+marginGrid)*100/totHeight+"%",
        })),
        tooltip : {trigger:"axis"},
        //legend:{},
        series:
            props.item.map((key,i)=>({
                type:"line",
                name:key,
                data:patient.map(event=>[event.date,event[key]]),
                xAxisIndex:i,
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
        <div className={"patient-selector"} style={{paddingTop:`${totHeight*100/totWidth}%`}}>
            <ReactEcharts onChartReady={echart=>{
                echart.getZr().on('click',eClick=>{
                    const pointInPixel= [eClick.offsetX, eClick.offsetY];
                    if(props.onChartClick)
                        props.item.forEach((key,i)=>{
                            if (echart.containPixel({gridIndex: i}, pointInPixel)) props.onChartClick(key,i);
                        });
                })
            }}
                          option={option}
                          style={{position:'absolute',top:0,left:0,right:0,bottom:0,height:'unset'}}/>
        </div>
    )
    
}



export default PatientLabDataSelector;