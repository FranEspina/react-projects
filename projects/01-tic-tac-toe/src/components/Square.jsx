export const Square = ({ children, index,  onClickCallback, isSelected }) => {

    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
      if (isSelected === true || isSelected === false) return
      onClickCallback(index)
    }

    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    )
  }
