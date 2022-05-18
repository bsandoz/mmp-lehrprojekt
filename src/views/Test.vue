<template>
  <div v-if="!testFinished">
    <h3 class="site-title" v-if="showTitle">Versuchsdurchführung Thesis</h3>
    <Lead v-if="!showGames && !isMemory && !isHangman" lead="Willkommen zur Versuchsdurchführung für meine Bachelorthesis! Es folgt ein kurzer Theorieinput
      (Lesezeit ca. 5 Minuten) zum Thema Datenvisualisierungen. Daraufhin wirst Du gebeten, eines von zwei bekannten Spielen
      zu spielen, mithilfe deren Dein erlerntes Wissen zu Datenvisualisierungen auf unterhaltsame Art
      abgefragt und gefestigt werden soll. Zum Schluss folgt noch ein kurzer Fragebogen zum Versuch. Ich wünsche Dir viel Erfolg und viel Spass!"/>
    <TestUserInfo v-if="!showGames && !isMemory && !isHangman" @set-user-info="setUserInfo"/>
    <TestSelectGame v-if="showGames" @set-memory="setMemory" @set-hangman="setHangman" />
    <Memory v-if="isMemory" @hideTestLead="hideTestLead" />
    <Hangman v-if="isHangman" @hideTestLead="hideTestLead" />
  </div>
  <div v-if="testFinished" id="error-message">
    <h3>Du hast den Versuch bereits durchgeführt!</h3>
  </div>
</template>

<script>
import TestUserInfo from '../components/TestUserInfo.vue'
import Lead from '../components/Lead.vue'
import TestSelectGame from '../components/gameComponents/TestSelectGame.vue'

import Memory from '../components/gameComponents/Memory.vue'
import Hangman from '../components/gameComponents/Hangman.vue'
import TestQuestions from '../components/gameComponents/TestQuestions.vue'

import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: 'Exercise',
  components: {
    TestUserInfo,
    Lead,
    TestSelectGame,
    Memory,
    Hangman,
    TestQuestions,
  },
  data() {
    return {
      showGames: false,
      isMemory: false,
      isHangman: false,
      showTitle: true,

      userId: null,
      testFinished: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['testUserId']),
  },
  methods: {
    setUserInfo() {
      //log returns null here, probably because of timing issues?
      console.log(this.testUserId);
      this.showGames = true;
      console.log("Set user info true");
    },
    setMemory() {
      this.isMemory = true;
      this.showGames = false;
    },
    setHangman() {
      this.isHangman = true;
      this.showGames = false;
    },
    hideTestLead() {
      this.showTitle = false;
    }
  },
  mounted() {
    this.testFinished = localStorage.getItem("testFinished");
    console.log(this.testFinished);
  }

}
</script>

<style lang="css" scoped>
  #error-message {
    margin-top: 50px;
  }
</style>
