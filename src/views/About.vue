<template>
  <div class="about-box">
    <h3>v0.0.1a</h3>
    <p>Es handelt sich bei dieser Seite um eine Alpha-Version, die sich noch im Aufbau befindet.</p>
    <router-link to="/">Zurück zur Startseite</router-link>
  </div>
</template>

<script>
export default {
  name: 'About',
  inheritAttrs: false, // disable 'non-props' warning
};
</script>

<style scoped>
  .about-box {
    background-color: var(--main-bg-color);
    padding: 5%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 100px;
    margin-bottom: 100px;
    border-radius: 10px;
  }
</style>
