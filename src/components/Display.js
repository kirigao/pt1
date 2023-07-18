import countryServices from '../services/countries.js'
import { useState } from 'react'
const Display = ({ countryList, showImportant, important }) => {
  const [temp, setTemp] = useState(null)
  const [icon, setIcon] = useState(null)
  const [wind, setWind] = useState(null)
  const printTemp = (temp) => {
    return (
      `temperature ${temp} Fahrenheit`
    )
  }
  const handleClick = (event, name) => {
    event.preventDefault()
    showImportant(name)

  }
  const showCountry = (name) => {
    console.log("country showed"
    )
    const country = countryList.find(currentCountry => currentCountry.name.common === name)
    const arr = Object.values(country.languages)
    countryServices.getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1]).then(data => {
      setTemp(data.main.temp)
      setIcon(data.weather[0].icon)
      setWind(data.wind.speed)
    }

    )

    return (

      <div>
        <h1>{country.name.common}</h1>
        <div>
          capital {country.capital}
        </div>
        <div>
          area {country.area}
        </div>
        <div>
          <h3>
            languages:
          </h3>
        </div>
        <div>
          <ul>
            {arr.map(language => <li>{language}</li>)}
          </ul>
        </div>
        <div>
          <img src={country.flags.png}>
          </img>
        </div>
        <div>
          <h2>
            Weather in {country.capital}
          </h2>
        </div>
        <div>
          temperature {temp} Fahrenheit
        </div>
        <div>
          <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
        </div>
        <div>
          wind {wind} m/s
        </div>

      </div>

    )
  }
  if (countryList === null) {
    console.log('null')
    return null
  }
  else if (countryList.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countryList.length === 1) {
    return showCountry(countryList[0].name.common)
  }
  else if (countryList.length <= 10) {
    if (important) {
      return showCountry(important)
    }
    return (
      countryList.map(country => <div>{country.name.common}
        <button onClick={(e) => handleClick(e, country.name.common)}>show</button></div>)
    )
  }
  return (
    null
  )
}

export default Display