<template>
  <div class="footer-container">
    <div class="footer">
      <router-link class="unstyled-link link" id="about" to="/about">About & Impressum</router-link>
      <p>© Bénédict Sandoz, 2022</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.footer-container {
  width: 100%;
  bottom: 0;
  background-color: #0d0d0d;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-top: 100px;
  min-height: 150px;
}
.footer {
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.link {
  position: relative;
  bottom: auto;
}
#about {
  color: var(--main-bg-color);
}
</style>
