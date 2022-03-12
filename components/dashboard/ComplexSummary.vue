<template>
  <div class="complex-summary text-center">
    <div class="b-title">Total Parking Spaces</div>
    <h1> 5</h1>
    <div class="l-threshold">
      <p>Total Entry points</p>
      <h3>17</h3>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.complex-summary {
  margin-bottom: 23px;
  color: var(--white);
  background: linear-gradient(90deg, rgba(32,125,90,1) 0%, rgba(32,125,90,1) 50%);
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
