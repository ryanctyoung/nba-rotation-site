import { Entity, Column, PrimaryColumn } from "typeorm"

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
