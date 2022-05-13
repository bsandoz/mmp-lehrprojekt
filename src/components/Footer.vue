<template>
  <div class="footer-container">
    <router-link class="link" to="/about">About</router-link>
    <p>Bachelor-Projekt von Bénédict Sandoz, 2022</p>
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
  justify-content: space-around;
  align-items: center;
}
.footer-container {
  height: 7.5%;
}
.link {
  position: relative;
  bottom: auto;
}
</style>
