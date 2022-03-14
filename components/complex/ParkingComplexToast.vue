<template>
  <b-toast id="parking-complex-toast" class="invite-team" title="New Parking Complex" static no-auto-hide hide>
    <div>
      <div v-for="(complex, index) in parkingComplex" :key="index" class="d-flex flex-column align-items-center gap-2 my-2">
        <div class="w-100">
          <label class="text-gray-700">Enter Name</label>
          <b-input v-model="parkingComplex[index].name" type="email" required></b-input>
        </div>
      </div>
    </div>
    <div class="px-3 py-3 d-flex align-items-center justify-content-between">
      <a href="javascript:void(0)" class="text-danger" @click="discard">Discard</a>
      <b-button variant="success" @click='invite'>Add</b-button>
    </div>
  </b-toast>

</template>

<script>
export default {
  props: {
    roles: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      parkingComplex: [{}]
    }
  },
  methods: {
    show() {
      this.$bvToast.show('parking-complex-toast')
    },
    discard() {
      this.$bvToast.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.invite-team::v-deep {
  width: 400px;
  max-width: 400px;
  position: absolute;
  top: 3rem;
  right: 0;
  .toast {
    background-color: var(--white);
    max-width: 400px;
    .toast-header {
      padding: 0.75rem;
      strong, button {
        color: var(--gray-1000);
        font-weight: normal
      }
    }
  }
}
</style>
