 export const Square = (children,isSelected, updateBoard, index) =>{
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () =>{
    if (updateBoard) updateBoard(index);
  }
  return(
    <div onClick={handleClick}  className= {className}>
      {children}
    </div>
  )
}