import React, { useState, useRef, useEffect, useMemo } from 'react'
import { area, groups, scaleLinear, scaleBand, select, axisBottom, axisLeft, line, curveBasis } from 'd3'
import { Rotation } from '../../types/rotation'

const seconds_per_game:number = 60 * 12 * 4
const seconds_per_period:number = seconds_per_game / 4
// const time_axis = [Array(seconds_per_game).keys()]


const margin = {top: 60, right: 30, bottom: 20, left:110},
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

    const X_LIMITS = [-20, 120];
    const X_SCALE_PADDING = 20;


export default function RotationChart(props: Readonly<{
    rotations: Rotation[],
}>) {
    const { rotations } = props
    const svgRef = useRef(null);
    const axesRef = useRef(null);
    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;

    // X Axis use Memo
    const xScale = useMemo(() => {
        return scaleLinear().domain(X_LIMITS).range([10, boundsWidth]).nice()
    }, [rotations, width])

    // X Axis Use Effect
    useEffect(() => {
        const svgElement = select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = axisBottom(xScale);
        svgElement
          .append("g")
          .attr(
            "transform",
            "translate(0," + (boundsHeight + X_SCALE_PADDING) + ")"
          )
          .call(xAxisGenerator);
      }, [xScale, boundsHeight]);

    useEffect(() => {
        const svg = select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                `translate(${margin.left}, ${margin.top})`);

        const yScale = scaleLinear()
            .domain([0, 1])
            .range([ height, 0]);


        const playerNames = rotations.map(r => r.player_name)
        const yGroup = scaleBand()
            .domain(playerNames)
            .range([0, height])
            .paddingInner(1)
        
        svg.append("g")
            .call(axisLeft(yGroup));
    
        const subHistories:{player:string, data:Array<number[]>}[] = []
        
        rotations.forEach((p) => {
            // convert substitution history string to array here
            const stripped = p.subs.substring(1,p.subs.length - 2).split(',').map((s) => Number(s))
            const history = new Array(seconds_per_game).fill(0);
            //const history = new Array(seconds_per_game).fill(0) as number[];

            let i:number = 0
            while(i < stripped.length - 1) {
                for (let j = stripped[i]; j < stripped[i + 1]; j++) {
                    history[j] += 1
                }
                i += 2
            }

            subHistories.push({player: p.player_name, data:history.map((d:number, i:number )=> [i, d])})
        })

        const Gen = line()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]))
        .curve(curveBasis);

        // const new_area = area()
        // .curve(curveBasis)
        // .x((d, i) => xScale(dates[i]))
        // .y0(0)
        // .y1(d => yScale(d[1]));

        // const graph_line = area.lineY1();
        
        // svg.selectAll("areas")
        //     .data(subHistories)
        //     .join("path")
        //         .attr("transform", function(p:{player:string, history:Array<number>}){return("translate(0," + ((yName(p.player) ?? 0 )-height) +")" )})
        //         .datum(function(d){return(d.history)})
        //         .attr("fill", "#69b3a2")
        //         .attr("stroke", "#000")
        //         .attr("stroke-width", 1)
        //         .attr("d", Gen([[0,1],[0,2]]))

    }, [rotations]);


    return (
        <div id='data-viz'>
            <svg ref={svgRef}>
            <g
                width={width}
                height={height}
                transform={`translate(${[margin.left, margin.top].join(",")})`}
            >
                {/* {paths}
                {labels} */}
            </g>
            <g
                width={width}
                height={height}
                ref={axesRef}
                transform={`translate(${[margin.left, margin.top].join(",")})`}
            />
            </svg>
        </div>
)
}