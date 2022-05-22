<template>
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
    name: 'StudentLogin',
    data () {
      return {
        error: ''
      }
    },
    methods: {
      login () {
        const loginObject = JSON.stringify({ sid: document.getElementById('sid').value, password: document.getElementById('pass').value })

        axios.post('http://localhost:8000/api/v1/student/login',
          loginObject,
          { headers: { 'Content-Type': 'application/json' } })
        .catch(function (error) {
            if (error.response) this.error = error.response.data.message
        }).then(res => {
          if (res.data.success) {
            // this.$router.push('/student-dashboard')
            this.error = 'successfully logged in'
          } else {
            this.error = res.data.message
          }
        })
      }
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
