import { DataSource } from "typeorm"
import settings from "./settings.json" assert { type: "json" };
// import Score from './schema/scoreSchema.js';
import Game from './schema/gameSchema.js';
import Rotation from './schema/rotationSchema.js';
import Score from "./schema/scoreSchema.js";

const environment = "development"
const settingsInfo = settings[environment]

export const AppDataSource = new DataSource({
  type: "postgres",
  host: settingsInfo.host,
  port: settingsInfo.port,
  username: settingsInfo.username,
  password: settingsInfo.password,
  database: settingsInfo.database,
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

