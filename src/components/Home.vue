<template>
  <h1>Login as</h1>
  <div class="options">
    <router-link to="/login-student" type="button" class="btn btn-success link"><strong>Student</strong></router-link>
    <router-link to="/login-teacher" type="button" class="btn btn-info link"><strong>Teacher</strong></router-link>
    <router-link to="/login-admin" type="button" class="btn btn-secondary link"><strong>Admin</strong></router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
  h1 {margin-top: 50px;}

  .options {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .link {
    position: relative;
    left: 50%;
    top: 25%;
    transform:translate(-50%,-50%);
    display: block;
    max-width: 180px;
    padding: 16px;
    margin-top: 15px;
  }
</style>
