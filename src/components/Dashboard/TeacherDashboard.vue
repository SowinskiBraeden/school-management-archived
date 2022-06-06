<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <button v-on:click="logout()" type="button" class="btn btn-secondary">Logout</button>
  </nav>

  <h1>Teacher Dashboard</h1>
  <div v-if="!waiting">
    <div v-if="teacher!=null">
      <h6>Name: {{ teacher.personaldata.firstname }} {{ teacher.personaldata.lastname }}</h6>
      <h6>Email: {{ teacher.accountdata.schoolemail }}</h6>
      <h6>Teacher ID: {{ teacher.schooldata.tid }}</h6>
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
    name: 'TeacherDashboard',
    data () {
      return {
        waiting: true,
        teacher: null
      }
    },
    methods: {
      getTeacher: function () {
        axios.get(`${process.env.VUE_APP_API_URL}/teacher`, { withCredentials: true })
        .catch(error => {
          if (error) this.$router.push('/teacher-login')
        })
        .then((res) => {
          if (res.data.success) {
            this.teacher = res.data.result
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
      this.getTeacher()
    }
  }
</script>
