<template>
  <div class="float-account text-center">
    <div class="b-title">Total Invoices</div>
    <h1><span class='currency'>₱</span> {{summary.total_eanings}}</h1>
    <div class="l-threshold">
      <p>Today's invoices</p>
      <h3>₱ {{summary.today_earnings}}</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    summary: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang='scss' scoped>
.float-account {
  width: 100vw;
  max-width: 398px;
  margin-bottom: 23px;
  color: var(--white);
  background: rgb(33,117,102);
  background: linear-gradient(90deg, rgba(33,117,102,1) 0%, rgba(78,156,130,1) 50%);
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
