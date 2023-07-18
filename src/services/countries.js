import axios from 'axios'

const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api`
const apiKey = '68bfdfccd78fcd3d5bf6180b3a6169f2'
const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return (
    request.then(response => response.data)
  )
}
const getWeather = (lat, lon) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
  return (
    request.then(response => response.data)
  )
}

export default { getAll, getWeather }