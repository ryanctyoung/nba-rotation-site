import express from "express"
import { AppDataSource } from '../../db/index.js';
import Rotation from '../../db/schema/rotationSchema.js'

const MainRotationRouter = express.Router();
const db = AppDataSource;

// List Rotations - parameters: gameId
MainRotationRouter.get('/', async (req, res) => {
  console.log(`GET Rotations by Game_Id Query`);
  const { gameId } = req.query;

  await db
    .createQueryBuilder()
    .select("rotation")
    .from(Rotation, "rotation")
    .where(":gameId = rotation.GAME_ID", { gameId })
    .getMany()
    .then((data) => {
      const objs = data.map(rotation => ({
        game_id: rotation.GAME_ID,
        player_id: rotation.PLAYER_ID,
        player_name: rotation.PLAYER_NAME,
        subs: rotation.SUBS,
        team_id: rotation.TEAM_ID
      }))
      res.json(objs)
    });
});

export default MainRotationRouter;