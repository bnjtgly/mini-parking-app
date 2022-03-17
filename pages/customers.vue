<template>
  <div>
    <div class="w-75 mx-auto mt-4">
      <div>
        <div v-if='customers' >

          <custom-table
            :items="customers"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomTable from '~/components/CustomTable'

export default {
  name: "customers",
  middleware: 'auth',
  components: { CustomTable },
  data: () => ({
    fields: [
      {
        key: 'customer_id',
        label: 'ID',
        thClass: 'text-gray-600 text-sm font-weight-normal text-uppercase'
      },{
        key: 'complete_name',
        label: 'Name',
        thClass: 'text-gray-600 text-sm font-weight-normal text-uppercase'
      },
      {
        key: 'plate_number',
        label: 'Plate Number',
        thClass: 'text-gray-600 text-sm font-weight-normal text-uppercase'
      },
      {
        key: 'vehicle_type',
        label: 'Vehicle Type',
        thClass: 'text-gray-600 text-sm font-weight-normal text-uppercase'
      }
    ],
    customers: []
  }),
  async fetch() {
    try {
      const { data } = await this.$axios.$get('admin_api/v1/customers')
      this.customers = data

    } catch (err) {
      if (err.response) {
        this.$toast.error('Failed to fetch customers.')
      }
    }
  }
}
</script>

<style scoped>

</style>
