<template>
  <div class="card mb-3 px-4 py-3">
    <div class="d-flex ml-auto mb-3" style="height: 30px;">
      <b-button variant="success" size="sm" @click="addNewEntrypoint()">
        Add Slot Entrypoint
      </b-button>
      <AddEntrypointToast ref="AddEntrypointToast" :entryPoint="summary" :spaceType="spaceType" />
    </div>
    <p class="text-lg">Entry points</p>
    <p class="text-gray-600 mb-3 text-sm">Atleast three (3) entry points.</p>
    <div class="d-flex align-items-center mb-3">
      <p v-for="entrypoint in summary" class="static-label text-gray-600 p-0">{{ entrypoint.text }},</p>
    </div>
  </div>
</template>

<script>
import AddEntrypointToast from "../../components/entrypoint/AddEntrypointToast";

export default {
  components: { AddEntrypointToast },
  props: {
    summary: {
      type: Array,
      default: []
    },
    spaceType: {
      type: Array,
      default: []
    },
    parkingId: {
      type: String,
      default: null
    }
  },
  methods: {
    addNewEntrypoint () {
      this.$refs.AddEntrypointToast.show()
    }
  }
}
</script>

<style>
.w-30 {
  width: 30%;
}
.static-label {
  padding: .25rem .75rem;
}
</style>
