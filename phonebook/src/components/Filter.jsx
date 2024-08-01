const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div className="form">
      filter shown with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter