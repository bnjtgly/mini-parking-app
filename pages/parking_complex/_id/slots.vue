<template>
  <div>
    <div v-if='$fetchState.pending' class='px-4 py-3'>
      <div>
        <div class="d-flex align-items-center mb-3">
          <p class="text-xl w-10 mr-auto"><b-skeleton animation="wave" height="28px"></b-skeleton></p>
          <p class="w-25"><b-skeleton animation="wave" height="28px"></b-skeleton></p>
        </div>
        <b-skeleton-table
          :rows="5"
          :columns="2"
          :table-props="{ bordered: true }"
        ></b-skeleton-table>
      </div>
    </div>

    <div v-else class='px-4 py-3'>
      <div class='d-flex align-items-center mb-3 position-relative'>
        <h4 class='mr-2'>Parking Complex</h4>
        <SearchInput class="w-25 mr-auto"/>
        <b-button variant="success" size="sm">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 172 172" style=" fill:#000000;">
            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#ffffff"><path d="M86,46.58333c-1.978,0 -3.58333,1.60533 -3.58333,3.58333v32.25h-32.25c-1.978,0 -3.58333,1.60533 -3.58333,3.58333c0,1.978 1.60533,3.58333 3.58333,3.58333h32.25v32.25c0,1.978 1.60533,3.58333 3.58333,3.58333c1.978,0 3.58333,-1.60533 3.58333,-3.58333v-32.25h32.25c1.978,0 3.58333,-1.60533 3.58333,-3.58333c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333h-32.25v-32.25c0,-1.978 -1.60533,-3.58333 -3.58333,-3.58333z"></path></g></g></svg>
          New Slot
        </b-button>
      </div>

      <div class="row">
        <div class="col-md-4 px-5">
          <div class="my-3">
            <h4 class='mr-2'>Entry Points:</h4>
          </div>
          <b-list-group>
            <b-list-group-item v-for="entryPoint in entryPoints" :key="entryPoint.entry_point_id" class="w-50 my-2" href="#" variant="info">{{ entryPoint.name }}</b-list-group-item>
          </b-list-group>
        </div>

        <div class="col-md-8 px-5">
          <div></div>
          <div class="my-3">
            <h4 class='mr-2'>Slots:</h4>
          </div>
          <div>
            <h5 class='mr-2'>Summary:</h5>
            <b-list-group>
              <b-list-group-item v-for="slotSummary in parkingComplex.slot_summary" class="d-flex justify-content-between align-items-center w-50 my-2">
                {{ slotSummary.slot_type }}
                <b-badge variant="primary" pill>{{ slotSummary.count }}</b-badge>
              </b-list-group-item>
            </b-list-group>
          </div>

          <div>

          </div>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "slots",
  middleware: 'auth',
  data () {
    return {
      parkingComplex: [],
      entryPoints: [],
      slots: []
    }
  },
  async fetch() {
    const id = this.$route.params.id
    if(id){
      try {
        const { data } = await this.$axios.$get(`admin_api/v1/parking_complex/${id}`)
        this.parkingComplex = data.parking_complex
        this.entryPoints = data.parking_complex.entry_points
        this.slots = data.parking_complex.parking_slots

      } catch (err) {
        if (err.response) {
          this.$toast.error('Failed to fetch parking complex slots.')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
