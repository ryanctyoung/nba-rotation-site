import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import teams_info from '../../static/nba-team-ids.json';
import './index.css';

const defaultLabel:string = 'Select a Team'

export default function TeamDropDown(props: Readonly<{
  team_callback: (e: number) => void,
}>) {
    const [selected_team_label, setTeamLabel] = useState<string>(defaultLabel);
    const callback = props.team_callback;

    function team_options () {
        return(
          teams_info.map((team) =>
          <Dropdown.Item onClick={() => onSelect(team.teamId, team.teamName)} key={team.teamId}>
            {team.teamName}
          </Dropdown.Item>)
        )
    }

    function onSelect (id: number, name: string) {
      callback(id);
      setTeamLabel(name);
    }


    return(
    <Dropdown>
        <Dropdown.Toggle variant='primary'>
          {selected_team_label}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {team_options()}
        </Dropdown.Menu>
    </Dropdown>
    )
}