<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <router-link to="/" type="button" class="btn btn-secondary">Back</router-link>
  </nav>
  <StudentLogin />
</template>

<script lang="ts">
  import StudentLogin from '../components/StudentLogin.vue'

  export default {
    name: 'StudentView',
    components: {
      StudentLogin
    }
  }
</script>
