<template>
  <div class="latest-parkings">
    <div>
      <div class="d-flex justify-content-between -head">
        <div class="b-title">Latest Parkings</div>
      </div>

      <div class="b-body">
        <nuxt-link v-for="item in requests" :key="item.id" to="#">
          <b-card no-body>
            <div class="d-flex">
              <b-avatar :text="item.customer_short"></b-avatar>
              <b-card-body class="p-0 pl-3">
                <b-card-text>
                  <div class="d-flex justify-content-between">
                    <div class="details">
                      <div class="name">{{ item.customer }}</div>
                      <div class="time-period">{{ item.created_at | dayMonthYearTimeFromNow }}</div>
                    </div>
                    <div class="amount-status text-right">
                      <div>{{`Php${item.parking_fee}`}}</div>
                      <Badge
                        :name="item.status"
                        :text-color="'#01CE81'"
                        :bg-color="'#E5FAEE'"
                        class="text-uppercase"
                      />
                    </div>
                  </div>
                </b-card-text>
              </b-card-body>
            </div>
          </b-card>
        </nuxt-link>

        <div v-if='requests.length === 0' class='text-center'>
          <div class='empty-data my-5'>
            <span class='d-block mt-2'>No Data</span>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import dateFormatter from '~/mixins/dateFormatter'

export default {
  mixins: [dateFormatter],
  data () {
    return {
      requests: [],
    }
  },
  async fetch() {
    try {
      const {data} = await this.$axios.$get('admin_api/v1/dashboard/latest')
      this.requests = data.latest_parkings

    } catch (err) {
      if (err.response) {
        this.$toast.error('Failed to fetch latest parkings.')
      }
    }
  },

  methods: {

  }
}
</script>

<style lang='scss' scoped>
.latest-parkings {
  padding: 0;
  .-head,.-foot {
    padding-left: 25px;
    padding-right: 30px;
  }
  .-head { padding-top: 25px; }
  .-foot { padding-bottom: 25px; }

  .b-title {
    font-family: "SFProDisplay-Medium", sans-serif;
    font-size: 18px;
  }

  .refresh {
    color: var(--gray-600);
    background-color: var(--white);
    border-color: var(--gray-300);
    &:focus { box-shadow: none; }
    &:hover {
      color: var(--white);
      background-color: var(--gray-600) !important;
      border-color: var(--gray-600) !important;
    }
  }
  .b-body {
    padding: 0 12px !important;
    margin: 15px 0 20px;

    .card::v-deep {
      border: none;
      margin: 0;
      padding: 12px 18px 12px 13px;
      &:last-child { margin: 0; }
      &:hover {
        background-color: var(--gray-200);
      }

      .b-avatar {
        background-color: rgb(88, 36, 130, 0.1);
        .b-avatar-text { color: #582482; }
      }

      .card-text {
        font-size: 13px;
        color: var(--gray-600);
        position: relative;

        .details {
          .name, .email { font-size: 14px; }
          .name {
            font-family: "SFProDisplay-Medium", sans-serif;
            color: #212121;
          }
        }
        .amount-status {
          font-family: "SFProDisplay-Medium", sans-serif;
          font-size: 12px;
          color: #47435A;
        }
      }
    }
  }

  .empty-data {
    .icon { font-size: 40px; }
    span {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }
}
</style>
