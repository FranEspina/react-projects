import { WINNER_COMBOS } from "./constants"

export function CheckEndBoard(boardToCheck){
    return boardToCheck.every((square) => square !== null)
}

export const CheckWinner = (boardToCheck) => {

    for (const combo of WINNER_COMBOS){
        const [a, b, c] = combo

        if (boardToCheck[a] 
            && boardToCheck[b] === boardToCheck[a] 
            && boardToCheck[c] === boardToCheck[a]) 
        return boardToCheck[a] 
    }
    return null
}