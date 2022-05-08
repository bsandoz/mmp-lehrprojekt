<template>
  <h3>Versuchsdurchführung Thesis</h3>
  <Lead v-if="!showGames" lead="Willkommen zur Versuchsdurchführung für meine Bachelorthesis! Es folgt ein kurzer Theorieinput
    (Lesezeit ca. 5 Minuten) zum Thema Datenvisualisierungen. Daraufhin wirst Du gebeten, eines von zwei bekannten Spielen
    zu spielen, mithilfe deren Dein erlerntes Wissen zu Datenvisualisierungen auf unterhaltsame Art
    abgefragt und gefestigt werden soll. Ich wünsche Dir viel Erfolg und viel Spass!"/>
  <TestUserInfo v-if="!showGames" @set-user-info="setUserInfo"/>
  <TestSelectGame v-if="showGames" @set-memory="setMemory" @set-hangman="setHangman" />
  <Memory v-if="isMemory" />
  <Hangman v-if="isHangman" />
</template>

<script>
import TestUserInfo from '../components/TestUserInfo.vue'
import Lead from '../components/Lead.vue'
import TestSelectGame from '../components/gameComponents/TestSelectGame.vue'

import Memory from '../components/gameComponents/Memory.vue'
import Hangman from '../components/gameComponents/Hangman.vue'

export default {
  name: 'Exercise',
  components: {
    TestUserInfo,
    Lead,
    TestSelectGame,
    Memory,
    Hangman,
  },
  data() {
    return {
      showGames: false,
      isMemory: false,
      isHangman: false,
    }
  },
  methods: {
    setUserInfo() {
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
    }
  }

}
</script>

<style lang="css" scoped>
</style>
