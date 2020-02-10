import React from 'react';
import '../page/App.less';
//import APIHelper from "../util/APIHelper";
//import I18N from "./i18n";
import ReactEcharts from "echarts-for-react";
//const i18n=I18N(I18N.getPreferredLanguage());
import ColorHelper from "../util/ColorHelper";

const ch=new ColorHelper();

function PatientDataChart(props) {
    //console.log(props.selected[0]);
    if(props.selected.length<1 && !props.analyze.predict) return null;
    const option=({
        animation:false,
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
                offset: i <= 1 ? 0 : (i * 48 - 48),
                position: i === 0 ? "left" : "right",
            })),
            {
                name: 'Risk',
                type: 'value',
                show: props.selected.length===0,
                min: 0,
                max: 100,
                offset: 0,
            }
        ],
        grid:{
            show:false,
            borderWidth: 0,
            backgroundColor: "#fff",
            top:32,
            left:48,
            right:64+(props.selected.length>2?props.selected.length*48-96:0),
            bottom:32,
        },
        tooltip : {
            trigger:"axis",
            formatter:function (params) {
                //console.log(params);
                const getCircle=(echartColor)=>`<span style="
    display: inline-block;
    margin-right: 5px;
    border-radius: 10px;
    width: 10px;
    height: 10px;
    background-color: ${echartColor.midColor};
"> </span>`;
                const index=params[0].dataIndex;
                const valueContent=params.map(o=>`<div>${o.marker}${o.seriesName}: ${Number(o.value[1]).toFixed(2)}</div>`).join("");
                const attentionContent=Object.entries(props.analyze.attention[index]).filter(o=>o[1]>0).sort((a,b)=>-a[1]+b[1]).map(([k,v])=>`<div>${getCircle(ch.get(k))}${k}: ${(v*100).toFixed(1)}%</div>`).join("");
                return `<div><div><b>${params[0].value[0]}</b></div>${valueContent}<div><b>Attention</b></div>${attentionContent}</div>`
            },
        },
        series:[
            ...props.selected.map((key,i)=>({
                type:"line",
                name:key,
                data:props.lab.map(event=>[event.date,event[key]]),
                yAxisIndex:i,
                symbol:(value,params)=>(props.analyze.attention[params.dataIndex][key]>0)?'circle':'emptyCircle',
                symbolSize:(value,params)=>((props.analyze.attention[params.dataIndex][key])*12+4),
                itemStyle: {
                    color: ch.get(key).midColor
                },
                lineStyle:{
                    color: ch.get(key)
                },
                // markPoint: {
                //     data:props.lab.map((event,index)=>({
                //         coord:[event.date,event[key]],
                //         value:props.analyze.attention[index][key].toFixed(2)
                //     })).filter(o=>o.value>0),
                //     //data:[{coord:['2007-08-21',0],value:300}]
                // },

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