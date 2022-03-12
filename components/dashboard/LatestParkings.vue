<template>
  <div class="latest-parkings">
<!--    <div v-if='$fetchState.pending'>-->
<!--      <div class="d-flex justify-content-between -head">-->
<!--        <div class="b-title">Latest Sign-up Tracker</div>-->
<!--        <b-skeleton width='50px' height='28px'/>-->
<!--      </div>-->

<!--      <div class="b-body">-->
<!--        <b-card v-for='n in 5' :key='n' no-body>-->
<!--          <div class="d-flex">-->
<!--            <b-skeleton type="avatar" width='2.5rem' height='2.5rem'></b-skeleton>-->
<!--            <b-card-body class="p-0 pl-3">-->
<!--              <b-card-text>-->
<!--                <div class="d-flex justify-content-between">-->
<!--                  <div class="details">-->
<!--                    <div class="name"><b-skeleton width='150px' height='20px'/></div>-->
<!--                    <div class="email"><b-skeleton width='100px'/></div>-->
<!--                  </div>-->
<!--                  <div class="amount-status text-right">-->
<!--                    <div><b-skeleton width='65px'>{{ n }}</b-skeleton></div>-->
<!--                    <b-skeleton class='float-right' type="button" width='50px' height='25px'/>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </b-card-text>-->
<!--            </b-card-body>-->
<!--          </div>-->
<!--        </b-card>-->
<!--      </div>-->

<!--      <div class="d-flex justify-content-between -foot">-->
<!--        <b-skeleton type="button" width='100px'/>-->
<!--        <b-skeleton type="button" width='100px'/>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div v-else>-->
    <div>
      <div class="d-flex justify-content-between -head">
        <div class="b-title">Latest Parkings</div>
      </div>

      <div class="b-body">
        <nuxt-link to="#">
          <b-card no-body>
            <div class="d-flex">
              <b-avatar text="AP"></b-avatar>
              <b-card-body class="p-0 pl-3">
                <b-card-text>
                  <div class="d-flex justify-content-between">
                    <div class="details">
                      <div class="name">{{ 'Adam Park' }}</div>
                      <div class="time-period">{{ '2 hours ago' }}</div>
                    </div>
                    <div class="amount-status text-right">
                      <div>{{ '₱0.00' }}</div>
                      <Badge
                        :name="'Parked'"
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

        <nuxt-link to="#">
          <b-card no-body>
            <div class="d-flex">
              <b-avatar text="BA"></b-avatar>
              <b-card-body class="p-0 pl-3">
                <b-card-text>
                  <div class="d-flex justify-content-between">
                    <div class="details">
                      <div class="name">{{ 'Bea Alejandro' }}</div>
                      <div class="time-period">{{ '4 hours ago' }}</div>
                    </div>
                    <div class="amount-status text-right">
                      <div>{{ '₱140.00' }}</div>
                      <Badge
                        :name="'Unparked'"
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

        <nuxt-link to="#">
          <b-card no-body>
            <div class="d-flex">
              <b-avatar text="JS"></b-avatar>
              <b-card-body class="p-0 pl-3">
                <b-card-text>
                  <div class="d-flex justify-content-between">
                    <div class="details">
                      <div class="name">{{ 'John Smith' }}</div>
                      <div class="time-period">{{ '3 hours ago' }}</div>
                    </div>
                    <div class="amount-status text-right">
                      <div>{{ '₱40.00' }}</div>
                      <Badge
                        :name="'Unparked'"
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




      <div class="d-flex justify-content-between -foot mt-4">
        <b-button variant="outline-secondary" class='refresh' >Refresh</b-button>
        <b-button variant="outline-primary" to="/agreements">View All</b-button>
      </div>
    </div>

    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {
      requests: [],
      currentPage: 1,
      rows: 1,
      perPage: 1,
      scaffoldUrl: null,
      inputPageNum: null,
      show: 5
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
