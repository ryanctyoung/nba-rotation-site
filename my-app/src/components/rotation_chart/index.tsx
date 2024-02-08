import React, { useState, useRef, useEffect, useMemo } from 'react'
import { area, groups, scaleLinear, scaleBand, select, axisBottom, axisLeft, line, curveBasis } from 'd3'
import { Rotation } from '../../types/rotation'

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
}>) {
    const { rotations }= props
    const svgRef = useRef(null);
    const axesRef = useRef(null);
    const [homePlayers, setHomePlayers] = useState([])
    const [roadPlayers, setRoadPlayers] = useState([])

    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;

    const playerNames = useMemo(()=> rotations.map(r => r.player_name) ,[rotations])

    // X Axis use Memo
    const xScale = useMemo(() => {
        return scaleLinear().domain(X_LIMITS).range([0, boundsWidth])
    }, [rotations, width])
    // const xScale = scaleLinear()
    //     .domain([0, seconds_per_game])
    //     .range([0, width])

    // X Axis Use Effect
    useEffect(() => {
        const svgElement = select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = axisBottom(xScale).tickValues([seconds_per_period, seconds_per_period*2, seconds_per_period*3]);
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
            const stripped = p.subs.substring(1,p.subs.length - 2).split(',').map((s) => Math.round(Number(s)/10))
            let rotation_history:Array<number> = new Array(seconds_per_game).fill(0);
            //const history = new Array(seconds_per_game).fill(0) as number[];
            console.log(`Max length of time is: ${Math.max(...stripped)}`)
            let i:number = 0
            while(i < stripped.length - 1) {
                // we ignore OT for now
                for (let j = stripped[i]; j < stripped[i + 1] && j < seconds_per_game; j++) {
                  rotation_history[j] += 1
                }
                i += 2
            }

            let data = rotation_history.map((d:number, i:number )=> [i, d]) as [[number, number]]
            console.log(`Data for ${p.player_name}: ${data}`)
            return {player: p.player_name, data}
        })}, [xScale, rotations])

    const yScale = scaleLinear()
        .domain([0, 10])
        .range([ DENSITY_BAND_HEIGHT, 0]);


    const yGroup = useMemo(()=>{
        return scaleBand()
        .domain(playerNames)
        .range([0, boundsHeight])
    }, [[playerNames, boundsHeight]])

    useEffect(() => {
        const svg = select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        // .append("g")
        //     .attr("transform",
        //         `translate(${margin.left}, ${margin.top})`);

        // svg.append("g")
        //     .call(axisLeft(yGroup));

    }, [rotations]);

    const paths = useMemo(() => {
        const lineGenerator = line()
          .x((d) => {
            // console.log(d)
            return xScale(d[0])
          })
          .y((d) => {
            return yScale(d[1])
          })
        
        if (values.length === 0) {
            return <></>
        }
        
        return values.map((group, i) => {
          console.log(`Drawing the line for ${group.player}:`)
          const path = lineGenerator(group.data);
          return (
            <path
              key={i}
              d={path ?? ''}
              transform={
                "translate(0," + ((yGroup(group.player)?? 0)- DENSITY_BAND_HEIGHT) + ")"
              }
              fill="purple"
              opacity={0.8}
              stroke="white"
              strokeWidth={0.3}
              strokeLinejoin="round"
            />
          );
        });
      }, [values]);

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
        <div id='data-viz'>
            <svg ref={svgRef}>
            <g
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
        </div>
)
}