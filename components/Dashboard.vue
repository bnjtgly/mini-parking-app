<template>
<!--  <div>-->
<!--    <div class='px-4 py-3'>-->
<!--      <div class='d-flex align-items-center mb-3 position-relative'>-->
<!--        <h4 class='mr-2'>Dashboard</h4>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div class="content d-flex mt-4">
    <div class="l-content mx-auto">
      <div class="h-100 d-flex align-items-start justify-content-between">
        <div>
          <TotalInvoice />
        </div>

        <div>
          <div class="o-container -middle">
            <ComplexSummary />
          </div>
          <div class="o-container with-border -middle">
            <SlotsSummary />
          </div>
        </div>

        <div>
          <div class='o-container with-border p-0 -side'>
            <LatestParkings />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TotalInvoice from '~/components/dashboard/TotalInvoice'
import ComplexSummary from '~/components/dashboard/ComplexSummary'
import SlotsSummary from '~/components/dashboard/SlotsSummary'
import LatestParkings from '~/components/dashboard/LatestParkings'

export default {
  name: "Dashboard",
  components: { TotalInvoice, ComplexSummary, SlotsSummary, LatestParkings }
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
    background-color: var(--white);
    //border: 1px solid var(--gray-300);
    border-radius: 5px;
    margin-bottom: 23px;
    //padding: 25px 30px 25px 20px;
    &.-side { max-width: 398px; }
    &.-middle { max-width: 812px; }

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
