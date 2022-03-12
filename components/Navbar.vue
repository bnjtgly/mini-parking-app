<template>
  <nav v-if='isAuthenticated' class='navbar navbar-expand-lg py-0'>
    <img src='/images/advanceme-white-logo-only.svg' class='mr-2'>
    <div class='collapse navbar-collapse'>
      <ul class='navbar-nav'>
        <nuxt-link to='/' exact class='d-flex align-items-center'>
          <svg xmlns='http://www.w3.org/2000/svg' width='13' height='13' fill='currentColor' class='bi bi-columns-gap mr-1' viewBox='0 0 16 16'>
            <path d='M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z'/>
          </svg>
          <span>Dashboard</span>
        </nuxt-link>
        <nuxt-link to='/complex'>
          <span>Parking Complex</span>
        </nuxt-link>
        <nuxt-link to='/parking'>
          <span>Parking</span>
        </nuxt-link>
      </ul>


      <b-input-group class='ml-auto mr-2 w-20'>
        <b-form-input class='bg-light text-white border-0 outline-none pl-2' placeholder='Search Mini Park'></b-form-input>
      </b-input-group>

      <ul class='navbar-nav navbar-icons'>
        <nuxt-link to='#' @click.native='logout'>
          <span>Logout</span>
        </nuxt-link>
      </ul>

      <b-avatar
        size='36px'
        class='ml-2'
        :src="'/images/user-profile-img-placeholder.svg'"
      ></b-avatar>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      if(confirm("Confirm logout?")){
        await this.$auth.logout()
        await this.$router.push('/signin')
      }
    }
  }
}
</script>

<style lang='scss'>
.navbar {
  height: 60px;
  background: rgb(33,117,102);
  background: linear-gradient(90deg, rgba(33,117,102,1) 0%, rgba(78,156,130,1) 50%);
  .navbar-nav {
    a {
      height: 100%;
      margin: 0 .75rem;
      position: relative;
      color: var(--gray-500);
      &:hover {
        color: var(--gray-100);
        &::after {
          position: absolute;
          content: '';
          width: 100%;
          height: 2px;
          border-bottom: 2px solid var(--success);
          left: 0;
          bottom: -19.5px;
          z-index: 1;
        }
      }
    }
    .nuxt-link-active {
      height: 100%;
      margin: 0 .75rem;
      position: relative;
      color: var(--white);
      &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 2px;
        border-bottom: 2px solid var(--success);
        left: 0;
        bottom: -19.5px;
        z-index: 1;
      }
    }
    &.navbar-icons .nuxt-link-active {
      &::after {
        border: 0;
      }
    }
  }
}

.w-20 {
  width: 20%;
}



</style>

