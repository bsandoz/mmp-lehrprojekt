<template>
  <div class="exercise">
    <div class="memory-container" @click="startGame" :if="this.testQuizCompleted === false">
      <h4 v-if="this.isGameRunning === false">Memory starten!</h4>
      <div v-for="item in memoryboxArray" :key="item.id" v-if="this.isGameRunning">
        <div class="memory-box" @click="toggleVisibility(item)"
        :class="{visible: item.isVisible},{solved: item.isSolved}">
          <h3>{{ item.id }}</h3>
          <p>{{ item.fieldText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';

export default {
  name: 'Memory',
  data() {
    return {
      isGameRunning: false,
      memoryboxArray: null,
      visibilityCounter: 0,
      stopRevealing: false,
      firstBoxPair: 0,
      secondBoxPair: 0,
      firstBoxClicked: null,
      secondBoxClicked: null,
      triesNumber: 0,

      testQuizCompleted: null,
      userScore: Number,
    }
  },
  methods: {
    toggleVisibility(item) {
      if (item.isSolved === false) {
        if (item.isVisible) {
          console.log("Already visible");
        } else if (this.stopRevealing === false) {
          if (this.visibilityCounter === 0) {
            this.firstBoxPair = item.pair;
            this.firstBoxClicked = item;
            console.log(this.firstBoxPair);
          }
          if (this.visibilityCounter === 1) {
            this.secondBoxPair = item.pair;
            this.secondBoxClicked = item;
            console.log(this.secondBoxPair);
          }
          item.isVisible = true;
          this.visibilityCounter++;
          if (this.visibilityCounter >= 2) {
            this.stopRevealing = true;
            this.compareBoxes(this.firstBoxClicked, this.secondBoxClicked);
            setTimeout(this.makeBoxesInvisible, 3000);
          }
        } else {
          console.log("Not allowed to reveal more boxes right now.");
        }
      } else {
        console.log("Clicked box is already solved");
      }
    },
    async startGame() {
      try {
        if (this.isGameRunning) {
          await console.log("Already running game");
        } else {
          await console.log("Started game");

          await axios
            .get ("https://ifuu2646.directus.app/items/memoryGameElements")
            .then (response => (this.memoryboxArray = response.data.data))
            .catch (function(error) {
              console.log(error);
            })
          await this.shuffle(this.memoryboxArray);
          this.isGameRunning = true;
        }
      }
      catch (error) {
        console.log(error);
      }
    },
    shuffle(array) {
      let currentIndex = array.length,  randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    },
    makeBoxesInvisible() {
      for (var i = 0; i < this.memoryboxArray.length; i++) {
        this.memoryboxArray[i].isVisible = false;
      }
      this.visibilityCounter = 0;
      this.stopRevealing = false;
      this.firstBoxPair = 0;
      this.secondBoxPair = 0;
      this.firstBoxClicked = null;
      this.secondBoxClicked = null;
    },
    compareBoxes(firstBox, secondBox) {
      this.triesNumber++;
      if (this.firstBoxPair === this.secondBoxPair) {
        firstBox.isSolved = true;
        secondBox.isSolved = true;
        this.checkIfComplete(this.memoryboxArray);
      }
    },
    checkIfComplete(array) {
      let counter = 0;
      for (var i = 0; i < array.length; i++) {
        if (array[i].isSolved) {
          counter++;
          console.log(counter);
        }
      }
      if (array.length === counter) {
        console.log("All boxes solved");
        window.alert("Du hast alle Paare mit " + this.triesNumber + " Versuchen gefunden!")
        this.testQuizCompleted = true;
        localStorage.setItem("testQuizCompleted", true);
        this.userScore = this.triesNumber;
        //Only register in testUsers db if values are set
        if (this.testUserAge) {
          this.register();
        }
      }
    },
    prepareUserData() {
      console.log(this.userScore);
      return {
        age: this.testUserAge,
        gender: this.testUserGender,
        previousKnowledge: this.testUserPreviousKnowledge,
        scoreMemory: this.userScore,
      }
    },
    async register() {
      await console.log("Called register function in Memory.vue");
      const user = this.prepareUserData();
      await axios.post("https://ifuu2646.directus.app/items/testUsers", user)
        .then((response) => {
          console.log(response);
          window.alert("Herzlichen Dank für Deine Mithilfe! Die Resultate wurden in der Datenbank gespeichert. Du kannst dieses Fenster nun schliessen.")
        })
        .catch(err => {
          this.error.errorSubmit = true
        })
    }
  },
  computed: {
    ...mapState(useUserStore, ['testUserId']),
    ...mapState(useUserStore, ['testUserAge']),
    ...mapState(useUserStore, ['testUserGender']),
    ...mapState(useUserStore, ['testUserPreviousKnowledge']),
  },
  created() {
    this.testQuizCompleted = localStorage.getItem("testQuizCompleted");
    console.log("Get localstorage");
    console.log(this.testQuizCompleted);
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
    font-size: 0;
  }
  .visible {
    background-color: yellow;
    font-size: 14pt;
  }
  .solved {
    background-color: green;
    font-size: 14pt;
  }
</style>

<!--
<div class="memory-box" @click="toggleVisibility" :class="{visible: isVisible}">
  <h4>Memory-Box</h4>
</div>
-->
