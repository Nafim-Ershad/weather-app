<template>
  <div class="theme-toggle-container" @click="toggleTheme">
    <div class="theme-toggle" :class="theme ? 'move-left' : 'move-right'">
      <Transition :name="theme ? 'show' : ''">
        <span class="material-symbols-outlined" v-if="theme"> light_mode </span>
      </Transition>
      <Transition :name="theme ? '' : 'show'">
        <span class="material-symbols-outlined" v-if="!theme"> dark_mode </span>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useStateStore } from '@/stores/StateStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const stateStore = useStateStore()

    const { theme } = storeToRefs(stateStore)
    const { toggleTheme } = stateStore

    return { theme, toggleTheme }
  }
})
</script>

<style scoped lang="scss">
$animationTime: 700ms;
.theme-toggle-container {
  position: absolute;
  right: 60px;
  bottom: 60px;
  width: 80px;
  height: 35px;
  border: 1px solid grey;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .theme-toggle {
    position: absolute;
    height: 35px;
    aspect-ratio: 1;
    border: 1px solid grey;
    border-radius: 50%;
    &.move-left {
      animation-name: moveLeft;
      animation-duration: $animationTime;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
      animation-fill-mode: both;
    }
    &.move-right {
      animation-name: moveRight;
      animation-duration: $animationTime;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
      animation-fill-mode: both;
    }
    span {
      height: 100%;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.show-enter-active,
.show-leave-active {
  transition: opacity 0.7s ease;
}

.show-enter-to,
.show-leave-from {
  opacity: 1;
}

@keyframes moveLeft {
  0% {
    right: 0;
    transform: translateX(0);
  }
  100% {
    right: 100%;
    transform: translateX(100%);
  }
}

@keyframes moveRight {
  0% {
    left: 0;
    transform: translateX(0);
  }
  100% {
    left: 100%;
    transform: translateX(-100%);
  }
}
</style>
