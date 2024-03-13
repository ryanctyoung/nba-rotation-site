# NBA Rotation Patterns Visual 

[URL](https://nba-rotation-tracker-716366dfba17.herokuapp.com/)

### Description
A web application pertaining to NBA players, specifically detailing the time each player spent on the court for each game in the current season.



/

### Tech Stack
The frontend was generated using React.js, with API logic handled using Node.js.

Data is pulled and organized from the official NBA stats API using a separate Python script/project. The data is stored on a PostgreSQL instance hosted on ElephantSQL.

The website itself is hosted on as Heroku instance.

/

### Usage
The application takes two parameters in the sidebar: first is the NBA team of choice, and the second is the specific game to be examined. Once selected, the app fetches the relevant data and renders it into the timeline visual.

The timeline consists of two graphs: the players' rotation graph, and the score margin line in the background

/

#### Players' Rotations
Each player that entered the game at any point is rendered on the main graph as their own timeline. The filled sections of the line represent the sections of time they were present in-game.

The players are grouped by team, with the home team stacked on top of the road/away team.

The user can select a specific point of the game to evaluate by hovering the cursor over any of the timelines. The selected time of the game will be present to the right of the graph, and the players on the court at the time will be highlighted yellow.

/

#### Scoring Margin

The line in the background represents the score margin for the game at the related point in time. The higher the y-value of the line, the bigger a lead the home team had at the relevant point of the game. Conversely, the lower the line, the more the score favored the away team.

*Overtime periods are not included or rendered in these graphs.*

/

### Future Improvements
Being a small personal project, there are many features that could be added more in the future, on top of improvements for the existing functionality:

- Score margin line can change color to better indicate concrete lead changes (green for home team, red for away team)
- The specific margin, or how many points exactly the leading team is ahead by, could also be provided, though that would substantially increase the volume of the data to be both pulled from the stats API and added to the client.
- A different selection of the timeline other than simply hovering the cursor, which can be finicky and demands too much of the cursor.