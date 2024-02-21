import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity('rotations')
export default class Rotation {
    @PrimaryColumn("text")
    GAME_ID: string

    @PrimaryColumn()
    PLAYER_ID: number

    @Column("text")
    PLAYER_NAME: string

    @Column("text")
    SUBS: string

    @Column()
    TEAM_ID: number
}