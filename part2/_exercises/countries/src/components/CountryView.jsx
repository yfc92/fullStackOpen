const WeatherView = ({weather}) =>{
    if(weather === null)
    {
        //console.log('No weather information available')
        return <></>
    }

    const {locationName, 
        temperature, 
        windSpeed,
        iconUrl} = weather
    return (
        <>
            <h2>Weather in {locationName}</h2>
            <p>Temperature {temperature} Celcius</p>
            <img src={iconUrl} alt="Weather Icon" />
            <p>Wind {windSpeed} m/s</p>
        </>
    )
}

const CountryView = ({country, weather}) =>{
    //console.log(country)
    if(country === null)
    {
        return <></>
    }
    const countryName = country.name.common
    const capital = country.capital[0]
    const area = country.area
    const languageEntries = Object.entries(country.languages)
    const flagUrl = country.flags.png

    //console.log(countryName, capital, area, languageEntries, flagUrl)
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
            <WeatherView weather={weather}/>
        </>
    )
}

export default CountryView