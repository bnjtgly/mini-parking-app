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
<!--            <b-button v-for="entry in entryPoints" variant="success" size="lg" class="align-self-start mb-5 w-100 text-capitalize">-->
<!--              {{ entry.name }}-->
<!--            </b-button>-->
            <SelectEntryPoint class="mx-3" :options="entryPointsOption" @changed="selectEntrypoint($event)" />
          </div>
          <div>

            <div class="o-container -middle">
<!--              <ParkSlotCard />-->

              <div class="w-100 main-content d-flex flex-column align-items-center justify-content-between" >

                <div class="container">
                  <div class="row">
                    <ParkSlotCard v-for="parkingSlot in parkingSlots" :parkingslot='parkingSlot' />
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div>
            <div class='o-container p-0 -side'>
<!--              <div>-->
<!--                <b-button variant="success" size="lg" class="align-self-start mb-5 w-100" @click="park()">-->
<!--                  Park-->
<!--                </b-button>-->
<!--              </div>-->
              <div class="park with-border mb-2">
                <div class='login-content mt-4 d-flex flex-column'>
                  <p class='h3 mb-2'>Parking</p>
                  <b-form @submit.prevent='find'>
                    <div class='email-input mb-3'>
                      <label>Parking</label>
                      <b-form-input
                        v-model='customerFindId'
                        required
                        trim
                        type='text'
                      ></b-form-input>
                    </div>
                    <b-button
                      variant='info'
                      class='py-2 w-100'
                      type='submit'
                      :disabled="isSubmit">
                      <b-spinner v-if="isSubmit" class="mr-1" small></b-spinner>
                      Find
                    </b-button>
                  </b-form>
                  <div v-if="availableSlot.length !== 0">
                    <p class='h4 my-3'>Details:</p>
                    <p><span>ID: </span>{{ availableSlot.slot_id }}</p>
                    <p><span>Name: </span>{{ availableSlot.slot_name }}</p>
                    <p><span>Distance: </span>{{ `${availableSlot.distance} meters from ${this.findParking.entry_point} entry point.` }}</p>
                    <p><span>Price: </span>{{ availableSlot.price }}</p>
                    <b-button variant="success" class="align-self-start w-100" @click="park()">
                      Park
                    </b-button>
                  </div>

                </div>
              </div>

              <div class="checkout with-border mb-2">
                <div class='login-content mt-4 d-flex flex-column'>
                  <p class='h3 mb-2'>Check-out</p>
                  <b-form @submit.prevent='checkout'>
                    <div class='email-input mb-3'>
                      <label>Customer ID</label>
                      <b-form-input
                        v-model='customerCheckoutId'
                        required
                        trim
                        type='text'
                      ></b-form-input>
                    </div>
                    <b-button
                      variant='warning'
                      class='py-2 w-100 text-white'
                      type='submit'
                      :disabled="isSubmit">
                      <b-spinner v-if="isSubmit" class="mr-1" small></b-spinner>
                      Checkout
                    </b-button>
                    <div v-if="invoice.length !== 0">
                      <p class='h4 my-3'>Details:</p>
                      <p><span>Customer: </span>{{ invoice.customer }}</p>
                      <p><span>Slot Type: </span>{{ invoice.slot_type }}</p>
                      <p><span>Slot Name: </span>{{ invoice.slot_name }}</p>
                      <p><span>Parked Hours: </span>{{ invoice.parked_hours }}</p>
                      <p><span>Parking Fee:: </span>{{ invoice.parking_fee }}</p>
                      <p><span>Status: </span>{{ invoice.transaction_status }}</p>
                    </div>
                  </b-form>
                </div>
              </div>

<!--              <b-button variant="success" size="lg" class="align-self-start w-100" @click="checkout()">-->
<!--                Check out-->
<!--              </b-button>-->
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ParkSlotCard from '~/components/parking/ParkSlotCard'
import SelectEntryPoint from '~/components/inputs/SelectEntryPoint'

export default {
  name: "slots",
  components: { ParkSlotCard, SelectEntryPoint },
  data () {
    return {
      parkingComplex: [],
      entryPoints: [],
      entryPointsOption: [],
      parkingSlots: [],
      availableSlot: [],
      invoice: [],
      customerFindId: '',
      customerCheckoutId: '',
      isSubmit: false,

      findParking: {
        parking_complex: '',
        entry_point: ''
      }

    }
  },
  async fetch() {
    const id = this.$route.params.id
    if(id) {
      try {
        const { data } = await this.$axios.$get(`admin_api/v1/parking_complex/${id}`)
        this.parkingComplex = data.parking_complex
        this.entryPoints = data.parking_complex.entry_points
        this.parkingSlots = this.parkingComplex.parking_slots

        this.entryPointsOption = this.entryPoints.map(({ name }) => name)

        this.findParking.parking_complex = this.parkingComplex.parking_complex_id
      } catch (err) {
        if (err.response) {
          this.$toast.error('Failed to fetch parking slots.')
        }
      }
    }
  },
  methods:{
    async find(){
      if(!this.isSubmit) {
        try {
          const params = this.findParking
          const { data }  = await this.$axios.$get(`admin_api/v1/customer_parkings/find_parking/${this.customerFindId}`, {params: {entry_point: params.entry_point, parking_complex: params.parking_complex}})
          this.availableSlot = data.parking_slot_details
          this.$toast.success('Available Parking slot Found!')
        } catch (err) {
          if (err.response) {
            this.$toast.error('An error has occured')
          }
        } finally {
          this.isSubmit = false
        }
      }
    },
    async park(){
      const params = {
        parking: {
          customer_id: this.customerFindId,
          parking_slot_id: this.availableSlot.slot_id
        }
      }
      try{
        const response = await this.$axios.$post('admin_api/v1/customer_parkings', params)
        this.$toast.success(`Successfully parked at ${this.availableSlot.slot_name}.`)
        this.customerFindId = null
        this.findParking.entry_point = null
        await this.$fetch()
      }catch (err) {
        if (err.response) {
          for (const [value] of Object.entries(err.response.data.error)) {
            for (const msg of err.response.data.error[value]) {
              this.$toast.error(msg)
            }
          }
        }
      }
    },
    async checkout(){
      const params = {
        parking: {
          customer_id: this.customerCheckoutId
        }
      }
      try{
        const { data } = await this.$axios.$post('admin_api/v1/customer_parkings/checkout', params)
        this.invoice = data.invoice
        this.customerCheckoutId = null
        this.$toast.success(`Successfully check out from ${this.invoice.slot_name}.`)
        await this.$fetch()
      }catch (err) {
        if (err.response) {
          for (const [value] of Object.entries(err.response.data.error)) {
            for (const msg of err.response.data.error[value]) {
              this.$toast.error(msg)
            }
          }
        }
      }
    },
    selectEntrypoint (value) {
      this.findParking.entry_point = value
      this.$toast.info(`Selected ${value} entry point.`)
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
    &.-side { max-width: 310px; }
    &.-middle { max-width: 900px; }

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
