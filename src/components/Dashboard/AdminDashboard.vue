<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <button v-on:click="logout()" type="button" class="btn btn-secondary">Logout</button>
  </nav>

  <h1>Admin Dashboard</h1>
  <div v-if="!waiting">
    <div v-if="admin!=null">
      <h6>Name: {{ admin.firstname }} {{ admin.lastname }}</h6>
      <h6>Email: {{ admin.schoolemail }}</h6>
      <h6>Student ID: {{ admin.aid }}</h6>
    </div>
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
    name: 'Admin',
    data () {
      return {
        waiting: true,
        admin: null
      }
    },
    methods: {
      getAdmin: function () {
        axios.get(`${process.env.VUE_APP_API_URL}/admin`, { withCredentials: true })
        .catch(error => {
          if (error) this.$router.push('/admin-login')
        })
        .then((res) => {
          if (res.data.success) {
            this.admin = res.data.result
            this.waiting = false
          }
        })
      },
      logout: function () {
        axios.post(`${process.env.VUE_APP_API_URL}/logout`, {}, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            this.$router.push('/')
          }
        })
      }
    },
    created: function () {
      this.getAdmin()
    }
  }
</script>
