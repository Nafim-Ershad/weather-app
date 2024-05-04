<template>
  <div class="card" :class="weatherData.current.is_day ? 'day' : 'night'">
    <div class="icon-container">
      <img :src="weatherData.current.condition.icon" alt="weather-icon" />
      <span>{{ weatherData.current.condition.text }}</span>
    </div>
    <div class="primary-info">
      <div class="current-temp">{{ weatherData.current.temp_c }}&deg;C</div>
      <div class="max-min-container">
        {{ weatherData.forecast.forecastday[0].day.maxtemp_c }}&deg;C /
        {{ weatherData.forecast.forecastday[0].day.mintemp_c }}&deg;C
      </div>
      <div class="location-info">
        <span class="material-symbols-outlined"> location_on </span>
        <span
          >{{ weatherData.location.name }},
          {{
            weatherData.location.region.length
              ? weatherData.location.region
              : weatherData.location.country
          }}, {{ weatherData.location.region.length ? weatherData.location.country : '' }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStateStore } from '@/stores/StateStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const stateStore = useStateStore()

    const { theme, weatherData } = storeToRefs(stateStore)

    const card = ref<HTMLDivElement | null>(null)

    // console.log(weatherData.value)

    // Mouse Following
    function tiltCard(event: MouseEvent) {
      //Mouse Position
      const x = event.clientX
      const y = event.clientY
      // Window Center
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      const offsetX = ((x - centerX) / centerX) * 10
      const offsetY = ((y - centerY) / centerY) * 10

      card.value?.style.setProperty('--rotateX', `${offsetX}deg`)
      card.value?.style.setProperty('--rotateY', `${-1 * offsetY}deg`)
    }

    onMounted(() => {
      card.value = document.querySelector<HTMLDivElement>('div.card')
      window.addEventListener('mousemove', (e): void => {
        tiltCard(e)
      })
    })

    return { stateStore, theme, weatherData }
  }
})
</script>

<style scoped lang="scss">
:root {
  --rotateX: 0deg;
  --rotateY: 0deg;
}
.card {
  position: relative;
  width: 25rem;
  height: 30rem;
  border-radius: 15%;
  transform-style: preserve-3d;
  transform: perspective(5000px) rotateY(var(--rotateX)) rotateX(var(--rotateY));
  &.day {
    background: rgba(142, 197, 252, 0.5);
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
    * {
      color: rgb(24, 24, 24);
    }
  }
  &.night {
    background: rgba(7, 34, 61, 0.5);
    background-image: linear-gradient(62deg, #0a2a4a 0%, #270845 100%);
    * {
      color: rgb(224, 224, 224);
    }
  }
  &::after,
  &::before {
    content: '';
    position: absolute;
    border-radius: inherit;
  }
  &::before {
    inset: -0.5rem;
    border-radius: inherit;
    background: black;
    z-index: -1;
    transform: translateZ(-50px);
    filter: blur(100px);
    opacity: 0.75;
  }
  .icon-container {
    position: relative;
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      height: 100%;
      aspect-ratio: 1;
    }
    span {
      position: absolute;
      left: 20px;
      top: 30px;
      font-size: 1rem;
    }
  }
  .primary-info {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .current-temp {
      font-size: 3rem;
    }
    .max-min-container {
      margin: 10px 0;
    }
    .location-info {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin: 0 5px;
      }
    }
  }
}
</style>
