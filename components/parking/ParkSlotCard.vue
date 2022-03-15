<template>
  <div class="col-md-3 mb-3 d-flex align-items-stretch">
    <div :id="`popover-target-${parkingslot.parking_slot_id}`" :class='parkingslot.parking_slot_status === "Available" ? "card w-100 card-slot-available" : "card w-100 card-slot-not-available"'>
      <div class="card-body d-flex flex-column">
        <h4 class="card-title text-center">{{ parkingslot.slot_name }}</h4>
        <p class="text-center">{{ parkingslot.parking_slot_type }}</p>
        <h5 class="text-center">{{ parkingslot.parking_slot_status }}</h5>
        <b-popover v-if="parkingslot.customer_details" :target="`popover-target-${parkingslot.parking_slot_id}`" triggers="hover" placement="top">
          <template #title>Customer Details</template>
            <p><span>ID: </span>{{ parkingslot.customer_details.customer_id }}</p>
            <p><span>Customer: </span>{{ parkingslot.customer_details.customer_name }}</p>
            <p><span>Plate Number: </span>{{ parkingslot.customer_details.plate_number }}</p>
            <p><span>Vehicle Type: </span>{{ parkingslot.customer_details.vehicle_type }}</p>
            <p><span>Returnee: </span>{{ parkingslot.customer_details.is_returnee }}</p>
            <p><span>Current Flat Rate: </span>{{ parkingslot.customer_details.current_flat_rate }}</p>
            <p><span>Accumulated Hours: </span>{{ parkingslot.customer_details.accumulated_hours }}</p>
        </b-popover>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    parkingslot: {
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
