<template>
  <div class="footer-container">
    <div class="footer">
      <router-link class="link" to="/about">About</router-link>
      <p>Bachelor-Projekt von Bénédict Sandoz, 2022</p>
    </div>
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
  width: 100%;
  bottom: 0;
  background-color: var(--main-dark-color);
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: 100px;
}
.footer {
  margin-top: auto;
}
.link {
  position: relative;
  bottom: auto;
}
</style>
