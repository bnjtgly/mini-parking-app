<template>
  <div>
    <div class="w-75 mx-auto mt-4">
      <div>
        <div v-if='spaces' >
          <div class="d-flex align-items-center mb-3" style="height: 30px;">
            <p class="text-xl mr-auto">{{parkingComplex.name}}</p>
<!--            <p class="text-xl mr-auto">Test</p>-->
            <b-button variant="success" size="sm" @click="showItemModal()">
              Add Slot
            </b-button>
          </div>

          <div class="mb-5">
            <EntrypointCard :summary='entrypointType' :spaceType="spaceType" :parkingId="parkingComplex.parking_complex_id" />
          </div>

          <custom-table
            :items="spaces"
            :fields="fields"
            class="bg-white">

            <div slot="header-select" class="position-relative text-center">
              <div>
                <b-form-checkbox class="checkbox" @change="selectAll($event)"></b-form-checkbox>
              </div>
            </div>

            <div slot="status" slot-scope="row" class="d-flex justify-content-center">
              <ToggleButton v-model="row.item.status" @clicked="changeStatus(row.item.id, $event)" />
            </div>

          </custom-table>

          <!-- <BulkAction :bulk-actions="bulkActions" class="mt-3" /> -->
          <ItemModal ref="itemModal" :selected="selectedItem" :parkingId="parkingComplex.parking_complex_id" has-metadata :slotType="slotType" @newData="newData($event)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CustomTable from '~/components/CustomTable'
import EntrypointCard from '~/components/spaces/EntrypointCard'
import ItemModal from '~/components/spaces/ItemModal'


export default {
  middleware: 'auth',
  components: { CustomTable, EntrypointCard, ItemModal },
  data: () => ({
    fields: [
      {
        key: 'parking_slot_type',
        label: 'Slot Type',
        thClass: 'text-gray-600 text-sm font-weight-normal text-uppercase'
      },
      {
        key: 'slot_name',
        label: 'Name',
        thClass: 'text-gray-600 text-sm font-weight-normal text-uppercase'
      }
    ],
    spaces: [], parkingComplex: [], slotType:[], entrypointType: [], spaceType: []
  }),
  async fetch() {
    const id = this.$route.params.id
    const slotOptions = []
    const entrypointOptions = []
    const spaceOptions = []
    if(id) {
      try {
        const { data } = await this.$axios.$get(`admin_api/v1/parking_complex/${id}`)
        this.parkingComplex = data.parking_complex
        this.spaces = data.parking_complex.parking_slots

        const {data: slot_type} = await this.$axios.$get('admin_api/v1/sub_entities', {params:{entity_number: '1001'}})
        // this.slotType = slot_type.sub_entities

        for(let slot of slot_type.sub_entities){
          slotOptions.push({value: slot.sub_entity_id, text: slot.display})
        }
        this.slotType = slotOptions

        for(let entry of this.parkingComplex.entry_points){
          entrypointOptions.push({value: entry.entry_point_id, text: entry.name})
        }
        this.entrypointType = entrypointOptions

        for(let space of this.spaces){
          spaceOptions.push({value: space.parking_slot_id, text: space.slot_name})
        }
        this.spaceType = spaceOptions

      } catch (err) {
        if (err.response) {
          this.$toast.error('Failed to fetch parking slots.')
        }
      }
    }
  },
  methods: {
    showItemModal () {
      this.$refs.itemModal.show()
    },
    newData (newData) {
      this.spaces = newData
    }
  },
  watch: {
    '$route.params': '$fetch',
  }
}
</script>

<style lang="scss" scoped>
.custom-control {
  padding-left: 2rem;
}
.toggle-btn {
  position: absolute;
  left: 22px;
}
</style>
