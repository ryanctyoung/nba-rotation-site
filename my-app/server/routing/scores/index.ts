import express from "express"
import { AppDataSource } from '../../db/index.js';
import Score from "../../db/schema/scoreSchema.js";

const MainScoreRouter = express.Router();
const db = AppDataSource;

// List Score - parameters: gameId
MainScoreRouter.get('/', async (req, res) => {
  const { gameId } = req.query;

  console.log(`GET Score for game ${gameId}`);


  await db
    .createQueryBuilder()
    .select("score")
    .from(Score, "score")
    .where(":gameId = score.GAME_ID", { gameId })
    .getMany()
    .then((data) => {
      const objs = data.map(score => ({
        game_id: score.GAME_ID,
        team_id: score.TEAM_ID,
        player_id: score.PERSON_ID,
        player_name: score.PLAYER_NAME,
        home_score: score.SCORE_HOME,
        away_score: score.SCORE_AWAY,
        location: score.LOCATION,
        game_time: score.GAME_TIME,
      }))
      res.json(objs)
    });
});

export default MainScoreRouter;