import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import SearchBar from './components/SearchBar'
import SearchResultDisplay from './components/SearchResultDisplay'

function App() {
  const [inputCountryName, setInputCountryName] = useState('')
  const [countries, setCountries] = useState(null)
  const [matchedCountries, setMatchedCountries] = useState(null)

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
      return
    }

    const matches = countries.filter(
          country => 
            country.name.common.toLowerCase().includes(currentValue.toLowerCase()))
    //console.log(`Input:${currentValue}, match count:${matches?.length}`)
    setMatchedCountries(matches)
  }

  return (
    <>
      <SearchBar 
        currentValue={inputCountryName} 
        onChange={handleSearchBarInputChanged} 
      />
      <SearchResultDisplay countries={matchedCountries} />
    </>
  )
}

export default App
