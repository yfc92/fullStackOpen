
const CountryInfo = ({country}) =>{
    console.log(country)
    if(country === null)
    {
        return <></>
    }
    const countryName = country.name.common
    const capital = country.capital[0]
    const area = country.area
    const languageEntries = Object.entries(country.languages)
    const flagUrl = country.flags.png

    console.log(countryName, capital, area, languageEntries, flagUrl)
    return(
        <>
            <h1>{countryName}</h1>
            <p>Capital {capital}</p>
            <p>Area {area}</p>
            <h2>Languages</h2>
            <ul>
                {languageEntries.map(([key, value]) => <li key={key}>{value}</li>)}
            </ul>
            <img src={flagUrl} alt={countryName} />
        </>
    )
}

const SearchResultDisplay = ({countries}) => {
    //console.log('Search result display',countries)
    if(countries === null || countries.length === 0)
    {
        return <></>
    }

    const resultLength = countries.length

    if(resultLength > 10)
    {
        //console.log(`Too many matches. count: ${resultLength}`)
        return <p>Too many matches, specify another filter</p>
    }

    if(resultLength > 1)
    {
        return(
            <>
                <ul>
                {countries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
                </ul>
            </>
        )

    }

    const match = countries[0]
    return <CountryInfo country={match} />
}

export default SearchResultDisplay