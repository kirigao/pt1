const Filter = (props) => {
  return (
    <div>filter shown with: <input value={props.newFilterValue} onChange={props.handleFilterChange} /></div>
  )
}
export default Filter
