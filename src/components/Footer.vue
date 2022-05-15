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

}
.footer-container {
  height: 200px;
  width: 100%;
  background-color: grey;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: 100px;
}
.link {
  position: relative;
  bottom: auto;
}
</style>
