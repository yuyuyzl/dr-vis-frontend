import React,{ useState,useRef } from 'react';
import '../page/App.less';
//import APIHelper from "../util/APIHelper";
//import I18N from "./i18n";
import ReactEcharts from "echarts-for-react";
//const i18n=I18N(I18N.getPreferredLanguage());
import ColorHelper from "../util/ColorHelper";

const ch=new ColorHelper();

function PatientDataChart({selected,lab,patient,modifiedLab,setModifiedLab,analyze}) {
    //console.log(props.selected[0]);

    const [echart,setEchart]=useState(undefined);
    const [inputPos,setInputPos]=useState(undefined);
    const input=useRef(null);
    if(!analyze)return null;
    if(selected.length<1 && !analyze.predict) return null;
    
    const option=({
        animation:true,
        xAxis: [{
            type: 'time',
            show:true,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 2,
        }],
        yAxis: [
            ...selected.map((key,i)=>({
                name: selected[i],
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
                show: selected.length===0,
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
            right:64+(selected.length>2?selected.length*48-96:0),
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
                const attentionContent=analyze.attention?Object.entries(analyze.attention[index]).filter(o=>o[1]>0).sort((a,b)=>-a[1]+b[1]).map(([k,v])=>`<div>${getCircle(ch.get(k))}${k}: ${(v*100).toFixed(1)}%</div>`).join(""):undefined;
                return `<div><div><b>${params[0].value[0]}</b></div>${valueContent}<div>${attentionContent?`<b>Attention</b></div>${attentionContent}</div>`:''}`
            },
        },
        series:[
            ...selected.map((key,i)=>({
                type:"line",
                name:key,
                data:modifiedLab.map(event=>[event.date,event[key]]),
                yAxisIndex:i,
                symbol:(value,params)=>(analyze.attention&&analyze.attention[params.dataIndex][key]>0)?'circle':'emptyCircle',
                symbolSize:(value,params)=>(analyze.attention?(analyze.attention[params.dataIndex][key])*12+4:8),
                itemStyle: {
                    color: ch.get(key).midColor
                },
                lineStyle:{
                    color: ch.get(key)
                },
                // markPoint: {
                //     data:modifiedLab.map((event,index)=>({
                //         coord:[event.date,event[key]],
                //         value:analyze.attention[index][key].toFixed(2)
                //     })).filter(o=>o.value>0),
                //     //data:[{coord:['2007-08-21',0],value:300}]
                // },

            })),
            analyze.predict&&{
                type:"line",
                name:"Risk",
                data:modifiedLab.map((event,i)=>[event.date,analyze.predict[i]*100]),
                yAxisIndex:selected.length,
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
                    opacity:selected.length===0?0.3:0.1
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
                    opacity:selected.length===0?0.3:0.1
                },
                symbol:"none",
                smooth:0.2,
            }
        ],
        graphic:echart?selected.map((key, selectedIndex) => modifiedLab.map((event,labIndex) => ({
            type: 'circle',
            shape: {r: 8},
            position: [echart.convertToPixel({xAxisIndex: 0}, event.date), echart.convertToPixel({yAxisIndex: selectedIndex}, event[key])],
            draggable: true,
            invisible:true,
            z: 100,
            cursor:"n-resize",
            onmouseup:(e)=>{
                if(e.which===3){
                    let keyModifier=1;
                    setInputPos([e.offsetX+10,e.offsetY-40]);
                    input.current.value=parseFloat(event[key]);
                    input.current.placeholder=parseFloat(lab[labIndex][key]);
                    input.current.select();
                    input.current.onkeydown=e=> {
                        if (e.key === "Enter") {
                            if (input.current.value !== "" && !isNaN(+input.current.value))
                                setModifiedLab(modifiedLab.map(o => o.date === event.date ? {
                                    ...o,
                                    [key]: input.current.value
                                } : o));
                            else if (input.current.value === "")
                                setModifiedLab(modifiedLab.map(o => o.date === event.date ? {
                                    ...o,
                                    [key]: lab[labIndex][key]
                                } : o));
                            setInputPos(undefined);
                        }
                        if (e.key === "Escape") setInputPos(undefined);
                        if (e.key === "Shift") keyModifier = 0.1;
                        if (e.key === "Alt") keyModifier = 0.01;
                    };
                    input.current.onkeyup=e=>{
                        if(e.key==="Shift")keyModifier=1;
                        if(e.key==="Alt")keyModifier=1;
                    };
                    input.current.onwheel=e=>{
                        const delta=Math.round(e.deltaY)*0.01*keyModifier;
                        //console.log(delta);
                        input.current.value=parseFloat((((input.current.value!==""&&!isNaN(+input.current.value))?parseFloat(event[key]):parseFloat(input.current.value))+delta).toPrecision(12));
                        if(!isNaN(input.current.value))setModifiedLab(modifiedLab.map(o => o.date === event.date ? {
                            ...o,
                            [key]: input.current.value
                        } : o));
                    }
                }
            },
            ondrag: (e) => {
                //console.log(event.date, key, echart.convertFromPixel({yAxisIndex: i}, e.offsetY));
                if(inputPos)setInputPos(undefined);
                setModifiedLab(modifiedLab.map(o => o.date === event.date ? {
                    ...o,
                    [key]: echart.convertFromPixel({yAxisIndex: selectedIndex}, e.offsetY)
                } : o))
            }
        }))).reduce((obj, cur) => [...obj, ...cur], []):undefined
    });

    return (
        <div className={"patient-chart"} onContextMenu={e=>e.preventDefault()}>
            <input className={"patient-chart-input"} ref={input}
                   style={inputPos?{top:inputPos[1]+"px",left:inputPos[0]+"px"}:{display:"none"}}/>
            <ReactEcharts onChartReady={
                echart=>{
                    setEchart(echart);
                    echart.getZr().on('click',e=>{
                        if(!e.target)setInputPos(undefined);
                    })
                }
            }
                          option={option}
                          style={{position:'absolute',top:0,left:0,right:0,bottom:0,height:'unset'}}
                          key={selected}
            />
        </div>
    )
}

export default PatientDataChart;