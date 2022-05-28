<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <button v-on:click="logout()" type="button" class="btn btn-secondary">Logout</button>
  </nav>

  <h1>Student Dashboard</h1>
  <div v-if="student!=null">
    <h6>Name: {{ student.personaldata.firstname }} {{ student.personaldata.lastname }}</h6>
    <h6>Email: {{ student.accountdata.schoolemail }}</h6>
    <h6>Student ID: {{ student.schooldata.sid }}</h6>
  </div>
  <img id='schoolimage' style='display:block; width:100px;height:100px;' src='' />

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'StudentDashboard',
    data () {
      return {
        student: null,
        locker: null,
        photo: null,
        contacts: null
      }
    },
    methods: {
      getStudent: function () {
        axios.get(`${process.env.VUE_APP_API_URL}/student`, { withCredentials: true })
        .catch(error => {
          if (error) {
            this.$router.push(`/login-student?error=${encodeURI(error.response.data.message)}`)
          }
        })
        .then((res) => {
          if (res && res.data.success) {
            this.student = res.data.response.student
            this.locker = res.data.response.locker
            this.photo = `data:image/jpeg;base64,${res.data.response.photo.base64}`
            document.getElementById('schoolimage').src = this.photo
            this.contacts = res.data.response.contacts
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
      this.getStudent()
    }
  }
</script>
