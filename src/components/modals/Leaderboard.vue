<script>
import { useUserStore } from '@/store/UserStore.js'
//import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: "Leaderboard",
  props: {

  },
  data() {
    return {
      box: null,
      mask: null,
    }
  },
  methods: {
    showLeaderboard(id) {
      let self = this;
      //let box = document.getElementById('confirmation-box');
      this.mask.style.display="block";

      this.getUsersDataForLeaderboard("https://db-easymusictheory.directus.app/items/users", id);

      document.getElementById('close-btn').onclick = function(){
         console.log("Click");
         self.$emit('clickedLeaderboard');
         self.mask.style.display="none";
      };
    },
    ...mapActions(useUserStore, ['getUsersDataForLeaderboard']),
  },
  computed: {
    ...mapState(useUserStore, ['activeLeaderboard']),
    ...mapState(useUserStore, ['userDataForLeaderboard']),
    ...mapState(useUserStore, ['userDataForLeaderboard2']),
    ...mapState(useUserStore, ['userDataForLeaderboard3']),
  },
  mounted() {
    this.box = document.getElementById('leaderboard-box');
    this.mask = document.getElementById('leaderboard-mask');
  },
  emits: ['clickedLeaderboard']
}
</script>

<template>
  <div id="leaderboard-mask">
    <div id="leaderboard-box">
      <h3>Rangliste</h3>
      <table class="leaderboard-table">
        <tr>
          <th>Position</th>
          <th>Name</th>
          <th>Punktzahl</th>
        </tr>
        <tr v-if="this.activeLeaderboard === 1" v-for="(item, index) in this.userDataForLeaderboard">
          <th v-html="index + 1"></th>
          <th v-html="item.username"></th>
          <th v-html="item.module1Score"></th>
        </tr>
        <tr v-if="this.activeLeaderboard === 2" v-for="(item, index) in this.userDataForLeaderboard">
          <th v-html="index + 1"></th>
          <th v-html="item.username"></th>
          <th v-html="item.module2Score"></th>
        </tr>
        <tr v-if="this.activeLeaderboard === 3" v-for="(item, index) in this.userDataForLeaderboard">
          <th v-html="index + 1"></th>
          <th v-html="item.username"></th>
          <th v-html="item.module3Score"></th>
        </tr>
      </table>
      <button class="btn" id="close-btn">Schliessen</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
  #leaderboard-mask {
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

  #leaderboard-box {
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
</style>
