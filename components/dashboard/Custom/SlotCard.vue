<template>
  <div>
    <b-card-group>
      <b-card class='border-0 -commence'>
        <b-card-text class="text-right">
          <p class='amount'>{{summary.available_slots}}</p>
          <p>
            <label>Available Slots</label>
          </p>
        </b-card-text>
      </b-card>
      <b-card class='border-0 -created'>
        <b-card-text class="text-right">
          <p class='amount'>{{summary.occupied_slots}}</p>
          <p>
            <label>Occupied Slots</label>
          </p>
        </b-card-text>
      </b-card>
      <b-card class='border-0 -finalised'>
        <b-card-text class="text-right">
          <p class='amount'>{{summary.total_parking_slots}}</p>
          <p>
           <label>Total Slots</label>
          </p>
        </b-card-text>
      </b-card>
    </b-card-group>
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
.card-group {
  margin-top: 24px;
  .card {
    border-right: 1px solid var(--gray-300) !important;
    &:last-child { border: none !important; }

    .card-body { padding-left: 0; }
    .amount { font-size: 24px; }
    p {
      font-size: 12px;
      span {
        padding: 2px 4px;
        border-radius: 100%;
      }
      label {
        font-family: "SFProDisplay-Medium", sans-serif;
        font-size: 14px;
        color: var(--gray-800);
        margin-left: 5px;
      }
    }
    &.-commence {
      p {
        color: var(--success);
        span { background-color: rgba(1, 206, 129, .15); }
      }
    }
    &.-created {
      .amount { color: var(--warning); }
      p {
        color: var(--danger-light);
        span { background-color: rgba(255, 84, 131, .15); }
      }
    }
    &.-finalised {
      .amount { color: #582482; }
      p {
        color: var(--success);
        span { background-color: rgba(1, 206, 129, .15); }
      }
    }
  }
}
</style>
