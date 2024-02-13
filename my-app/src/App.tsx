import React, { useState, useEffect } from 'react';
import './App.css';
import request from './generic/api_request'
import TeamDropDown from './components/team_dropdown'
import GameSelect from './components/game_select'
import { Game } from './types/game';
import { Rotation } from './types/rotation';
import { Score } from './types/score'
import RotationChart from './components/rotation_chart';


function App() {
  const [teamId, setTeamId] = useState<number>(-1)
  const [gameId, setGameId] = useState<string>("")
  const [gameList, setGameList] = useState<Game[]>([])
  const [rotationList, setRotationList] = useState<Rotation[]>([])
  const [scoreList, setScoreList] = useState<Score[]>([])

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

  const fetchScoreHistory = (game: string) => {
    if (game === "") {
      console.log('NO GAME SELECTED')
      return
    }

    const scoreUrl = 'scores'
    request(scoreUrl, {gameId: game}, 'GET')
      .then((data: []) => {
        console.log(data)
        setScoreList(data)
      })
  }

  useEffect(() => {
    fetchGamesbyTeam(teamId)
    setGameId('')
    setGameList([])
  }, [teamId])

  useEffect(() => {

    if (gameId === "") {
      console.log('NO GAME SELECTED')
      return
    }

    fetchGameRotations(gameId)
    fetchScoreHistory(gameId)
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
        <div>
          NBA Rotation Tracker
        </div>
        <span>
          <TeamDropDown team_callback={select_team_callback}/>
          {teamId !== -1 && <GameSelect games={gameList} callback={select_game_callback}/>}
        </span>
      </header>
      <div className='app-body'>
          {gameId !== '' && <RotationChart rotations={rotationList} scores={scoreList}/>}
      </div>
    </div>
  );
}

export default App;
