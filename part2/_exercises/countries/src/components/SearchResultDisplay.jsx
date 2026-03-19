const SearchResultDisplay = ({countries, onShowCountry}) => {

    //console.log('Search result display',countries)
    if(countries === null)
    {
        return <></>
    }

    const resultLength = countries.length

    if(resultLength <= 1)
    {
        return <></>
    }

    if(resultLength > 10)
    {
        //console.log(`Too many matches. count: ${resultLength}`)
        return <p>Too many matches, specify another filter</p>
    }

    return(
        <>
            <ul>
            {countries.map(country => 
                <li key={country.name.common}>
                    {country.name.common} <button onClick={() => onShowCountry(country)}>Show</button>
                </li>)}
            </ul>
        </>
    )

    // const match = countries[0]
    // return <CountryView country={match} />
}

export default SearchResultDisplay