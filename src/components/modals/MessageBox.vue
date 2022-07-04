<template>
  <div id="messagebox-mask">
    <div id="confirmation-box">
      <p class="confirmation-text"> {{ message }} </p>
      <button class="btn" id="confirmation-btn">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    message: String,
    wordsArray: Array,
    currentDefinition: Number,
    errorCounter: Number,
  },
  data() {
    return {
      box: null,
    }
  },
  methods: {
    showMessageBox() {
      let self = this;
      //let box = document.getElementById('confirmation-box');
      this.mask.style.display="block";

      document.getElementById('confirmation-btn').onclick = function(){
         console.log("Click");
         self.$emit('clickedMessageBox');
         self.mask.style.display="none";
      };
    },
  },
  mounted() {
    this.box = document.getElementById('confirmation-box');
    this.mask = document.getElementById('messagebox-mask');
  },
  emits: ['clickedMessageBox']
}
</script>

<style lang="css" scoped>
#messagebox-mask {
  display: none;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

#confirmation-box {
  display: block;
  overflow: visible;
  background-color: var(--main-bg-color);
  border-radius: 5px;
  border: 1px solid #aaa;
  position: fixed;
  width: 300px;
  left: 50%;
  top: 25%;
  margin-left: -150px;
  padding: 6px 8px 8px;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 5px 10px #444444;
}

#confirmation-box button {
  background-color: var(--main-accent-color);
  display: inline-block;
  border-radius: 3px;
  border: 1px solid #aaa;
  padding: 2px;
  text-align: center;
  width: 80px;
  cursor: pointer;
}

#confirmation-box .button:hover {
  background-color: #ddd;
}
</style>
