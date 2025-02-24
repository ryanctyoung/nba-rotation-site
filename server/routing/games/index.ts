import express from "express"
import { AppDataSource } from '../../db/index.js';
import Game from '../../db/schema/gameSchema.js';

const MainGameRouter = express.Router();
const db = AppDataSource;

// List Games - parameters: teamId
MainGameRouter.get('/', async (req, res) => {
  const { teamId, seasonId } = req.query;
  console.log(`GET Games for team ${teamId} for the ${seasonId} season`);

  await db
    .createQueryBuilder()
    .select("game")
    .from(Game, "game")
    .where(":teamId = game.TEAM_ID AND :seasonId = game.SEASON_ID", { teamId, seasonId })
    .getMany()
    .then((data) => {
      const objs = data.sort(function(a,b) {
        return new Date(b.GAME_DATE).getTime() - new Date(a.GAME_DATE).getTime()
      }).map(game => ({
        id: game.GAME_ID,
        date: game.GAME_DATE,
        team_id: game.TEAM_ID,
        team_name: game.TEAM_NAME,
        season_id: game.SEASON_ID,
        matchup: game.MATCHUP,
        final_score: game.PTS,
        opponent_score: game.PTS - game.PLUS_MINUS
      }))
      res.json(objs)
    });
});

export default MainGameRouter;