<template>
  <div v-if="content">
    <h3 id="basics" v-if="userIsLoggedIn">Teil 1 - Die Grundlagen:</h3>
    <SingleModule
      class="container btn"
      :id="'single-module-' + singleModule.id"
      v-for="singleModule in content"
      :key="singleModule.id"
      @click="setActiveModule(singleModule)"
      :single-module="singleModule"
      :class= "{ bgcompleted: singleModule.isCompleted }"
    />
    <div class="divider"></div>
    <SingleChallenge
      class="container btn"
      :id="'challenge-' + challenge.id"
      v-for="challenge in challenges"
      :key="challenge.id"
      @click="setActiveChallenge(challenge)"
      :single-challenge="challenge"
      :class= "{ bgcompleted: challenge.isCompleted }"
    />
    <div class="divider"></div>
    <h3 id ="basics" v-if="userIsLoggedIn">Teil 2 - Für Fortgeschrittene:</h3>
    <div id="coming-soon-box" class="container btn" v-if="userIsLoggedIn">
      <h2 id="coming-soon-text">Coming Soon!</h2>
    </div>
  </div>
</template>

<script>
import SingleModule from './SingleModule.vue';
import SingleChallenge from './SingleChallenge.vue';

import { useModuleStore } from '@/store/ModuleStore.js'
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: 'Content',
  components: {
    SingleModule,
    SingleChallenge,
  },
  props: {
    content: Object,
    challenges: Object,
  },
  computed: {
    ...mapState(useModuleStore, ['activeModule']),
    ...mapState(useUserStore, ['userIsLoggedIn']),
  },
  methods: {
    ...mapActions(useModuleStore, ['setActiveModule']),
    ...mapActions(useModuleStore, ['setActiveChallenge']),
  },
}
</script>

<style lang="css" scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    max-width: 60%;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid var(--main-dark-color);
    padding: 30px;
    border-radius: 5px;
    background-color: var(--main-bg-color);
  }
  #basics {
    max-width: 60%;
    margin: 30px auto;
    color: var(--dark-bg-text-color);
  }
  #single-module-1 {
    background-image: url(../assets/img/module1bg.png);
    background-position: right;
    background-repeat: no-repeat;
  }
  #single-module-1:hover {
    box-shadow: 3px 6px #000000;
  }
  #single-module-2 {
    background-image: url(../assets/img/module2bg.png);
    background-position: right;
    background-repeat: no-repeat;
  }
  #single-module-2:hover {
    box-shadow: 3px 6px #000000;
  }
  #single-module-3 {
    background-image: url(../assets/img/module3bg.png);
    background-position: right;
    background-repeat: no-repeat;
  }
  #single-module-3:hover {
    box-shadow: 3px 6px #000000;
  }
  #challenge-1 {
    background-image: url(../assets/img/challengebg.png);
    background-position: right;
    background-repeat: no-repeat;
    border-style: groove;
    border-color: var(--main-accent-color);
  }
  #challenge-1:hover {
    box-shadow: 3px 6px #000000;
  }
  .bgcompleted {
    background-image: linear-gradient(to right, var(--main-bg-color) , var(--confirm-color));
    border-color: var(--confirm-color);
    border-width: thick;
  }
  #coming-soon-text {
    font-size: clamp(24pt, 4vw, 48pt);
    align-self: center;
    margin-left: auto;
    margin-right: auto;
  }
  .divider {
    margin-bottom: 150px;
  }
</style>
