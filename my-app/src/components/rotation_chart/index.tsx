import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { scaleLinear, scaleBand, select, axisBottom, line, selectAll, pointer } from 'd3'
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

const gameTimeStamp = (i:number) => {
  if (i < 0 || i >= seconds_per_game ){
    return 'ERROR'
  }

  const quarters_passed = Math.floor(i/seconds_per_period)
  const time_intermediate = seconds_per_period - (i % seconds_per_period)
  const timeStamp = `${Math.floor(time_intermediate / 60).toString().padStart(2,'0')}:${(time_intermediate % 60).toString().padStart(2,'0')}`
  const qtr_dict = ['1st Qtr','2nd QTR','3rd QTR','4th QTR','END OF GAME']

  return `${qtr_dict[quarters_passed]} ${timeStamp}` 

}


export default function RotationChart(props: Readonly<{
    rotations: Rotation[],
    scores: Score[],
}>) {
    const { rotations, scores } = props
    const [activeTimeline, setTimeline] = useState<string[][]>([[]])
    const [values, setValues] = useState<any>([]);
    const svgRef = useRef(null);
    const graphRef = useRef(null);
    const axesRef = useRef(null);
    const mainRef = useRef(null);
    const tipRef = useRef(null);

    const boundsWidth = width - margin.right - margin.left;
    const boundsHeight = height - margin.top - margin.bottom;

    // Separate players into home and road teams
    // const [home_team, road_team] = useMemo(() => {
    //   if (scores.length === 0) {
    //     return [[], []]
    //   }
    //   const h:Rotation[] = []
    //   const r:Rotation[] = []

    //   for(const player of rotations) {
    //     let sample = scores.find(score => {
    //       return score.player_id === player.player_id
    //     })
    //     // console.log(`H/R Analysis for ${player.player_name}: ${sample?.location === 'h'}`)
    //     if (sample?.location === 'h') {
    //       h.push(player)
    //     } else {
    //       r.push(player)
    //     }
    //   }
    //   return [h, r]
    // }, [rotations, scores])

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
          .tickValues([0, seconds_per_period, seconds_per_period*2, seconds_per_period*3])
          .tickFormat((_,d) => ['1st Qtr', '2nd Qtr', '3rd Qtr', '4th Qtr'][d]);

        svgElement
          .append("g")
          .attr(
            "transform",
            "translate(0," + (boundsHeight + X_SCALE_PADDING) + ")"
          )
          .call(xAxisGenerator)
          .attr('color', 'white');
      }, [xScale, boundsHeight]);

    // convert Rotations raw data to display values

    useEffect(() => {   
      const newActiveTimeline = new Array<string[]>(seconds_per_game).fill([]).map(e => new Array<string>())
     
      const result = rotations.map((p) => {
            const stripped = p.subs.substring(1,p.subs.length - 1).split(',').map((s) => Math.round(Number(s)/10))
            let rotation_history:Array<number> = new Array(seconds_per_game).fill(0);
            // console.log(`Data for ${p.player_name} is: ${stripped}`)
            let i:number = 0
            while(i < stripped.length - 1) {
                // we ignore OT for now
                for (let j = stripped[i]; j < stripped[i + 1] && j < seconds_per_game; j++) {
                  rotation_history[j] += 1
                  newActiveTimeline[j].push(p.player_name)

                }
                i += 2
            }
            rotation_history[0] = 0
            rotation_history[seconds_per_game - 1] = 0
            let data = rotation_history.map((d:number, i:number )=> [i, d]) as [[number, number]]
            // console.log(`Data for ${p.player_name}: ${data}`)
            return {player: p.player_name, data}
        })
      setTimeline(newActiveTimeline)
      setValues([...result])
      }, [rotations])

    const yScale = scaleLinear()
        .domain([0, 3])
        .range([ DENSITY_BAND_HEIGHT, 0]);

    
    const yGroup = useMemo(()=>{
        return scaleBand()
        .domain(playerNames)
        .range([0, boundsHeight])
    }, [[playerNames, boundsHeight]])

    const mouseMove = useCallback((e:any) => {
      let i = Math.round(xScale.invert(pointer(e, graphRef.current)[0]));
      if (i < 0 || i >= seconds_per_game) {
        return
      }
      let playerString = activeTimeline[i].reduce((x, sum) => `${sum}\n${x}`, '')
      const timeStamp = 

      select(tipRef.current)
        .style("opacity", 1)
        .html(`${gameTimeStamp(i)}\n${playerString}`)
        .style("left", (pointer(e, graphRef.current)[0] + 70) + "px")
        .style("top", (pointer(e, graphRef.current)[1] + 60) + "px")
    }, [JSON.stringify(activeTimeline)] )

    const mouseLeave = function(d:any) {
      select(tipRef.current)
        .style("opacity", 0)
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
        

        return values.map((group:any, i:any) => {
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
              fillOpacity={0}
              opacity={0.8}
              onPointerEnter={mouseMove}
              onPointerMove={mouseMove}
              onPointerLeave={mouseLeave}
              stroke="#000000"
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
        .transition()
        .duration(2200)
        .attr('stroke-dashoffset', 0)
        .attr('fill-opacity', 1);
        
    }, [paths])

    // produce player labels for groups
    const labels = useMemo(() => {
      return values.map((group:any, i:any) => {
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
                
                <svg
                  ref={graphRef}
                  className='path-container'

                >
                  {paths}
                </svg>
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

