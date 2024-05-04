<template>
  <div class="countries-container" :class="theme ? '' : 'dark-mode'">
    <div
      class="country-info"
      v-show="filteredCountries.length !== 0"
      v-for="(country, idx) in filteredCountries"
      :key="idx"
      @click="
        () =>
          setQuery({
            id: country.id,
            name: country.name,
            region: country.region,
            country: country.country
          })
      "
    >
      {{ country.name }}, {{ country.region }}, {{ country.country }}
    </div>
  </div>
</template>

<script lang="ts">
import { useStateStore } from '@/stores/StateStore'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const stateStore = useStateStore()

    const { filteredCountries, theme } = storeToRefs(stateStore)
    const { setQuery } = stateStore

    return { filteredCountries, theme, setQuery }
  }
})
</script>

<style scoped lang="scss">
.countries-container {
  position: absolute;
  z-index: 100;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.dark-mode {
    div {
      background-color: rgb(46, 46, 46);
      color: whitesmoke;
    }
  }
  div {
    width: calc(45% + 65px);
    height: 50px;
    padding: 15px 10px;
    background-color: rgb(255, 255, 255);
    cursor: pointer;
    transition: transform 700ms ease;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
