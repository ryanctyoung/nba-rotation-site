import { DataSource } from "typeorm"
// import Score from './schema/scoreSchema.js';
import Game from './schema/gameSchema.js';
import Rotation from './schema/rotationSchema.js';
import Score from "./schema/scoreSchema.js";
import {config} from 'dotenv';

config()

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_USER,
  entities: [
    Game,
    Rotation,
    Score
  ],
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized.")
  })
  .catch((err) => {
    console.error("Error during Data Source Initialization", err)
  })

