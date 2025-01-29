export function saveGameStorage (board, turn){
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn',(turn))
}
export function resetGameStorage(board, turn){
    window.localStorage.removeItem(board)
    window.localStorage.removeItem(turn)
}
 
