import React, {useEffect, useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { StripDateString } from '../../generic/date_conversion';
import { logo_map } from '../../generic/logo_mapper';
import './index.css'


import { Game } from '../../types/game';

const defaultLabel:string = 'Select a Game'

export default function GameSelect (props: Readonly<{
    games: Game[],
    callback: (g:Game) => void, 
}>) {  

    const [games, setGames] = useState(props.games)
    const [selectedLabel, setLabel] = useState(defaultLabel)
    const {callback} = props;


    useEffect(() => {
        setLabel(defaultLabel)
        setGames(props.games)
    }, [props.games])

    function onSelect (g:Game) {
        const temp = g;
        if (g.matchup.includes('@')) {
            const score_temp = temp.final_score
            temp.final_score = temp.opponent_score
            temp.opponent_score = score_temp
        }
        callback(temp)
        setLabel(temp.matchup)
      }

    function render_games () {
        
        return(
            games.map((game) =>{
                const splitString = game.matchup.split(' ')
                let firstLogo = logo_map[splitString[0] as keyof typeof logo_map]
                let secondLogo = logo_map[splitString[2] as keyof typeof logo_map]

                return (
                    <Dropdown.Item onClick={() => onSelect(game)} key={game.teamId}>
                        <span className='logo'>
                            {firstLogo}
                        </span>
                         {splitString[1]}
                         <span className='logo'>
                            {secondLogo}
                        </span>
                        {StripDateString(game.date)}
                    </Dropdown.Item>)
            })
          )
    }

    return (
        <div className='game-select'>
            <Dropdown>
                <Dropdown.Toggle variant='primary'>
                    {selectedLabel}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {render_games()}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
