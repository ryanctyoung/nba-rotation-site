import React, { useState, useRef, useEffect, useMemo } from 'react'
import { area, groups, scaleLinear, scaleBand, select, axisBottom, axisLeft, line, curveBasis, selectAll, pointer, } from 'd3'
import { Rotation } from '../../types/rotation'
import { Score } from '../../types/score'
import './index.css'

const seconds_per_game:number = 60 * 12 * 4
const seconds_per_period:number = seconds_per_game / 4
// const time_axis = [Array(seconds_per_game).keys()]


const margin = {top: 60, right: 20, bottom: 20, left:170},
    width = 1300 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;
    const DENSITY_BAND_HEIGHT = 80;

    const X_LIMITS = [0, seconds_per_game];
    const X_SCALE_PADDING = 20;


export default function RotationChart(props: Readonly<{
    rotations: Rotation[],
    scores: Score[],
}>) {
    const { rotations, scores } = props
    const svgRef = useRef(null);
    const axesRef = useRef(null);
    const mainRef = useRef(null);
    const tipRef = useRef(null);

    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;

    // Separate players into home and road teams
    const [home_team, road_team] = useMemo(() => {
      if (scores.length === 0) {
        return [[], []]
      }
      const h:Rotation[] = []
      const r:Rotation[] = []

      for(const player of rotations) {
        let sample = scores.find(score => {
          return score.player_id === player.player_id
        })
        // console.log(`H/R Analysis for ${player.player_name}: ${sample?.location === 'h'}`)
        if (sample?.location === 'h') {
          h.push(player)
        } else {
          r.push(player)
        }
      }
      return [h, r]
    }, [rotations, scores])

    const playerNames = useMemo(()=> rotations.map(r => r.player_name) ,[rotations])

    // X Axis use Memo
    const xScale = useMemo(() => {
        return scaleLinear().domain(X_LIMITS).range([0, boundsWidth])
    }, [rotations, boundsWidth])

    // X Axis Use Effect
    useEffect(() => {
        const svgElement = select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = axisBottom(xScale)
          .tickValues([seconds_per_period, seconds_per_period*2, seconds_per_period*3])
          .tickFormat((_,d) => ['1st', '2nd', '3rd'][d]);

        svgElement
          .append("g")
          .attr(
            "transform",
            "translate(0," + (boundsHeight + X_SCALE_PADDING) + ")"
          )
          .call(xAxisGenerator);
      }, [xScale, boundsHeight]);

    // convert Rotations raw data to display values
    const values = useMemo(() => {        
        return rotations.map((p) => {
            const stripped = p.subs.substring(1,p.subs.length - 1).split(',').map((s) => Math.round(Number(s)/10))
            let rotation_history:Array<number> = new Array(seconds_per_game).fill(0);
            // console.log(`Data for ${p.player_name} is: ${stripped}`)
            let i:number = 0
            while(i < stripped.length - 1) {
                // we ignore OT for now
                for (let j = stripped[i]; j < stripped[i + 1] && j < seconds_per_game; j++) {
                  rotation_history[j] += 1
                }
                i += 2
            }
            rotation_history[0] = 0
            rotation_history[seconds_per_game - 1] = 0
            let data = rotation_history.map((d:number, i:number )=> [i, d]) as [[number, number]]
            // console.log(`Data for ${p.player_name}: ${data}`)
            return {player: p.player_name, data}
        })}, [xScale, rotations])

    const yScale = scaleLinear()
        .domain([0, 3])
        .range([ DENSITY_BAND_HEIGHT, 0]);

    
    const yGroup = useMemo(()=>{
        return scaleBand()
        .domain(playerNames)
        .range([0, boundsHeight])
    }, [[playerNames, boundsHeight]])

          
    const mouseOver = function(d:any) {
      select(tipRef.current)
        .style("opacity", 1)
    }

    const mouseMove = function(e:any) {
      select(tipRef.current)
        .style("left", (pointer(e)[0]) + "px")
        .style("top", (pointer(e)[1]) + "px")
    }

    const mouseLeave = function(d:any) {
      select(tipRef.current)
        .style("opacity", 1)
    }


    // UseEffect to set the width and height of the svg
    useEffect(() => {
        select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
    }, [rotations]);

    // Draw paths
    const paths = useMemo(() => {
        const lineGenerator = line()
          .x((d) => {
            
            return xScale(d[0])
          })
          .y((d) => {
            return yScale(d[1])
          })
        
        if (values.length === 0) {
            return <></>
        }
        

        return values.map((group, i) => {
          // console.log(`Drawing the line for ${group.player}:`)
          const path = lineGenerator(group.data);
          return (
            <path
              key={group.player}
              className='player_line'
              d={path ?? ''}
              width="50"
              transform={
                "translate(0," + ((yGroup(group.player)?? 0)- DENSITY_BAND_HEIGHT) + ")"
              }
              fill="white"
              onMouseOver={mouseOver}
              onMouseMove={mouseMove}
              onMouseLeave={mouseLeave}
              fillOpacity={0}
              opacity={0.8}
              stroke="grey"
              strokeWidth={3}
              strokeLinejoin="round"
            />
          );
        });
      }, [values]);


    // Animation useEffect
    useEffect(() => {
      // console.log('animation useEffect()')
      selectAll('path')
        .attr("stroke-dashoffset", seconds_per_game)
        .attr("stroke-dasharray", seconds_per_game)
        .attr('fill-opacity', 0)
        // .on("mouseover", mouseOver)
        // .on("mousemove", mouseMove)
        // .on("mouseleave", mouseLeave)
        .transition()
        .duration(2200)
        .attr('stroke-dashoffset', 0)
        .attr('fill-opacity', 1);
        
    }, [paths])

    // produce player labels for groups
    const labels = useMemo(() => {
      return values.map((group, i) => {
        return (
          <text
            key={i}
            x={-5}
            y={yGroup(group.player)}
            textAnchor="end"
            stroke="white"
            dominantBaseline="text-top"
            fontSize={15}
          >
            {group.player}
          </text>
        );
      });
    }, [values]);


    return (
        <rect id='data-viz'>
            <svg ref={svgRef}>
            <g
                ref={mainRef}
                width={width}
                height={height}
                transform={`translate(${[margin.left, margin.top].join(",")})`}
            >
                {paths}
                {labels}
            </g>
            <g
                width={width}
                height={height}
                ref={axesRef}
                transform={`translate(${[margin.left, margin.top].join(",")})`}
            />

            </svg>
            <rect className='tooltip' ref={tipRef}>
              <rect></rect>
            </rect>
        </rect>
)
}

