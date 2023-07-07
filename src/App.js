
import './App.css';
import Svgx from './Svgx';
import Display from './display';
import * as d3 from 'd3';
import { useState,useEffect } from 'react';
import csvFilePath from './Data visualization files_all_in_one.csv';
import csvToJSON from './csvreader'
import plotx from './plotx'

function App() {
  const [yr,setYr]=useState(1990)
  const [varname,setVarname]=useState('bwrato_homeownership')
  const [barmax, setBarmax]=useState(100)
  const [title, setTitle]=useState(["Black to White ratio for home ownership"])

  const [data,setData]=useState([]);
  const [us,setUS]=useState({});
  // const [st,setSt]=useState({});
  // //const [states,setStates]=useState({});

useEffect( () => {      
d3.json("https://unpkg.com/us-atlas@2.1.0/us/10m.json").then(function(us) {
fetch(csvFilePath)
.then( response => response.text() )
.then( responseText => {
  var data=csvToJSON(responseText)
  setUS(us)
  setData(data)
    //console.log(data);
  var dfilter=data.filter(d=>+d.CensusYear===yr)
  //console.log(dfilter)
  dfilter.forEach(function(item){
    var d=+item[varname]*100
    item['value']=d
    })
    //console.log(datafilter)
    //setData(dfilter)
   // 
  // console.log(us)
  // console.log(dfilter)
  plotx(us,dfilter,title,barmax,yr)
     
   
})
})
console.log('herehere',varname)
  },[varname,yr]);  

  
  return (
    <div className="App">
      <Display 
               setTitle={setTitle}
               setYr={setYr}
               setVarname={setVarname}
               setBarmax={setBarmax}
              //  varname={varname}
              //  title={title}
              //  us={us}
              //  data={data}
              //  yr={yr}
                              />
      <Svgx yr={yr}
            varname={varname}
            title={title}
            />

    </div>
  );
}

export default App;
