import express from 'express';
import cors from 'cors';
import gameRouter from './routing/games/index.js'
import "reflect-metadata";

const corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();

app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Game route map
app.use('/games', gameRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});