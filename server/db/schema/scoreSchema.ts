import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity('score_histories')
export default class Score {
    @PrimaryColumn("text")
    gameId: string

    @Column({type: 'int4'})
    teamId: number

    @Column({type: 'int2'})
    scoreHome: number

    @Column({type: 'int2'})
    scoreAway: number

    @Column("text")
    location: string

    @PrimaryColumn({type: 'int2'})
    gameTime: number
}