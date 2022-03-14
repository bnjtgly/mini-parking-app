<template>
  <div>
    <div class='px-4 py-3'>
      <div class='d-flex align-items-center mb-3 position-relative'>
        <h4 class='mr-2'>Parking Slots</h4>
      </div>
    </div>

    <div class="content d-flex mt-4">
      <div class="l-content mx-auto">
        <div class="mb-5">
          <h2>Entry Points</h2>
        </div>
        <div class="h-100 d-flex align-items-start justify-content-between">
          <div>
<!--            <b-list-group>-->
<!--              <b-list-group-item v-for="entry in entryPoints" href="#" variant="light" class="my-1">{{ entry.name }}</b-list-group-item>-->
<!--            </b-list-group>-->
            <b-button v-for="entry in entryPoints" variant="success" size="lg" class="align-self-start mb-5 w-100 text-capitalize">
              {{ entry.name }}
            </b-button>
          </div>
          <div>

            <div class="o-container -middle">
<!--              <ParkSlotCard />-->

              <div class="w-100 main-content d-flex flex-column align-items-center justify-content-between" >

                <div class="container">
                  <div class="row">
                    <ParkSlotCard v-for="slot in slots" :slot='slot' />
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div>
            <div class='o-container p-0 -side'>
              <b-button variant="success" size="lg" class="align-self-start mb-5 w-100" @click="park()">
                Park
              </b-button>
              <b-button variant="success" size="lg" class="align-self-start w-100" @click="checkout()">
                Check out
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ParkSlotCard from '~/components/parking/ParkSlotCard'

export default {
  name: "slots",
  components: { ParkSlotCard },
  data () {
    return {
      parkingComplex: [],
      entryPoints: [],
      slots: []
    }
  },
  async fetch() {
    const id = this.$route.params.id
    if(id) {
      try {
        const { data } = await this.$axios.$get(`admin_api/v1/parking_complex/${id}`)
        this.parkingComplex = data.parking_complex
        this.entryPoints = data.parking_complex.entry_points
        this.slots = this.parkingComplex.parking_slots

        console.log(this.slots)
      } catch (err) {
        if (err.response) {
          this.$toast.error('Failed to fetch parking slots.')
        }
      }
    }
  },
  methods:{
    park(){
      alert('Parked!')
    },
    checkout(){
      alert('Checkout!')
    }
  }
}
</script>

<style lang='scss' scoped>
.content {
  height: calc(100vh - 60px);
  padding-top: 17px;
  font-family: "SFProDisplay-Regular", sans-serif;
  h1 { letter-spacing: 0.5rem; }

  .l-content { width: 1640px; }
  .o-container {
    position: relative;
    width: 100vw;
    //background-color: var(--white);
    //border: 1px solid var(--gray-300);
    border-radius: 5px;
    margin-bottom: 23px;
    //padding: 25px 30px 25px 20px;
    &.-side { max-width: 210px; }
    &.-middle { max-width: 1000px; }

    .fa-ellipsis-v {
      color: var(--gray-500);
      position: absolute;
      top: 16px;
      right: 13px;
      font-size: 15px;
    }
  }
  .with-border {
    border: 1px solid var(--gray-300);
    padding: 25px 30px 25px 20px;
  }
}
</style>
