<template>
  <div class="slots-summary">
<!--    <div v-show='$fetchState.pending'>-->
      <div class="d-flex justify-content-between">
        <div class="b-title">Parking Slots Summary</div>
      </div>

      <SlotCard :summary='summary' />
<!--    </div>-->
  </div>
</template>

<script>
import SlotCard from '~/components/dashboard/Custom/SlotCard'

export default {
  components: {SlotCard},
  props: {
    summary: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang='scss' scoped>
.slots-summary {
  .b-title {
    font-family: "SFProDisplay-Medium", sans-serif;
    font-size: 18px;
  }
}
</style>
