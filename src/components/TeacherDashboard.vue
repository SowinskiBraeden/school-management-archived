<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <button v-on:click="logout()" type="button" class="btn btn-secondary">Logout</button>
  </nav>

  <h1>Teacher Dashboard</h1>
  <div v-if="teacher!=null">
    <h6>Name: {{ teacher.personaldata.firstname }} {{ teacher.personaldata.lastname }}</h6>
    <h6>Email: {{ teacher.accountdata.schoolemail }}</h6>
    <h6>Student ID: {{ teacher.schooldata.tid }}</h6>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'TeacherDashboard',
    data () {
      return {
        teacher: null
      }
    },
    methods: {
      getTeacher: function () {
        axios.get('http://localhost:8000/api/v1/teacher', { withCredentials: true })
        .catch(error => {
          if (error) this.$router.push('/teacher-login')
        })
        .then((res) => {
          if (res.data.success) {
            this.teacher = res.data.result
          }
        })
      },
      logout: function () {
        axios.post('http://localhost:8000/api/v1/logout', {}, { withCredentials: true })
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
