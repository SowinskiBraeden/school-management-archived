<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <router-link to="/" type="button" class="btn btn-secondary">Back</router-link>
  </nav>
  <div v-if="!waiting" class="login-form">
    <h1>Admin Login</h1>
    <!-- SID input -->
    <div class="form-outline mb-4">
      <label class="form-label" for="sid">Admin #</label>
      <input @keyup.enter="next()" type="text" id="sid" class="form-control" autofocus/>
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <label class="form-label" for="pass">Password</label>
      <input @keyup.enter="login()" type="password" id="pass" class="form-control" />
    </div>

    <!-- 2 column grid layout for inline styling -->
    <div class="row mb-4">
      <div class="col">
        <!-- Simple link -->
        <a href="#!">Forgot password?</a>
      </div>
    </div>

    <!-- Submit button -->
    <button v-on:click="login()" type="button" class="btn btn-primary btn-block mb-4">Sign in</button>
    <p class="text-danger ">{{ error }}</p>
  </div>

  <!-- Loading -->
  <div v-else class="loader">
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
    <div class="loader__bar"></div>
    <div class="loader__ball"></div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'AdminLogin',
    data () {
      return {
        error: '',
        waiting: false
      }
    },
    methods: {
      next () { document.getElementById('pass').focus() },
      login () {
        this.error = '' // Hide any errors till new one is recieved
        this.waiting = true
        const loginObject = JSON.stringify({ aid: document.getElementById('sid').value, password: document.getElementById('pass').value })

        axios.post(`${process.env.VUE_APP_API_URL}/admin/login`,
          loginObject,
          { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        )
        .catch(function (error) {
          this.error = error.response.data.message
          this.waiting = false
        }).then(res => {
          if (res.data.success) {
            this.$router.push('/admin-dashboard')
          } else {
            this.error = res.data.message
            this.waiting = false
          }
        })
      },
      isAuthenticated () {
        axios.get(`${process.env.VUE_APP_API_URL}/admin`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/admin-dashboard')
          }
        })
      }
    },
    created: function () {
      this.isAuthenticated()
    }
  }
</script>

<style>
  @import '../../assets/styles/loader.css';
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
