<template>
  <div class="footer-container">
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
* {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: grey;
  display: flex;
  justify-content: center;
}
.footer-container {
  height: 5%;
}
</style>
