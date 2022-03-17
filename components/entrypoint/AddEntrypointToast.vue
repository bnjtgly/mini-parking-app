<template>
  <b-toast id="entry-poin-toast" class="invite-team" title="Added New Entry Point" static no-auto-hide hide>
    <div>
      <div v-for="(slotEntrypoint, index) in slotEntrypoints" :key="index" class="d-flex flex-column align-items-center gap-2 my-2">
        <div class="w-100">
          <label class="text-gray-700">Entry Point</label>
          <b-form-select class="text-gray-600 text-sm" v-model="slotEntrypoints[index].entry_point_id" :options="entryPoint"></b-form-select>
        </div>
        <div class="w-100">
          <label class="text-gray-700">Slot</label>
          <b-form-select class="text-gray-600 text-sm" v-model="slotEntrypoints[index].parking_slot_id" :options="spaceType"></b-form-select>
        </div>
        <div class="w-100">
          <label class="text-gray-700">Enter Distance</label>
          <b-input v-model="slotEntrypoints[index].distance" type="email" required></b-input>
        </div>
      </div>
    </div>
    <div class="px-3 py-3 d-flex align-items-center justify-content-between">
      <a href="javascript:void(0)" class="text-danger" @click="discard">Discard</a>
      <b-button variant="success" @click='addItem'>Add</b-button>
    </div>
  </b-toast>
</template>

<script>
export default {
  props: {
    entryPoint: {
      type: Array,
      default: null
    },
    spaceType: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      slotEntrypoints: [{}]
    }
  },
  methods: {
    async addItem () {
      try {
        const params = {
          slot_entrypoint: {
            parking_slot_id: this.slotEntrypoints[0].parking_slot_id,
            entry_point_id: this.slotEntrypoints[0].entry_point_id,
            distance: this.slotEntrypoints[0].distance,
          }
        }

        const response = await this.$axios.$post('admin_api/v1/slot_entrypoints', params)
        if(response){
          this.$toast.success(`Slot Entrypoint added.`)
          this.$bvToast.hide()
        }
      } catch (err) {
        if (err.response) {
          for (const [value] of Object.entries(err.response.data.error)) {
            this.$toast.error(err.response.data.error[value])
          }
        }
      }
    },
    show() {
      this.$bvToast.show('entry-poin-toast')
    },
    discard() {
      this.$bvToast.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.invite-team::v-deep {
  width: 400px;
  max-width: 400px;
  position: absolute;
  top: 3rem;
  right: 0;
  .toast {
    background-color: var(--white);
    max-width: 400px;
    .toast-header {
      padding: 0.75rem;
      strong, button {
        color: var(--gray-1000);
        font-weight: normal
      }
    }
  }
}
</style>
