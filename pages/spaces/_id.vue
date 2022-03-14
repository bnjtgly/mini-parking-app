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
            <EntrypointCard :summary='parkingComplex.entry_points' />
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
          <ItemModal ref="itemModal" :selected="selectedItem" has-metadata @newDomRefs="addDomRef($event)"/>
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
    spaces: [], parkingComplex: []
  }),
  async fetch() {
    const id = this.$route.params.id
    if(id) {
      try {
        const { data } = await this.$axios.$get(`admin_api/v1/parking_complex/${id}`)
        this.parkingComplex = data.parking_complex
        this.spaces = data.parking_complex.parking_slots


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
