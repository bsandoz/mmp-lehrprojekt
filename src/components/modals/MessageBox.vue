<template>
  <div id="confirmation-box">
    <p class="confirmation-text"> {{ message }} </p>
    <button class="btn" id="confirmation-btn">Ok</button>
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
  methods: {
    showMessageBox() {
      let box = document.getElementById('confirmation-box');
      box.style.display="block";

      document.getElementById('confirmation-btn').onclick = function(){
         // Do your delete operation
          box.style.display="none";
      };
    },
  },
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
