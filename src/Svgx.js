
import * as d3 from 'd3';
import { useState,useRef,useEffect } from 'react';
import csvFilePath from './Data visualization files_all_in_one.csv';
import csvToJSON from './csvreader'
import plotx from './plotx'


const Svgx =  ({yr,varname,title}) => {   
  return (
    <>
      <svg id='svgx' xmlns='http://www.w3.org/2000/svg' viewBox="0 0 1200 800" >
          {/* <rect style={{width:50,height:30}}></rect> */}
      </svg>
    </>
  )
}

export default Svgx
