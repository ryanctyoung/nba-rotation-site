import express from "express"
import { AppDataSource } from '../../db/index.js';
import Game from '../../db/schema/gameSchema.js';

const MainGameRouter = express.Router();
const db = AppDataSource;

// List Games - parameters: teamId
MainGameRouter.get('/', async (req, res) => {
  console.log(`GET Games by Team_Id Query`);
  const { teamId } = req.query;

  await db
    .createQueryBuilder()
    .select("game")
    .from(Game, "game")
    .where(":teamId = game.TEAM_ID", { teamId })
    .getMany()
    .then((data) => {
      const objs = data.map(game => ({
        id: game.GAME_ID,
        date: game.GAME_DATE,
        team_id: game.TEAM_ID,
        team_name: game.TEAM_NAME,
        season_id: game.SEASON_ID,
        matchup: game.MATCHUP,
      }))
      res.json(objs)
    });
});

export default MainGameRouter;