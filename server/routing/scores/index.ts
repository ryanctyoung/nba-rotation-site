import express from "express"
import { AppDataSource } from '../../db/index.js';
import Score from "../../db/schema/scoreSchema.js";

const MainScoreRouter = express.Router();
const db = AppDataSource;

// List Score - parameters: gameId
MainScoreRouter.get('/', async (req, res) => {
  const { gameId } = req.query;

  console.log(`GET Score for game ${gameId}`);

  await db.query(`SELECT "gameId", "scoreHome", "scoreAway", "gameTime"
    FROM
        (SELECT "gameId", "scoreHome", "scoreAway", "gameTime",
         ROW_NUMBER() OVER( PARTITION BY g."gameId",
         g."gameTime"
         ) AS row_num
        FROM public.score_histories as g 
        WHERE g."gameId"='${gameId}') t
        WHERE t.row_num = 1`)
        .then((data) => {
          const objs = data.map((score: Score) => ({
            gameId: score.gameId,
            teamId: score.teamId,
            scoreHome: score.scoreHome,
            scoreAway: score.scoreAway,
            location: score.location,
            gameTime: score.gameTime,
          }))
          res.json(objs)
        })

  // await db
  //   .createQueryBuilder()
  //   .select("score")
  //   .from(Score, "score")
  //   .where(":gameId = score.gameId", { gameId })
  //   .getMany()
  //   .then((data) => {
  //     const objs = data.map(score => ({
  //       gameId: score.gameId,
  //       teamId: score.teamId,
  //       scoreHome: score.scoreHome,
  //       scoreAway: score.scoreAway,
  //       location: score.location,
  //       gameTime: score.gameTime,
  //     }))
  //     res.json(objs)
  //   });
});

export default MainScoreRouter;