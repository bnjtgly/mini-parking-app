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

            <div v-if='!row.item.entry_point_distance.length' slot="entry_point_distance" slot-scope="row">
              <div v-for="(value, key) in row.item.entry_point_distance" :key="key" class="d-flex align-items-center border rounded bg-gray-100 w-100 my-1">
                <p class="w-50 text-gray-600 px-2">{{ key }}</p>
                <div v-if="typeof value === 'object'" class="border-left w-50 py-1">
                  <b-input v-for="(item, index) in value" :key="index" class="py-0 bg-gray-100 h-100 outline-none border-0" readonly type="text" :value="item"></b-input>
                </div>
                <div v-else class="border-left w-50 py-1">
                  <b-input class="py-0 bg-gray-100 h-100 outline-none border-0" readonly type="text" :value="value"></b-input>
                </div>
              </div>
            </div>
            <div v-else slot="entry_point_distance"></div>

            <div slot="status" slot-scope="row" class="d-flex justify-content-center">
              <ToggleButton v-model="row.item.status" @clicked="changeStatus(row.item.id, $event)" />
            </div>

          </custom-table>

          <!-- <BulkAction :bulk-actions="bulkActions" class="mt-3" /> -->
          <ItemModal ref="itemModal" :selected="selectedItem" has-metadata @newDomRefs="addDomRef($event)"/>
          <ItemModal ref="itemModalNoMeta" :selected="selectedItem" @newDomRefs="addDomRef($event)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CustomTable from '~/components/CustomTable'
import EntrypointCard from '~/components/spaces/EntrypointCard'

export default {
  components: { CustomTable, EntrypointCard },
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
      },
      {
        key: 'price',
        label: 'Price',
        thClass: 'text-gray-600 text-sm font-weight-normal text-uppercase'
      },
      {
        key: 'entry_point_distance',
        label: 'Entry Point Distance ',
        tdClass: 'text-gray-600 py-2 px-3 ',
        thClass: 'text-gray-600 py-2 px-3 text-sm font-weight-normal text-uppercase'
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
  watch: {
    '$route.params': '$fetch',
  },
  methods: {
    async addDomRef (domRef) {
      const id = this.$route.params.id
      const domainReferenceId = domRef.domain_reference_id

      if(!domainReferenceId){
        // ADD NEW
        domRef.domain_id = id
        try{
          const response = await this.$axios.$post('admin_api/domain_references', domRef)
          if (response){
            this.$store.dispatch('alert/storeAlert', { variant: 'success', content: 'Domain Reference added.' })
          }
        }catch (err) {
          if (err.response) {
            for (const [value] of Object.entries(err.response.data.error)) {
              for (const msg of err.response.data.error[value]) {
                this.$store.dispatch('alert/storeAlert', { variant: 'danger', content: msg })
              }
            }
          }
        }
      }else{
        // EDIT EXISTING
        delete domRef.domain_reference_id
        try{
          const response = await this.$axios.$patch(`admin_api/domain_references/${domainReferenceId}`, domRef)
          if (response){
            this.$store.dispatch('alert/storeAlert', { variant: 'success', content: 'Domain Reference updated.' })
          }
        }catch (err) {
          if (err.response) {
            for (const [value] of Object.entries(err.response.data.error)) {
              for (const msg of err.response.data.error[value]) {
                this.$store.dispatch('alert/storeAlert', { variant: 'danger', content: msg })
              }
            }
          }
        }

      }
      await this.fetchDomRefs(id)
    },
    async fetchDomRefs (id) {
      this.domains = await this.$axios.$get(`admin_api/domains/${id}`, {params: {is_deleted: false}})
    },
    showItemModal () {
      this.$refs.itemModal.show()
      this.selectedItem = {}
    },
    changeStatus (id, status) {
      // code here
    },
    editItem (item) {
      this.selectedItem = item
      if(item.metadata === "{}"){
        this.$refs.itemModalNoMeta.show()
      }else{
        this.$refs.itemModal.show()
      }
    },
    async deleteItem (item) {
      if(confirm(`Delete ${item.display}?`,)){
        try{
          await this.$axios.$delete(`admin_api/domain_references/${item.domain_reference_id}`)
          await this.fetchDomRefs (this.$route.params.id)
          this.$store.dispatch('alert/storeAlert', { variant: 'danger', content: 'Item Deleted.' })
        }catch (err) {
          if (err.response) {
            for (const [value] of Object.entries(err.response.data.error)) {
              for (const msg of err.response.data.error[value]) {
                this.$store.dispatch('alert/storeAlert', { variant: 'danger', content: msg })
              }
            }
          }
        }
      }
    },
    isSelected (id) {
      return this.selectedData.includes(id)
    },
    selectAll ($event) {
      if ($event) {
        for (const value of this.domains.domain_references) {
          this.selectedData.push(value.id)
        }
      } else {
        this.selectedData = []
      }
    },
    sortItem (value) {
      if(value){
        this.domains.domain_references.sort((a,b)=> (a.display > b.display ? 1 : -1))
      }
    },
    sortDir (value) {
      if(value === 'desc'){
        this.domains.domain_references.sort((a,b)=> (a.display > b.display ? 1 : -1))
      }else{
        this.domains.domain_references.sort((a,b)=> (a.display > b.display ? -1 : 1))
      }
    },
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
