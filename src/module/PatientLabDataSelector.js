import React from 'react';
import '../page/App.less';
//import APIHelper from "../util/APIHelper";
//import I18N from "./i18n";
import ReactEcharts from "echarts-for-react";
//const i18n=I18N(I18N.getPreferredLanguage());
import ColorHelper from "../util/ColorHelper";

const ch=new ColorHelper();

function PatientLabDataSelector ({patient,rows=5,item,selected,onChartClick}){
    //console.log(props.patient);
    if(!patient)return (<div className={"patient-selector-empty"}>暂无数据</div>);
    const data=[...patient];
    if(data.length===0)return (<div className={"patient-selector-empty"}>暂无数据</div>);
    const heightGrid=100;
    const widthGrid=100;
    const marginGrid=8;
    const lines=Math.ceil(item.length/rows);
    const totHeight=lines*(heightGrid+marginGrid)+marginGrid;
    const totWidth=rows*(widthGrid+marginGrid)+marginGrid;
    const option=({
        animation:false,
        xAxis: item.map((key,i)=>({
            type: 'time',
            gridIndex:i,
            show:false,
        })),
        yAxis: item.map((key,i)=>({
            type: 'value',
            gridIndex:i,
            show:false,
        })),
        grid:item.map((key,i)=>({
            show:true,
            top:(Math.floor(i/rows)*(heightGrid+marginGrid)+marginGrid)*100/totHeight+"%",
            height:heightGrid*100/totHeight+"%",
            left:((i%rows)*(widthGrid+marginGrid)+marginGrid)*100/totWidth+"%",
            width:widthGrid*100/totWidth+"%",
            borderWidth: 0,
            backgroundColor: "#fff",
            shadowColor: (selected&&selected.indexOf(item[i])!==-1)?'rgba(71,167,255,0.8)':'rgba(0, 0, 0, 0.3)',
            shadowBlur: (selected&&selected.indexOf(item[i])!==-1)?4:2,
        })),
        // axisPointer: {
        //     link: {xAxisIndex: 'all'}
        // },
        title:item.map((key,i)=>({
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
            item.map((key,i)=>({
                type:"line",
                name:key,
                data:data.map(event=>[event.date,event[key]]),
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
                    if(onChartClick)
                        item.forEach((key,i)=>{
                            if (echart.containPixel({gridIndex: i}, pointInPixel)) onChartClick(key,i);
                        });
                })
            }}
                          option={option}
                          style={{position:'absolute',top:0,left:0,right:0,bottom:0,height:'unset'}}
            />
        </div>
    )
    
}



export default PatientLabDataSelector;