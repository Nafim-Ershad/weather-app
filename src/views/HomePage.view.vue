<template>
  <section class="home-container" :class="theme ? 'dark-theme' : 'light-theme'">
    <SearchBarComponent />
    <div class="card-container" v-if="showCard">
      <WeatherCardComponent v-if="!isLoading" />
      <div class="loading" v-if="isLoading">Loading...</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useStateStore } from '@/stores/StateStore'

import SearchBarComponent from '@/components/SearchBar.component.vue'
import WeatherCardComponent from '@/components/WeatherCard.component.vue'

export default defineComponent({
  components: { WeatherCardComponent, SearchBarComponent },
  setup() {
    const stateStore = useStateStore()

    const { theme, isLoading, showCard } = storeToRefs(stateStore)

    return { stateStore, theme, isLoading, showCard }
  }
})
</script>

<style scoped lang="scss">
.home-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .card-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
