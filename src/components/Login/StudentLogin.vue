<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <router-link to="/" type="button" class="btn btn-secondary">Back</router-link>
  </nav>
  <div class="login-form">
    <h1>Student Login</h1>
    <!-- SID input -->
    <div class="form-outline mb-4">
      <label class="form-label" for="sid">Student #</label>
      <input type="text" id="sid" class="form-control" />
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
    <button @click="login()" type="button" class="btn btn-primary btn-block mb-4">Sign in</button>
    <p class="text-danger">{{ error }}</p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'StudentLogin',
    data () {
      return {
        error: ''
      }
    },
    methods: {
      exists (e) {
        return (e !== undefined && e !== null && e !== '')
      },
      login () {
        this.error = '' // Hide any errors till new one is recieved
        const loginObject = JSON.stringify({ sid: document.getElementById('sid').value, password: document.getElementById('pass').value })

        axios.post(`${process.env.VUE_APP_API_URL}/student/login`,
          loginObject,
          { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
        )
        .catch(function (error) {
          this.error = error.response.data.message
        }).then(res => {
          if (res.data.success) {
            this.$router.push('/student-dashboard')
          } else {
            this.error = res.data.message
          }
        })
      },
      isAuthenticated () {
        axios.get(`${process.env.VUE_APP_API_URL}/student`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/student-dashboard')
          }
        })
      }
    },
    created: function () {
      const hasError = new URL(location.href).searchParams.get('error')
      if (this.exists(hasError)) this.error = hasError
      else this.isAuthenticated()
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
