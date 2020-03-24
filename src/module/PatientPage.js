import React,{useState,useEffect} from 'react';
import '../page/App.less';
// import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import APIHelper from "../util/APIHelper";
import PatientInfo from "./PatientInfo";
import PatientLabDataSelector from "./PatientLabDataSelector";
import PatientDataChart from "./PatientDataChart";

function PatientPage({pdid}) {
    const [patient, setPatient] = useState(undefined);
    const [lab, setLab] = useState(undefined);
    const [selectedGraph, setSelectedGraph] = useState([]);

    useEffect(() => {
        Promise.all([APIHelper.getPatientById(pdid), APIHelper.getLabById(pdid)])
            .then(([patient, lab]) => {
                setLab(lab);
                setPatient(patient)
            });
    }, [pdid]);


    return (
        <div>
            <div>
                <PatientInfo patient={patient}/>
            </div>
            <PatientDataChart
                lab={lab}
                patient={patient}
                selected={selectedGraph}
            />
            <PatientLabDataSelector
                patient={lab}
                item={["cl", "co2", "wbc", "hgb", "urea", "ca", "k", "na", "cre", "p", "alb", "crp", "glu", "amount", "weight", "sys", "dia"]}
                rows={10}
                selected={selectedGraph}
                onChartClick={(key, i) => {
                    setSelectedGraph(selectedGraph =>
                        selectedGraph.indexOf(key) === -1 ?
                            [...selectedGraph, key] : selectedGraph.filter(a => a !== key));
                }}
                //key={selectedGraph}
            />
        </div>
    );


}

export default PatientPage;