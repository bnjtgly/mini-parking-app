<template>
  <div class="d-flex">
    <div class="sidebar">
      <div class="d-flex align-items-center py-2 px-3">
        <p class="text-lg">Parking Management</p>
      </div>
      <div class="menu px-3">
        <nuxt-link v-for='space in spaces' :key='space.parking_complex_id' :to="`/spaces/${space.parking_complex_id}`" class="menu-item d-block">
          <span class="rounded-sm">{{space.name}}</span>
        </nuxt-link>
      </div>
    </div>
    <div class="flex-grow-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
    async asyncData({ $axios, error }) {
    try {
      const { data } = await $axios.$get('admin_api/v1/parking_complex')
      const spaces = data.parking_complex

      return { spaces }
    } catch (e) {
      error(e)
    }
  },
  data() {
    return {
      // parkingSpace: []
    }
  },
}
</script>

<style lang="scss" scoped>
.sidebar {
  height: calc(100vh - 60px);
  background-color: var(--white);
  width: 250px;
  border-right: 1px solid var(--gray-300);
  .menu-item {
    color: var(--gray-700);
    padding: 0.6rem 0.75rem;
    margin: .35rem 0;
    &:hover {
      color: var(--secondary);
      background-color: var(--gray-200);
    }
  }
}

.nuxt-link-exact-active {
  padding: 0.6rem 0.75rem;
  color: var(--secondary);
  background-color: var(--gray-200);
}
</style>
