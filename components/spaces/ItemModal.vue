<template>
  <b-modal ref="metaTableModal" hide-header hide-footer centered no-close-on-backdrop no-close-on-esc>
    <div class="d-flex align-items-center justify-content-between border-bottom p-3 mb-3">
      <p class="text-lg font-weight-bold text-gray-800">{{ isEdit ? 'Edit Item' : 'Add New Item' }}</p>
      <FontAwesomeIcon class="close-icon fa-lg" :icon="['fal', 'times']" @click="hide()" />
    </div>

    <b-form class="px-3" @submit.prevent="addItem()">

      <!-- Slot Type -->
      <label class="text-gray-600 text-sm font-weight-bold">Slot Type</label>
<!--      <input v-model="entity.slot_type" type="text" class="bg-gray-200 form-control w-100 border-0 mb-2 outline-none" required />-->
<!--      <SelectCreate-->
<!--        :options="slotType"-->
<!--        label="name"-->
<!--        value="id"-->
<!--        @selected="entity.parking_slot_type_id = $event"-->
<!--      />-->
      <b-form-select class="text-gray-600 text-sm" v-model="entity.selectedType" :options="slotType"></b-form-select>

      <!-- Name -->
      <label class="text-gray-600 text-sm font-weight-bold">Name</label>
      <b-input v-model="entity.name" type="text" class="bg-gray-200 border-0 mb-2 outline-none" required></b-input>

      <div class="d-flex align-items-center justify-content-between my-3">
        <b-button variant="text" class="close-icon outline-none" @click="hide()">Cancel</b-button>
        <b-button variant="success outline-none" type="submit">{{ isEdit ? 'Edit Item' : 'Add New Item' }}</b-button>
      </div>
    </b-form>

  </b-modal>
</template>

<script>
import Vue from 'vue'
import { cloneDeep, assign } from 'lodash'
import SelectCreate from '~/components/inputs/SelectCreate'

export default {
  components: { SelectCreate },
  props: {
    slotType: {
      type: Array,
      default: null
    },
    parkingId: {
      type: String,
      default: null
    },
    selected: {
      type: Object,
      default: () => ({})
    },
    hasMetadata: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addingMetadata: false,

      entity: {
        metadata: {}
      },

      metadata_placeholder: {}
    }
  },
  computed: {
    isEdit () {
      return Object.keys(this.selected).length !== 0
    }
  },
  watch: {
    selected () {
      if (this.isEdit) {
        this.entity = cloneDeep(this.selected)
      } else {
        this.entity = {
          sort_order: null,
          display: null,
          value_str: null,
          metadata: {},
          status: null
        }
      }
    }
  },
  methods: {
    show () {
      this.$refs.metaTableModal.show()
    },
    hide () {
      this.$refs.metaTableModal.hide()
      this.addingMetadata = false
    },
    async addItem () {
      // code here
      try {
        const params = {
          parking_slot: {
            parking_complex_id: this.parkingId,
            parking_slot_type_id: this.entity.selectedType,
            name: this.entity.name,
          }
        }
        const response = await this.$axios.$post('admin_api/v1/parking_slots', params)

        if(response){
          const { data } = await this.$axios.$get(`admin_api/v1/parking_complex/${this.parkingId}`)
          this.$emit('newData', data.parking_complex.parking_slots)
          this.hide()
        }
      } catch (err) {
        if (err.response) {
          for (const [value] of Object.entries(err.response.data.error)) {
            this.$toast.error(err.response.data.error[value])
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.selected {
  background-color: var(--primary) !important;
  color: var(--white) !important;
}

.cancel-metadata-btn {
  position: absolute;
  right: -8px;
  color: var(--white);
  background: var(--danger);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  height: 16px;
  width: 16px;
}

.delete-metadata-btn {
  position: absolute;
  display: none;
  right: -8px;
  color: var(--white);
  background: var(--danger);
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  height: 16px;
  width: 16px;
}

.metadata {
  &:hover {
    .delete-metadata-btn {
      display: flex !important;
    }
  }
}
</style>
