<template>
  <div id="confirmation-box">
    <p class="confirmation-text"> {{ message }} </p>
    <button class="btn" id="confirmation-btn">OK</button>
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
      this.box.style.display="block";

      document.getElementById('confirmation-btn').onclick = function(){
         console.log("Click");
         self.$emit('clickedMessageBox');
         self.box.style.display="none";
      };
    },
  },
  mounted() {
    this.box = document.getElementById('confirmation-box');
  },
  emits: ['clickedMessageBox']
}
</script>

<style lang="css" scoped>
#confirmation-box {
  display: none;
  overflow: visible;
  background-color: #eee;
  border-radius: 5px;
  border: 1px solid #aaa;
  position: fixed;
  width: 300px;
  left: 50%;
  margin-left: -150px;
  padding: 6px 8px 8px;
  box-sizing: border-box;
  text-align: center;
}

#confirmation-box button {
  background-color: #ccc;
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
