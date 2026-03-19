const SearchBar = ({currentValue, onChange}) =>{
    return(
        <>
        find countries <input 
                            value={currentValue} 
                            onChange={onChange}
                       />
        </>
    )
}

export default SearchBar