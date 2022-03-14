<template>
</template>

<script>
export default {
  created () {
    this.$router.replace(`/parking_slots/${this.$route.params.id}/slots`)
  },
}
</script>
