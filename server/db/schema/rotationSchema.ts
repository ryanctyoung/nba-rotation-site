import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity('rotations')
export default class Rotation {
    @PrimaryColumn("text")
    GAME_ID: string

    @PrimaryColumn({type: 'int4'})
    PLAYER_ID: number

    @Column("text")
    PLAYER_NAME: string

    @Column("text")
    SUBS: string

    @Column({type: 'int4'})
    TEAM_ID: number
}