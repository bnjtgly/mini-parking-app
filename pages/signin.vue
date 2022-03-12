<template>
  <div class='main-content d-flex mt-4 flex-column align-items-center justify-content-between'>
    <div class='text-right p-4 w-100'>
    </div>
    <div class='login-content mt-4 d-flex flex-column'>
      <p class='h1 mb-5'>Sign in as Administrator</p>
      <b-form @submit.prevent='userLogin'>
        <div class='email-input mb-3'>
          <label>Email Address</label>
          <b-form-input
            v-model='login.email'
            required
            trim
            type='email'
          ></b-form-input>
        </div>
        <div class='password-input mb-2'>
          <label>Password</label>
          <b-form-input
            v-model='login.password'
            required
            trim
            type='password'
          ></b-form-input>
        </div>
        <div class='d-flex align-items-center justify-content-between'>
          <b-form-checkbox>
            Remember Me
          </b-form-checkbox>
          <nuxt-link class='text-success' to="/password/forgot">Forgot Password?</nuxt-link>
        </div>
        <b-button
          variant='success'
          class='py-2 mt-5 w-100'
          type='submit'
          :disabled="isSubmit">
          <b-spinner v-if="isSubmit" class="mr-1" small></b-spinner>
          Log me in
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  // Prevent access of login if user is authenticated.
  auth: 'guest',

  data() {
    return {
      login: {
        email: '',
        password: ''
      },
      isSubmit: false
    }
  },

  methods: {
    async userLogin() {
      if(!this.isSubmit) {
        try {
          await this.$auth.loginWith('local', { data: {user: this.login} })
        } catch (err) {
          if (err.response) {
            for (const [value] of Object.entries(err.response.data.error)) {
              for (const msg of err.response.data.error[value]) {
                this.$toast.error(msg)
              }
            }
          }
        } finally {
          this.isSubmit = false
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>

.main-content {
  width: 100%;

  .login-content {
    width: 400px;
  }
}
</style>
