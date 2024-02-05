import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity('games')
export default class Game {
    @PrimaryColumn("text")
    GAME_ID: string

    @Column("text")
    SEASON_ID: string

    @Column()
    GAME_DATE: Date

    @Column()
    TEAM_ID: number

    @Column("text")
    TEAM_NAME: string

    @Column("text")
    MATCHUP: string
}

// import {EntitySchema} from "typeorm"; 
// import Game from "../model/game.js";

// const GameSchema = new EntitySchema({
//     name: "Game",
//     target: Game,
//     tableName: "games",
//     columns: {
//         GAME_ID: {
//             primary: true,
//             type: "int",
//         },

//         SEASON_ID: {
//             type: "text"
//         },

//         GAME_DATE: {
//             type: "date"
//         },

//         TEAM_ID: {
//             primary: true,
//             type: "int",
//         },

//         TEAM_NAME: {
//             type: "text"
//         },

//         MATCHUP: {
//             type: "text"
//         },
//     },
//     // relationIds: {
//     //     player_ids: {
//     //         relationName: "players"
//     //     },

//     //     attack_ids: {
//     //         relationName: "attacks"
//     //     }
//     // }, 
//     // relations: {
//     //     players: {
//     //         target: "User",
//     //         type: "many-to-many",
//     //         inverseSide: "games",
//     //         nullable: true
//     //     },
//     //     attacks: {
//     //         target: "Attack",
//     //         type: "one-to-many",
//     //         inverseSide: "game",
//     //         nullable: true
//     //     },
//     // },
// });

