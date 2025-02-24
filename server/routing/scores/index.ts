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
    .where(":gameId = score.gameId", { gameId })
    .getMany()
    .then((data) => {
      const objs = data.map(score => ({
        gameId: score.gameId,
        teamId: score.teamId,
        personId: score.personId,
        playerName: score.playerName,
        scoreHome: score.scoreHome,
        scoreAway: score.scoreAway,
        location: score.location,
        gameTime: score.gameTime,
      }))
      res.json(objs)
    });
});

export default MainScoreRouter;