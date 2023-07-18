import { useState, useEffect } from 'react'
import countryServices from './services/countries'
import Display from './components/Display'
import axios from 'axios'

const App = () => {
  const [important, setImportant] = useState(null)
  const [value, setValue] = useState('')
  const [countryData, setCountryData] = useState([])
  const [allCountries, setAllCountries] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY

  const showImportant = (name) => {
    setImportant(name)
  }
  useEffect(() => {
    const countryList = countryServices.getAll()
    console.log(countryList)
    setCountryData(countryList)
  }, [])
  const handleChange = (event) => {
    console.log(event.target.value)
    const val = event.target.value
    setValue(val)
    setImportant(null)
    countryData.then(countries => {
      const temp = countries.filter(countryObject => countryObject.name.common.toLowerCase().includes(val.toLowerCase()))
      setAllCountries(temp)

    })
  }

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange} />
        <Display countryList={allCountries} showImportant={showImportant} important={important} />
      </form>

    </div>
  )
}


export default App