<template>
  <div class="col-md-3 mb-3 d-flex align-items-stretch">
    <div :class='slot.parking_slot_status === "Available" ? "card w-100 card-slot-available" : "card w-100 card-slot-not-available"'>
      <div class="card-body d-flex flex-column">
        <h4 class="card-title text-center">{{ slot.slot_name }}</h4>
        <p class="text-center">{{ slot.parking_slot_type }}</p>
        <h5 class="text-center">{{ slot.parking_slot_status }}</h5>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    slot: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang='scss' scoped>
.card-slot-available {
  color: var(--white);
  background: #00B32C;
}
.card-slot-not-available {
  color: var(--white);
  background: #B3000C;
}
</style>
