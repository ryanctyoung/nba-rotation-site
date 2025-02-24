export type Score = {
    [key: string]: PropertyKey,
    gameId: string,
    teamId: number,
    personId: number,
    scoreHome: number,
    scoreAway: number,
    location: string,
    gameTime: number,
    playerName: string,
}