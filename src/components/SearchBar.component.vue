<template>
  <div class="search-container">
    <input
      type="text"
      name="searchbar"
      id="searchbar"
      autocomplete="off"
      class="search-bar"
      placeholder="Type a Country name to get its weather info"
      v-model="searchQuery"
      @input="handleSearch"
    />
    <span
      class="material-symbols-outlined search-icon"
      :class="theme ? 'light' : 'dark'"
      @click="handleSubmit"
    >
      search
    </span>
    <AutoFillComponent v-if="searchQuery" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStateStore } from '@/stores/StateStore'
import { storeToRefs } from 'pinia'
import AutoFillComponent from './AutoFill.component.vue'

export default defineComponent({
  components: { AutoFillComponent },
  setup() {
    const stateStore = useStateStore()

    const searchTimeout = ref<undefined | number>(undefined)

    const { theme, searchQuery, selectedCountry } = storeToRefs(stateStore)
    const { getFilteredCountries, getPlaceWeather, clearSearch } = stateStore

    function handleSubmit() {
      getPlaceWeather()
      clearSearch()
    }

    function handleSearch() {
      clearTimeout(searchTimeout.value)
      searchTimeout.value = setTimeout(async () => {
        if (searchQuery.value) {
          getFilteredCountries()
        }
      }, 500)
    }

    return {
      stateStore,
      searchQuery,
      selectedCountry,
      handleSearch,
      handleSubmit,
      theme
    }
  }
})
</script>

<style scoped lang="scss">
.search-container {
  position: relative;
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 45%;
    height: 50px;
    border-radius: 15px;
    text-align: center;
    transition: width 700ms ease;
  }
  .search-icon {
    width: 50px;
    aspect-ratio: 1;
    margin-left: 15px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    cursor: pointer;
    transition:
      border 200ms ease,
      font-weight 200ms ease;
    &.light {
      color: rgb(78, 78, 78);
      border: 1px solid rgb(78, 78, 78);
      &:hover {
        border: 3px solid rgb(78, 78, 78);
        font-weight: 700;
      }
    }
    &.dark {
      color: rgb(231, 231, 231);
      border: 1px solid rgb(231, 231, 231);
      &:hover {
        border: 3px solid rgb(231, 231, 231);
        font-weight: 700;
      }
    }
  }
}
</style>
