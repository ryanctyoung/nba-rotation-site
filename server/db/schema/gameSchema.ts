import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity('games')
export default class Game {
    @PrimaryColumn("text")
    GAME_ID: string

    @Column("text")
    SEASON_ID: string

    @Column({ type: 'date'})
    GAME_DATE: Date

    @Column({type: 'int4'})
    TEAM_ID: number

    @Column("text")
    TEAM_NAME: string

    @Column("text")
    MATCHUP: string

    @Column("int2")
    PTS: number

    @Column("int2")
    PLUS_MINUS:number
}
