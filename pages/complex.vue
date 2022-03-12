<template>
  <div>
    <div v-if='$fetchState.pending' class='px-4 py-3'>
      <div>
        <div class="d-flex align-items-center mb-3">
          <p class="text-xl w-10 mr-auto"><b-skeleton animation="wave" height="28px"></b-skeleton></p>
          <p class="w-25"><b-skeleton animation="wave" height="28px"></b-skeleton></p>
        </div>
        <b-skeleton-table
          :rows="2"
          :columns="4"
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
          New Parking Complex
        </b-button>
      </div>
    </div>

    <div class="w-100 main-content d-flex flex-column align-items-center justify-content-between" >

        <div class="container">
          <div class="row pt-5">
          </div>
          <div class="row">

            <!--ADD CLASSES HERE d-flex align-items-stretch-->
            <div v-for="complex in parkingComplex" class="col-md-3 mb-3 d-flex align-items-stretch">
              <div class="card w-100">

                <div class="card-body d-flex flex-column">
                  <h4 class="card-title text-center">{{ complex.name }}</h4>
                  <b-button variant="success" size="md" class="mt-4 align-self-start w-100">
<!--                    <nuxt-link :to="`/parking_complex/${complex.parking_complex_id}`" style="text-decoration: none; color: inherit;">-->
                    <nuxt-link :to="`/spaces/${complex.parking_complex_id}`" style="text-decoration: none; color: inherit;">
                      Add slots
                    </nuxt-link>
                  </b-button>
                </div>
              </div>
            </div>

          </div>
        </div>

    </div>
  </div>
</template>

<script>
import SearchInput from '~/components/inputs/SearchInput'

export default {
  name: "complex",
  components: { SearchInput },
  data () {
    return {
      parkingComplex: []
    }
  },
  async fetch() {
    try {
      const { data } = await this.$axios.$get('admin_api/v1/parking_complex')

      this.parkingComplex = data.parking_complex
    } catch (err) {
      if (err.response) {
        this.$toast.error('Failed to fetch parking complex.')
      }
    }
  }
}
</script>

<style scoped>

</style>
