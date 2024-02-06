import React, {useEffect, useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { StripDateString } from '../../generic/date_conversion';

import { Game } from '../../types/game';

const defaultLabel:string = 'Select a Game'

export default function GameSelect (props: Readonly<{
    games: Game[],
    callback: (e:string) => void, 
}>) {  

    const [games, setGames] = useState(props.games)
    const [selectedLabel, setLabel] = useState(defaultLabel)
    const {callback} = props;


    useEffect(() => {
        setGames(props.games)
    }, [props.games])

    function onSelect (id: string, name: string) {
        console.log(id)
        callback(id)
        setLabel(name)
      }

    function render_games () {
        return(
            games.map((game) =>
            <Dropdown.Item onClick={() => onSelect(game.id, game.matchup)} key={game.teamId}>
              {game.matchup} {StripDateString(game.date)}
            </Dropdown.Item>)
          )
    }

    return (
        <div>
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
