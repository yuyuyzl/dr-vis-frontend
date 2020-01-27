import React from 'react';
import '../page/App.less';
import APIHelper from "./util/APIHelper";
//import I18N from "./i18n";
import ReactEcharts from "echarts-for-react";
//const i18n=I18N(I18N.getPreferredLanguage());

class PatientGraph extends React.Component{
    constructor(...args){
        super(...args);
        this.state={prevPatient:[],patient:[],selected:{}};
        if(!Number.isInteger(this.props.patient)){
            this.state.patient=this.props.patient;
        }
    }
    async componentDidMount() {
        if(Number.isInteger(this.props.patient)){
            this.setState({patient:await APIHelper.getLabById(this.props.patient)})
        }
    }

    static getDerivedStateFromProps(props, state) {
        // Any time the current user changes,
        // Reset any parts of state that are tied to that user.
        // In this simple example, that's just the email.
        if (props.patient !== state.prevPatient) {
            return {
                prevPatient: props.patient,
                patient: props.patient,
            };
        }
        return null;
    }

    render() {
        //console.log(this.props.patient);
        const patient=[...this.state.patient];
        if(patient.length===0)return null;
        const heightGrid=100;
        const widthGrid=100;
        const marginGrid=5;
        const rows=this.props.rows||5;
        const lines=Math.ceil(this.props.item.length/rows);
        const totHeight=lines*(heightGrid+marginGrid)+marginGrid;
        const totWidth=rows*(widthGrid+marginGrid)+marginGrid;
        const option=({
            xAxis: this.props.item.map((key,i)=>({
                type: 'time',
                gridIndex:i,
                show:false,
            })),
            yAxis: this.props.item.map((key,i)=>({
                type: 'value',
                gridIndex:i,
                show:false,
            })),
            grid:this.props.item.map((key,i)=>({
                show:true,
                top:(Math.floor(i/rows)*(heightGrid+marginGrid)+marginGrid)*100/totHeight+"%",
                height:heightGrid*100/totHeight+"%",
                left:((i%rows)*(widthGrid+marginGrid)+marginGrid)*100/totWidth+"%",
                width:widthGrid*100/totWidth+"%",
                borderWidth: 0,
                backgroundColor: this.state.selected[i]?'#eee':'#fff',
                shadowColor: 'rgba(0, 0, 0, 0.3)',
                shadowBlur: 2,
            })),
            // axisPointer: {
            //     link: {xAxisIndex: 'all'}
            // },
            title:this.props.item.map((key,i)=>({
                text:key,
                textStyle: {
                    fontSize: 12,
                    fontWeight: 'normal'
                },
                textAlign:"center",
                left:((i%rows)*(widthGrid+marginGrid)+marginGrid+0.5*widthGrid)*100/totWidth+"%",
                top:(Math.floor(i/rows)*(heightGrid+marginGrid)+marginGrid)*100/totHeight+"%",
            })),
            tooltip : {trigger:"axis"},
            //legend:{},
            series:
                this.props.item.map((key,i)=>({
                    type:"line",
                    name:key,
                    data:patient.map(event=>[event.date,event[key]]),
                    xAxisIndex:i,
                    yAxisIndex:i,
                }))

        });
        const clickListeners=this.props.item.map((key,i)=>()=>{
            console.log(key,i);
            this.setState((state)=>{
                state.selected[i]=!state.selected[i];
                return state;
            })
        });

        return (
            <div className={"patient-graph"}>
                <ReactEcharts onChartReady={echart=>{
                    echart.getZr().on('click',eClick=>{
                        const pointInPixel= [eClick.offsetX, eClick.offsetY];
                        for(let i in clickListeners) {
                            if (echart.containPixel({gridIndex: i}, pointInPixel)) clickListeners[i]();
                        }
                    })
                }}
                              option={option} style={{height:"100%"}}/>
            </div>
        )
    }
}



export default PatientGraph;