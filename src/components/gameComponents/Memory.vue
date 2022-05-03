<template>
  <h3>Test</h3>
  <div class="exercise">
    <div class="memory-container" @click="startGame">
      <h4 >Übung starten!</h4>

    </div>
  </div>
</template>

<script>
import { h } from 'vue'

export default {
  name: 'Memory',
  data() {
    return {
      isVisible: false,
      isGameRunning: false,
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
    startGame() {
      if (this.isGameRunning) {
        console.log("Stopped game");
        this.isGameRunning = false;
      } else {
        console.log("Started game");
        this.isGameRunning = true;
        const vnode = h(
          'div',
          { class: 'memory-box' },
        )

        /*
        for (var i = 0; i < 12; i++) {
          let memoryContainer = document.querySelector('.memory-container');
          let memoryBox = document.createElement("div");
          memoryBox.classList.add("memory-box")
          memoryContainer.appendChild(memoryBox);
        }
        let memoryboxArray = document.getElementsByClassName('memory-box');
        console.log(memoryboxArray);
        */
      }
    }
  },
  render() {
    return h('div', { class: 'memory-box' })
  }
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

<!--
<div class="memory-box" @click="toggleVisibility" :class="{visible: isVisible}">
  <h4>Memory-Box</h4>
</div>
-->
