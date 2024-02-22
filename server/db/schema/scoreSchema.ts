import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity('score_histories')
export default class Score {
    @PrimaryColumn("text")
    GAME_ID: string

    @Column()
    TEAM_ID: number

    @PrimaryColumn()
    PERSON_ID: number

    @Column("text")
    PLAYER_NAME: string

    @Column()
    SCORE_HOME: number

    @Column()
    SCORE_AWAY: number

    @Column("text")
    LOCATION: string

    @PrimaryColumn()
    GAME_TIME: number
}