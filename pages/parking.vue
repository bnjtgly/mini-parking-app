<template>
  <div>
    <div class='px-4 py-3'>
      <div class='d-flex align-items-center mb-3 position-relative'>
        <h4 class='mr-2'>Parkings</h4>
      </div>
    </div>
    <div class="w-100 main-content d-flex flex-column align-items-center justify-content-between" >
      <div class="container">
        <div class="row">

          <div v-for="complex in parkingComplex" class="col-md-3 mb-3 d-flex align-items-stretch">
            <div class="parking-complex-card text-center">
              <h1>{{ complex.name }}</h1>
              <div class="l-threshold">
                <b-button variant="success" size="md" class="mt-4 align-self-start w-100">
                  <nuxt-link :to="`/parking_slots/${complex.parking_complex_id}`" style="text-decoration: none; color: inherit;">
                    Select
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

export default {
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

<style lang='scss' scoped>
.parking-complex-card {
  width: 100vw;
  max-width: 398px;
  margin-bottom: 23px;
  color: var(--white);
  background: rgb(53,128,128);
  background: linear-gradient(90deg, rgba(53,128,128,1) 35%, rgba(53,128,128,1) 100%);
  border: none;
  border-radius: 15px;
  padding: 20px 25px;
  position: relative;
  .fa-ellipsis-v {
    position: absolute;
    top: 16px;
    right: 13px;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.3);
  }

  h1 {
    letter-spacing: normal;
    font-weight: normal;
    font-size: 36px;
    margin: 20px 0;
    .currency {
      color: var(--gray-500);
      font-size: 24px;
    }
  }
  & > div.b-title {
    font-size: 18px;
    color: var(--gray-300);
    text-align: left;
  }
  & > div.l-threshold {
    font-size: 14px;
    color: var(--gray-600);
    margin-bottom: 13px;
    h3 {
      font-size: 18px;
      color: var(--white)
    }
  }
}
</style>

