<template>
  <b-toast id="entry-poin-toast" class="invite-team" title="Added New Entry Point" static no-auto-hide hide>
    <div>
      <div v-for="(teamMember, index) in teamMembers" :key="index" class="d-flex flex-column align-items-center gap-2 my-2">
        <div class="w-100">
          <label class="text-gray-700">Enter Name</label>
          <b-input v-model="teamMembers[index].email" type="email" required></b-input>
        </div>
      </div>
    </div>
    <div class="px-3 py-3 d-flex align-items-center justify-content-between">
      <a href="javascript:void(0)" class="text-danger" @click="discard">Discard</a>
      <b-button variant="success" @click='invite'>Add</b-button>
    </div>
  </b-toast>
  <!--  <div class="position-absolute">-->
  <!--    -->
  <!--  </div>-->
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
      teamMembers: [{}]
    }
  },
  methods: {
    show() {
      this.$bvToast.show('entry-poin-toast')
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
