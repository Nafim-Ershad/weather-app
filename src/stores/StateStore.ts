import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Weather, type Country } from '@/utils/Types'

export const useStateStore = defineStore('state', () => {
  const theme = ref<boolean>(true) // true = light mode, false = dark mode
  const locationData = ref<Weather | null>(null)
  const isLoading = ref<boolean>(false)
  const showCard = ref<boolean>(false)
  const filteredCountries = ref<Country[]>([])
  const searchQuery = ref<string>('')
  const selectedCountry = ref<Country>({
    id: null,
    name: '',
    region: '',
    country: ''
  })

  const weatherData = ref<any>({})

  function toggleTheme(): void {
    theme.value = !theme.value
  }

  function setLocation(data: any) {
    locationData.value = data.coords
  }

  async function getFilteredCountries() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_WEATHER_API}&q=${searchQuery.value}`
      )
      const data = await response.json()
      // console.log(data)
      filteredCountries.value = data.map((res: any) => ({
        id: res.id,
        name: res.name,
        region: res.region,
        country: res.country
      }))
    } catch (error: any) {
      console.log(error)
    }
  }

  function setQuery(data: Country): void {
    searchQuery.value = `${data.name}, ${data.region}, ${data.country}`
    selectedCountry.value = { ...data }

    // console.log(selectedCountry.value)
  }

  async function getPlaceWeather() {
    isLoading.value = true
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=id:${selectedCountry.value?.id}&days=3&aqi=yes&alerts=no`
      )

      weatherData.value = await response.json()
      if (weatherData.value) {
        showCard.value = true
      }
    } catch (err) {
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  function clearSearch(): void {
    searchQuery.value = ''
    filteredCountries.value = []
  }

  return {
    theme,
    isLoading,
    showCard,
    filteredCountries,
    selectedCountry,
    searchQuery,
    weatherData,
    toggleTheme,
    getFilteredCountries,
    setQuery,
    setLocation,
    locationData,
    getPlaceWeather,
    clearSearch
  }
})
