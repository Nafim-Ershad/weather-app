<script setup lang="ts">
import { RouterView } from 'vue-router'
import ThemeToggleComponent from './components/ThemeToggle.component.vue'
import { useStateStore } from './stores/StateStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const stateStore = useStateStore()

const { theme, showCard } = storeToRefs(stateStore)

onMounted(() => {
  showCard.value = false
})
</script>

<template>
  <main :class="theme ? 'light-mode' : 'dark-mode'">
    <RouterView />
    <ThemeToggleComponent />
  </main>
</template>

<style scoped lang="scss">
main {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &.light-mode {
    background-color: whitesmoke;
    color: rgb(46, 46, 46);
  }
  &.dark-mode {
    background-color: rgb(46, 46, 46);
    color: whitesmoke;
  }
}
</style>
