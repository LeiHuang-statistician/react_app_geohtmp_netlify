import * as d3 from 'd3';
import * as topojson from "topojson-client";
import stlabel from './stateLabel'

function plotx(us,dfilter,title,crmax,yr){
      
    var rmin=0;
    var rmax=crmax;

  var colortheme=d3.interpolateReds;      
  var statesborder=topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })
  var states=topojson.feature(us, us.objects.states)
                    states.features.forEach((d,i)=>{
                      var datafilter=dfilter.filter(ditem=>+ditem.FIPS==+d.id)
                      //console.log(datafilter)
                      Object.assign(d.properties,datafilter[0]);
                      });
      // console.log('us',us)
      // console.log('state feature',states.features)
      
  var margin = {top: 30, right: 20, bottom: 50, left: 150};
  var widthA = 1000;
  var heightA = 700;
  var fontsize=18;
  var colortheme=d3.interpolateReds;

  var vls=1;
  var ctl=0;

  var titpos=100;


  var path = d3.geoPath();
  var myColor = d3.scaleSequential()
                .interpolator(colortheme)
                .domain([rmin,rmax])

  var svg = d3.select('#svgx')
  .attr("width", widthA + margin.left + margin.right)
  .attr("height", heightA + margin.top + margin.bottom)

  var  svg1=svg.selectAll('.svg1').data([1])
  .enter()
  .append('g')
  .attr('class','svg1')
  .attr('transform', `translate(${margin.left+80},${margin.top+30})`)


  var stateG=svg1.selectAll(".states").data([1])
          .enter()
          .append('g')
          .attr("class", "states")


  stateG.selectAll(".pathid")
    .data(states.features)
    .enter()
    .append('g')
    .attr('class','pathid')
    .attr('id', (d,i)=>`pathid${i}`)
    .append("path")
      .attr("d", path)
      .attr("stroke","black")
      .attr("fill", d=>ctl===1? "none":+d.properties.value===99999? "black" : myColor(+d.properties.value))
          .append('title')
          .text(d=>`value: ${(d.properties.value/100).toFixed(2)}`);

    
    stateG.append("path")
      .attr("class", "state-borders")
      .attr("d", path(statesborder))
      .style("fill", "none")
      .style("stroke","black")
      .style("stroke-width",0.5);

      stateG.selectAll("text")
        .data(states.features)
        .enter()
        .append("text")
              .attr("fill", "black")
              .style('font-family','Helvetica')
              .style('font-weight', 700)
              .style("font-size",fontsize)
              .attr("transform", function(d) {
                  var stl;
                   stl=stlabel(d.properties.name.toUpperCase())
                  var centroid = path.centroid(d);
                  if (stl==="FL") {return `translate(${centroid[0]+10},${centroid[1]})`}
                  if (stl==="DC") {return `translate(${centroid[0]},${centroid[1]+5})`}
                  if (stl==="MD") {return `translate(${centroid[0]},${centroid[1]-10})`}
                  if (stl==="DE") {return `translate(${centroid[0]+5},${centroid[1]})`}
                  if (stl==="RI") {return `translate(${centroid[0]+5},${centroid[1]+3})`}
                  if (stl==="LA") {return `translate(${centroid[0]-5},${centroid[1]})`}
                  if (stl==="NH") {return `translate(${centroid[0]+5},${centroid[1]})`}
                  return `translate(${centroid[0]},${centroid[1]})`
              })
              .attr("text-anchor", "middle")
              .attr("dy", ".35em")
              .text(d=>{
                  var stl;
                  stl=stlabel(d.properties.name.toUpperCase())
                  return stl})
              .style("opacity", d=>vls===1? 1 : 0)

       var colors=[]
       for (var i=rmin;i<=rmax;i++){
           var color=myColor(i)
           colors.push(color)
       }


// Add title to graph
  var til=svg1.append('g')
        .attr('class','title')
        .attr('transform',(d,i)=> `translate( ${titpos*5},-20)`)
  til.selectAll(".tiltext").data(title)
  .enter()
    .append('text')
    .attr("class", "tiltext")
  .text(d=>d)
  .style('font-size', fontsize*1.2)
  .style('font-weight', 600)
  .style('font-family','Helvetica')
  .style("text-anchor", "middle")
  .attr('transform',(d,i)=> `translate(0,${i*20})`)


  svg1.append('g')
  .attr('class','year')
  .append('text')
  .text(yr)
  .style('font-size', fontsize*1.2)
  .style('font-weight', 600)
  .style('font-family','Helvetica')
  .style("text-anchor", "middle")
  .attr('transform',`translate( ${titpos*5},700)`)


  
  var myColor = d3.scaleSequential()
  .interpolator(colortheme)
  .domain([rmin,rmax])
  var colors=[]
  for (var i=rmin;i<=rmax;i++){
      color=myColor(i)
      colors.push(color)
  }

  var svgc=svg1.append('g')
        .attr('id',"colorbar")
  
    var grad = svgc.append('defs')
      .append('linearGradient')
      .attr('id', 'grad')
      .attr('x1', '0%')
      .attr('x2', '100%')
      .attr('y1', '0%')
      .attr('y2', '0%');

    grad.selectAll('stop')
      .data(colors)
      .enter()
      .append('stop')
      .style('stop-color', function(d){ return d; })
      .attr('offset', function(d,i){
        return 100 * (i / (colors.length - 1)) + '%';
      })

      svgc.append('rect')
      .attr('id','colorrect')
      .attr('width', 500)
      .attr('height',15)  /*panel height*/
      .style('fill', 'url(#grad')
      .style("stroke", "black")
      .style("stroke-width", 0.5)
      .attr('transform', `translate(${titpos*2},620)`)

    var xA = d3.scaleLinear()
      .domain([rmin, rmax])
      .range([0, 500])    /*right axis height*/
      .nice()
    var xAxis = d3.axisBottom(xA)
      .ticks(5)
      .tickSize(0)
      .tickFormat(x =>(x/100).toFixed(1))

    const xAxidsG=svgc.append('g')
      .attr("id", "xAxidsG")
      .attr("class", "xAxidsG")
      .style("font-size",12)
      .attr('transform', `translate(${titpos*2},640)`)
      .call(xAxis)
      .select(".domain").remove()


    
      const svgS=document.getElementById("svgx")
      const {x,y,width,height}=svgS.viewBox.baseVal;
      var svgData = document.getElementById("svgx").outerHTML;
      var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
      var svgUrl = URL.createObjectURL(svgBlob);
      const image=document.createElement('img');
      image.src=svgUrl
      //console.log(svgData)
    
      image.addEventListener('load', ()=>{
          const canvas=document.createElement('canvas')
          canvas.width=width;
          canvas.height=height;
          const context=canvas.getContext('2d')
          context.drawImage(image,x,y,width, height)
          //console.log('context',context)
          const link=document.getElementById('link');
          link.href=canvas.toDataURL();
          //console.log(link)
          URL.revokeObjectURL(svgUrl);
      })
    
    
      function printToCart2( ) {
        let popupWinindow;
        let innerContents = document.getElementById("svgx").outerHTML;
        popupWinindow = window.open();
        popupWinindow.document.open();
        popupWinindow.document.write('<body onload="window.print()">' + innerContents );
        popupWinindow.document.close();
      }
      document.querySelector("#download").onclick = function(){
      printToCart2()
      }

}

export default plotx