
import plotx from './plotx'
import * as d3 from 'd3'

const Display = ({setYr,setVarname,setTitle,setBarmax}) => {

    const varinfo=[
        {id:1,varnm:"bwrato_homeownership",selectname:"BW ratio HOS",titlename:["Black to White ratio for home ownership"], max:100},
        {id:2,varnm:"BW_poverty",selectname:"BW ratio Poverty",titlename:["Black to White ratio for poverty"],max:450},
        {id:3,varnm:"bwedu",selectname:"BW ratio EDU",titlename:["Black to White ratio for educational attainment","(bachelor's degree or higher for the population aged 25 and older)"], max:150},
        {id:4,varnm:"BW_unemployment",selectname:"BW ratio UNEMPLOY",titlename:["Black to White ratio for unemployment","(for the population 16 years and older)"], max:400},
        {id:5,varnm:"Dissimilarity",selectname:"Dissimilarity Index",titlename:["Dissimilarity Index"],max:100},
        {id:6,varnm:"isolation",selectname:"Isolation Index",titlename:["Isolation Index"],max:100},
        {id:7,varnm:"Interaction",selectname:"Interaction Index",titlename:["Interaction Index"], max:100},
     ]
    // const varlist=["bwrato_homeownership","BW_poverty","bwedu","BW_unemployment","Dissimilarity","isolation","Interaction"]
    // const selectlist=["BW ratio HOS","BW ratio Poverty","BW ratio EDU","BW ratio UNEMPLOY","Dissimilarity Index","Isolation Index","Interaction Index"]
    // const titlelist=["Black to White ratio for home ownership",
    //                   "Black to White ratio for poverty",
    //                   "Black to White ratio for educational attainment <br>(bachelor's degree or higher for the population aged 25 and older)",
    //                   "Black to White ratio for unemployment <br>(for the population 16 years and older)",
    //                   "Dissimilarity Index",
    //                   "Isolation Index",
    //                   "Interaction Index"
    //                 ]
    const years=[1990,2000,2010,2020]

    const varchange=(e)=>{
        d3.select(".svg1").remove();
        var varx=e.target.value
        setVarname(varx)
        var tx=varinfo.filter((item)=>item.varnm===varx)
        var tl=tx[0].titlename
        setTitle(tl)
        setBarmax(tx[0].max)
    }
    
    const yrchange=(e)=>{
        d3.select(".svg1").remove();
        var vary=e.target.value
        setYr(+vary)
    }
  
    return (
    <div className='cs'>
        <select className='sl' name="sl1" onChange={varchange}>
        {varinfo.map((item)=>(
            <option className='op' key={item.id} value={item.varnm}>{item.selectname}</option>
        ))}
        </select> 
        <select className='sl' name="sl2" onChange={yrchange}>
        {years.map((item,i)=>(
            <option className='op' key={i} value={item}>{item}</option>
        ))}
        </select> 
        <div id="dtndiv">
            <p>
            <a href="" id="link" download="image.png">
            <button>Download PNG</button>
            </a>
            </p>
            <p>
                <button id="download">Download PDF</button>
            </p>
        </div>
    </div>
  )
}

export default Display
