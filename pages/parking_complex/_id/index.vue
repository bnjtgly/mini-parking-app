<template>
  <Dashboard />
</template>

<script>
export default {
  created () {
    this.$router.replace(`/parking_complex/${this.$route.params.id}/slots`)
  },
}
</script>
