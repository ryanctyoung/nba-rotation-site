import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { scaleLinear, scaleBand, select, axisBottom, line, selectAll, pointer } from 'd3'
import { Rotation } from '../../types/rotation'
import { Score } from '../../types/score'
import ToolTip from './tooltip'
import team_data from '../../static/nba-team-ids.json'
import { logo_map } from '../../generic/logo_mapper';
import './index.css'

const seconds_per_game:number = 60 * 12 * 4
const seconds_per_period:number = seconds_per_game / 4
// const time_axis = [Array(seconds_per_game).keys()]

// INFORMATION LINK ABOUT CURSOR PLACEMENT ON A LINE: https://www.essycode.com/posts/d3-animation-along-path/

const margin = {top: 60, right: 0, bottom: 20, left:150},
  width = 1000 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;
  const DENSITY_BAND_HEIGHT = 80;

  const X_LIMITS = [0, seconds_per_game];
  const X_SCALE_PADDING = 20;

export default function RotationChart(props: Readonly<{
    final_scores:{home_score: number, road_score: number},
    rotations: Rotation[],
    scores: Score[],
    matchup: string,
}>) {
    const {rotations, scores, matchup, final_scores } = props
    const [activeTimeline, setTimeline] = useState<number[][]>([[]])
    const [scoreLine, setScoreLine] = useState<number[][]>([])
    const [values, setValues] = useState<{player:string, data:[[number, number]], team_id: number, id: number}[]>([]);
    const [homeTeam, setHomeTeam] = useState<number>(0)
    const [roadTeam, setRoadTeam] = useState<number>(0)
    const [timeSpot, setTimeSpot] = useState<number>(0)
    const [icons, setIcons] = useState<{home:JSX.Element, road:JSX.Element}>()
    // const [player_names, setPlayerNames] = useState<string[]>([])
    const svgRef = useRef(null);
    const graphRef = useRef(null);
    const axesRef = useRef(null);
    const mainRef = useRef(null);
    const tipRef = useRef(null);

    const boundsWidth = width;
    const boundsHeight = height - margin.top - margin.bottom;

    useEffect(() => {
      if (matchup.length === 0) {
        return 
      }
      const splitString = matchup.split(' ')
      let homeIndex = 0
      let roadIndex = 0

      if (splitString[1] == '@') {
        homeIndex = 2
      } else {
        roadIndex = 2
      }

      const homeId = team_data.find(t => t.abbreviation === splitString[homeIndex])?.teamId ?? 0
      const homeIcon = logo_map[splitString[homeIndex] as keyof typeof logo_map]

      const roadId = team_data.find(t => t.abbreviation === splitString[roadIndex])?.teamId ?? 0
      const roadIcon = logo_map[splitString[roadIndex] as keyof typeof logo_map]

      setHomeTeam(homeId)
      setRoadTeam(roadId)
      setIcons({home: homeIcon, road: roadIcon})
    }, [matchup])

    // convert Rotations raw data to display values
    useEffect(() => {   
      const newActiveTimeline = new Array<number[]>(seconds_per_game).fill([]).map(e => new Array<number>())
      setTimeSpot(0)
      const result = rotations.map((p) => {
            const stripped = p.subs.substring(1,p.subs.length - 1).split(',').map((s) => Math.round(Number(s)/10))
            let rotation_history:Array<number> = new Array(seconds_per_game).fill(0);
            // console.log(`Data for ${p.player_name} is: ${stripped}`)
            let i:number = 0
            while(i < stripped.length - 1) {
              const home_players:string[] = []
              const road_players:string[] = []
                // we ignore OT for now
                for (let j = stripped[i]; j < stripped[i + 1] && j < seconds_per_game; j++) {
                  rotation_history[j] += 1
                  newActiveTimeline[j].push(p.player_id)
                  
                }

                i += 2
            }
            rotation_history[0] = 0
            rotation_history[seconds_per_game - 1] = 0
            let data = rotation_history.map((d:number, i:number )=> [i, d]) as [[number, number]]
            // console.log(`Data for ${p.player_name}: ${data}`)
            return {player: p.player_name, team_id: p.team_id, data, id: p.player_id}
        })
      setTimeline(newActiveTimeline)
      setValues([...result])
      }, [rotations])


    useEffect(()=> {
      const seen = Object.create(null)
      const key_dict:string[] = ['home_score', 'away_score', 'game_time']
      const temp = scores.filter(o => {
        const key = key_dict.map(k => o[k.toString()]).join('|');
        if (!seen[key]) {
          seen[key] = true
          return true
        }
      }).map(o => ([o.game_time, o.home_score - o.away_score]))

      temp.unshift([0, 0])
      temp.push([seconds_per_game-1, final_scores.home_score - final_scores.road_score])
      setScoreLine([...temp])
    },
    [scores])

    const rotation_sort_func = useCallback((a: Rotation,b: Rotation) => {
      if (a.team_id === b.team_id) {
        if (activeTimeline[0].includes(a.player_id)) {
          return -1
        }
        return 0
      }
      else if(a.team_id === homeTeam){
        return -1
      }

      return 1
    }, [activeTimeline])

    const player_names = useMemo(()=> rotations.sort(rotation_sort_func).map(r => r.player_name), [rotations, activeTimeline])
    // const player_map_id_to_names = useMemo(() => rotations.map((r) => ({name: r.player_name, id: r.player_id, team:r.team_id})), [rotations])

    const maxScoreMargin = useMemo(() => {
      let maxMargin = 0;
      scoreLine.map((s) => {
        const margin = Math.abs(s[1])
        maxMargin = margin > maxMargin ? margin: maxMargin
      }, [])
      return maxMargin
    }, [scoreLine])

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
          .tickFormat((_,d) => ['1st QTR', '2nd QTR', '3rd QTR', '4th QTR'][d]);

        svgElement
          .append("g")
          .attr(
            "transform",
            "translate(0," + (boundsHeight + X_SCALE_PADDING) + ")"
          )
          .call(xAxisGenerator)
          .attr('color', 'white');
      }, [xScale, boundsHeight]);



    const yScale = scaleLinear()
        .domain([0, 3])
        .range([ DENSITY_BAND_HEIGHT, 0]);

    const yScoreScale= scaleLinear()
      .domain([maxScoreMargin * -1,maxScoreMargin])
      .range([boundsHeight, 0])
    
    const yGroup = useMemo(()=>{
        return scaleBand()
        .domain(player_names)
        .range([0, boundsHeight])
    }, [[player_names, boundsHeight]])

    const mouseMove = useCallback((e:any) => {
      let i = Math.round(xScale.invert(pointer(e, graphRef.current)[0]));
      if (i < 0 || i >= seconds_per_game) {
        return
      }

      setTimeSpot(i)

      select(tipRef.current)
        .style("opacity", 1)
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
            .attr("padding-left", 15)
    }, [rotations]);

    // Draw player paths
    const home_player_paths = useMemo(() => {
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
        

        return values.filter((player => player.team_id === homeTeam)).map((player:any, i:any) => {
          // console.log(`Drawing the line for ${group.player}:`)

          const path = lineGenerator(player.data);
          return (
            <path
              id={`line-${player.id}`}
              className={`player_line ${player.id}`}
              d={path ?? ''}
              width="50"
              transform={
                "translate(0," + ((yGroup(player.player)?? 0)- DENSITY_BAND_HEIGHT) + ")"
              }
              fill="white"
              fillOpacity={0}
              opacity={0.6}
              onPointerEnter={mouseMove}
              onPointerMove={mouseMove}
              onPointerLeave={mouseLeave}
              stroke='black'
              strokeWidth={3}
              strokeLinejoin="round"

          />
          );
        });
      }, [values]);

      const road_player_paths = useMemo(() => {
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
        

        return values.filter((player => player.team_id === roadTeam)).map((player:any, i:any) => {
          const path = lineGenerator(player.data);
          return (
            <path
              id={`line-${player.id}`}
              className={`player_line ${player.id}`}
              d={path ?? ''}
              width="50"
              transform={
                "translate(0," + ((yGroup(player.player)?? 0)- DENSITY_BAND_HEIGHT) + ")"
              }
              fill="orange"
              fillOpacity={0}
              opacity={0.6}
              onPointerEnter={mouseMove}
              onPointerMove={mouseMove}
              onPointerLeave={mouseLeave}
              stroke='black'
              strokeWidth={3}
              strokeLinejoin="round"

          />
          );
        });
      }, [values]);


      //Highlight paths useEffect()
      useEffect(() => {
        const highlightedPlayers = activeTimeline[timeSpot]
        selectAll(`path[class*="player_line"]`)
          .attr('stroke', 'black')

        highlightedPlayers.map(id => {
          selectAll(`path[id$="${id.toString()}"]`)
          .attr('stroke', 'yellow')
          return
        })
      }, [timeSpot])

      //draw score margin path

      const score_path = useMemo(()=> {
        const lineGenerator = line()
          .x((d) => {
            return xScale(d[0])
          })
          .y((d) => {
            return yScoreScale(d[1]) // use a separate y scale?
        })
      
        if (scores.length === 0) {
            return <></>
        }

        const path = lineGenerator(scoreLine as [number,number][]);
        return (
          <path
            key={'score'}
            className='score_line'
            d={path ?? ''}
            width="50"
            transform={
              "translate(0," + 0 + ")"
            }
            // fill="white"
            // fillOpacity={0}
            opacity={0.8}
            onPointerEnter={mouseMove}
            onPointerMove={mouseMove}
            onPointerLeave={mouseLeave}
            stroke="green"
            strokeWidth={3}
            strokeLinejoin="round"

        />
        );
        
      }, [scoreLine])

    // Animation useEffect
    useEffect(() => {
      // console.log('animation useEffect()')
      selectAll('path.player_line')
        .attr("stroke-dashoffset", seconds_per_game)
        .attr("stroke-dasharray", seconds_per_game)
        .attr('fill-opacity', 0)
        .transition()
        .duration(2200)
        .attr('stroke-dashoffset', 0)
        .attr('fill-opacity', 1);
        
    }, [home_player_paths, road_player_paths])

    // produce player labels for groups
    const labels = useMemo(() => {
      return values.map((group:{player:string, data:[[number, number]], team_id: number, id: number }, i:any) => {
        const color = activeTimeline[timeSpot].find(id => group.id === id) ? 'yellow': 'white'
        return (
          <text
            key={group.id}
            x={-5}
            y={yGroup(group.player)}
            textAnchor="end"
            stroke={color}
            dominantBaseline="text-top"
            fontSize={15}
          >
            {group.player}
          </text>
        );
      });
    }, [values, activeTimeline, timeSpot]);


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
                    {icons?.road}
                    {icons?.home}
                    <g>
                      {score_path}
                      {home_player_paths}
                    </g>
                    <g>
                      {road_player_paths}
                    </g>
                  </svg>
                  {labels}
                
                </g>
                {/* <g></g> */}
              <g
                  width={width}
                  height={height}
                  ref={axesRef}
                  transform={`translate(${[margin.left, 0].join(",")})`}
              />

            </svg>
            <div className='timestamp'>
              {gameTimeStamp(timeSpot)}
              {/* {scoreStamp(homeTeam, roadTeam, scoreLine[timeSpot][1])} */}
            </div>
            {/* <ToolTip
              time={timeSpot}
              /> */}
        </rect>
)
}

const gameTimeStamp = (i:number) => {
    if (i < 0 || i >= seconds_per_game ){
      return 'ERROR'
    }
  
    const quarters_passed = Math.floor(i/seconds_per_period)
    const time_intermediate = seconds_per_period - (i % seconds_per_period)
    const timeStamp = `${Math.floor(time_intermediate / 60).toString().padStart(2,'0')}:${(time_intermediate % 60).toString().padStart(2,'0')}`
    const qtr_dict = ['1st QTR','2nd QTR','3rd QTR','4th QTR','END OF GAME']
  
    return `${qtr_dict[quarters_passed]} ${timeStamp}` 
  
  }

const scoreStamp = (homeId:number, roadId:number, margin:number) => {
  const home_label = team_data.find(team => team.teamId === homeId)
  const road_label = team_data.find(team => team.teamId === roadId)

  if (margin === 0) {
    return 'TIED'
  } else {
    return margin > 0 ? `${home_label} leads by ${margin}` : `${road_label} leads by ${margin}`
  }
}

