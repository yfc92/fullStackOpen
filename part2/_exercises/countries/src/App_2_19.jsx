import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import SearchBar from './components/SearchBar'
import SearchResultDisplay from './components/SearchResultDisplay'
import CountryView from './components/CountryView'

function App() {
  const [inputCountryName, setInputCountryName] = useState('')
  const [countries, setCountries] = useState(null)
  const [matchedCountries, setMatchedCountries] = useState(null)
  const [shownCountry, setShownCountry] = useState(null)

  ///only query once for efficient searches. assumes that data does not change frequently
  useEffect(() =>{
    countryServices
      .getAll()
      .then(resultCountries =>
        {
          setCountries(resultCountries)
        })
  }, [])

  const handleSearchBarInputChanged = (event) =>{
    const currentValue = event.target.value 
    setInputCountryName(currentValue)

    if(currentValue === null || currentValue === '')
    {
      setMatchedCountries(null)
      setShownCountry(null)
      return
    }

    const matches = countries.filter(
          country => 
            country.name.common.toLowerCase().includes(currentValue.toLowerCase()))
          
    if(matches.length === 1){
      setShownCountry(matches[0])
      setMatchedCountries(null)
    } 
    else{
      //reset shown country
      setShownCountry(null)
      setMatchedCountries(matches)
    } 
  }

  const handleShowCountry = country => setShownCountry(country)

  return (
    <>
      <SearchBar 
        currentValue={inputCountryName} 
        onChange={handleSearchBarInputChanged} 
      />
      <SearchResultDisplay countries={matchedCountries} onShowCountry={handleShowCountry} />
      <CountryView country={shownCountry} />
    </>
  )
}

export default App
