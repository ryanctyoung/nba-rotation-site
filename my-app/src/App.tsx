import React, { useState, useEffect } from 'react';
import './App.css';
import request from './generic/api_request'
import TeamDropDown from './components/team_dropdown'
import GameSelect from './components/game_select'
import { Game } from './types/game';


function App() {
  const [teamId, setTeamId] = useState<number>(-1)
  const [gameId, setGameId] = useState<string>("")
  const [gameList, setGameList] = useState<Game[]>([])
  const [rotationList, setRotationList] = useState<number[]>([])

  // API calls
  const fetchGamesbyTeam = (team: number) => {
    if (team === -1) {
      console.log('NO TEAM SELECTED')
      return
    }

    const gameUrl = `games`
    request(gameUrl, {teamId: team}, 'GET')
      .then((data: []) => {
        console.log(data)
        setGameList(data)
      })
  }
  
  const fetchGameRotations = (game: string) => {
    if (game === "") {
      console.log('NO GAME SELECTED')
      return
    }

    const rotationUrl = 'rotations'
    request(rotationUrl, {gameId: game}, 'GET')
      .then((data: []) => {
        console.log(data)
        setRotationList(data)
      })
  }

  useEffect(() => {
    fetchGamesbyTeam(teamId)
  }, [teamId])

  useEffect(() => {
    fetchGameRotations(gameId)
  }, [gameId])

  const select_team_callback = (id: number) => {
    setTeamId(id)
  }

  const select_game_callback = (id: string) => {
    setGameId(id)
  }


  return (
    <div className="App">
      <header className="App-header">
        <TeamDropDown team_callback={select_team_callback}/>
        {teamId !== -1 && <GameSelect games={gameList} callback={select_game_callback}/>}
      </header>
    </div>
  );
}

export default App;
