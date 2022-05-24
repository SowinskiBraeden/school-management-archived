<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <router-link to="/" type="button" class="btn btn-secondary">Back</router-link>
  </nav>
  <div class="login-form">
    <h1>Teacher Login</h1>
    <!-- SID input -->
    <div class="form-outline mb-4">
      <label class="form-label" for="sid">Teacher #</label>
      <input type="text" id="sid" class="form-control" />
    </div>

    <!-- Password input -->
    <div class="form-outline mb-4">
      <label class="form-label" for="pass">Password</label>
      <input type="password" id="pass" class="form-control" />
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
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'TeacherLogin',
    data () {
      return {
        error: ''
      }
    },
    methods: {
      login () {
        const loginObject = JSON.stringify({ tid: document.getElementById('sid').value, password: document.getElementById('pass').value })

        axios.post(`${process.env.VUE_APP_API_URL}/teacher/login`,
          loginObject,
          { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        )
        .catch(function (error) {
          this.error = error.response.data.message
        }).then(res => {
          if (res.data.success) {
            this.$router.push('/teacher-dashboard')
          } else {
            this.error = res.data.message
          }
        })
      },
      isAuthenticated () {
        axios.get(`${process.env.VUE_APP_API_URL}/teacher`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/teacher-dashboard')
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
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
