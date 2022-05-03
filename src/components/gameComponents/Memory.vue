<template>
  <h3>Test</h3>
  <div class="exercise">
    <div class="memory-container">
      <div class="memory-box">
        <h4>Memory-Box 1</h4>
      </div>
      <div class="memory-box" @click="toggleVisibility" :class="{visible: isVisible}">
        <h4>Memory-Box 2</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 3</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 4</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 5</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 6</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 7</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 8</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 9</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 10</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 11</h4>
      </div>
      <div class="memory-box">
        <h4>Memory-Box 12</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Memory',
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    toggleVisibility() {
      if (this.isVisible) {
        this.isVisible = false;
      } else {
        this.isVisible = true;
      }
    },
  },
}
</script>

<style lang="css" scoped>
  .exercise {
    display: flex;
    width: 100%;
  }
  .memory-container {
    display: grid;
    width: 75%;
    height: auto;
    align-self: center;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .memory-box {
    width: 200px;
    height: 200px;
    border-style: solid;
    border-color: grey;
    margin-bottom: 50px;
  }
  .visible {
    background-color: green;
  }
</style>
