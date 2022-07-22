<script>
export default {
  name: "DeviceWarning",
  emits: ['mobile'],
  methods: {
    getScreenSize() {
      let width = window.innerWidth;
      if (width >= 1000) {
        this.$emit('mobile', false)
      } else {
        this.$emit('mobile', true)
      }
    }
  },
  created() {
    window.addEventListener("resize", this.getScreenSize);
  },
  mounted() {
    this.getScreenSize();
  }
}
</script>

<template>
  <div class="mobile-warning">
    <div class="warning-container">
      <img id="logo" src="../assets/img/logo-v1.png" alt="">
      <div class="warning-text">
        <h2>Für diese Webseite existiert noch keine Mobile-Version!</h2>
        <p>Bitte nutze diese Webseite auf einem Laptop- oder Desktop-Bildschirm.</p>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
  .mobile-warning {
    position: fixed;
    background-color: var(--main-accent-color);
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .warning-container {
    display: block;
    width: 90%;
    border-radius: 25px;
    margin-top: 10%;
    margin-left: auto;
    margin-right: auto;
    background-color: var(--main-bg-color);
  }

  .warning-text {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    padding: 20px;
    text-align: center;
  }

  #logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 200px;
    max-height: 200px;
  }

</style>
