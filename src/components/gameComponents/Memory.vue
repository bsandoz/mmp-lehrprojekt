<template>
  <MessageBox ref="messageBox" :message="message" @clickedMessageBox="clickedMessageBox"/>
  <TestQuestions v-if="questionsActive" @hideTestLead="hideTestLead"/>
  <!--<button type="button" name="button" @click="setMemoryBoxes">test</button>-->
  <div class="exercise" v-if="!questionsActive">
    <Lead lead="In diesem Memory sind Abbildungen der verschiedenen Notenwerte und ihre Definitionen versteckt.
    Kannst Du sie alle finden und richtig zuordnen? Klicke auf die Felder, um sie aufzudecken." />
    <!--<button class="btn continue-btn" :class="{ active: canContinue }" v-if="showContinueButton" @click="makeBoxesInvisible">Weiter</button>-->
    <div class="memory-container" :if="this.testQuizCompleted === false">
      <button class="btn" v-if="this.isGameRunning === false" @click="setMemoryBoxes">Memory starten!</button>
      <div v-for="item in memoryboxArray" :key="item.id" v-if="this.isGameRunning">
        <div class="memory-box btn" @click="toggleVisibility(item)"
        :class="{visible: item.isVisible},{solved: item.isSolved}">
        <div v-html="item.fieldContent" class="memory-image" :class="{visible: item.isVisible},{solved: item.isSolved}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lead from '../Lead.vue'
import MessageBox from '../modals/MessageBox.vue'
import TestQuestions from './TestQuestions.vue'

import { useUserStore } from '@/store/UserStore.js'
import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: 'Memory',
  components: {
    Lead,
    MessageBox,
    TestQuestions,
  },
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
      showContinueButton: false,
      canContinue: false,
      message: "",
      messageType: String,

      //testQuizCompleted: null,
      userScore: Number,
      //startTime: null,
      //endTime: null,

      questionsActive: false,

      boxContentArray: [],

      apiLink: null,
    }
  },
  methods: {

    createApiLink() {
      let id = this.activeModule.id + 1;
      this.apiLink = "https://db-easymusictheory.directus.app/items/module" + id + "GameElements";
      console.log(this.apiLink);
    },

    async startGame() {
      this.createApiLink();
      try {
        if (this.isGameRunning) {
          await console.log("Already running game");
        } else {
          await console.log("Started game");

          const headers = { "Authorization": `Bearer ${this.apiToken}` };

          await axios
            .get (this.apiLink, { headers })
            .then (response => (this.memoryboxArray = response.data.data))
            .catch (function(error) {
              console.log(error);
            })
          //await this.setMemoryBoxes();
          await this.shuffle(this.memoryboxArray);
          this.isGameRunning = true;
          this.showContinueButton = true;
        }
      }
      catch (error) {
        console.log(error);
      }
    },

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

    setMemoryBoxes() {
      /*
      let htmlList = document.getElementsByClassName('memory-box');
      //console.log(htmlList);
      let array = Array.from(htmlList);
      //console.log(array);

      for (var i = 0; i < array.length; i++) {
        //console.log(this.memoryboxArray[i].fieldContent);
        array[i].innerHTML = this.memoryboxArray[i].fieldContent;
      }
      */
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
      if (this.visibilityCounter >= 2) {
        for (var i = 0; i < this.memoryboxArray.length; i++) {
          this.memoryboxArray[i].isVisible = false;
        }
        this.visibilityCounter = 0;
        this.stopRevealing = false;
        this.firstBoxPair = 0;
        this.secondBoxPair = 0;
        this.firstBoxClicked = null;
        this.secondBoxClicked = null;
        this.canContinue = false;
      }
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
        this.$refs.messageBox.showMessageBox();
        this.userScore = 127 - (3*this.triesNumber);
        if (this.userScore > 100) {
          this.userScore = 100;
        } else if (this.userScore < 0) {
          this.userScore = 0;
        }
        this.messageType = "complete";
        this.message = "Du hast alle Paare mit " + this.triesNumber + " Versuchen gefunden! Punkte: " + this.userScore + "/100";
        //this.setModule2Score(this.userScore);
        this.register();
        //this.getAllUsersData("https://ifuu2646.directus.app/items/users/5");
        //this.setCompletedModulesArray();
        //window.alert("Du hast alle Paare mit " + this.triesNumber + " Versuchen gefunden!")
        //this.testQuizCompleted = true;
        //localStorage.setItem("testQuizCompleted", true);
        //this.setTestUserScoreMemory(this.userScore);
        /* Only register in testUsers db if values are set
        if (this.testUserAge) {
          let today = new Date();
          let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          this.endTime = time;
          this.setTestUserEndTime(this.endTime);
          //this.goToQuestions();
          this.showCompletionMessage();
        }
        */

      }
    },
    goToQuestions() {
      /*
      this.$refs.messageBox.showMessageBox();
      this.message = "Du hast alle Paare mit " + this.triesNumber + " Versuchen gefunden! Nun folgen noch einige Fragen für die Auswertung des Versuchs.";
      */
      this.questionsActive = true;
    },
    showCompletionMessage() {
      this.messageType = "complete";
      this.$refs.messageBox.showMessageBox();
      this.message = "Du hast alle Paare mit " + this.triesNumber + " Versuchen gefunden! Nun folgen noch einige Fragen für die Auswertung des Versuchs.";
    },
    clickedMessageBox() {
      if (this.messageType === "complete") {
        //this.goToQuestions();
        this.$router.push({ name: 'Profile' });
      } else {
        window.alert("Ein Fehler ist aufgetreten.")
      }
    },
    hideTestLead() {
      this.$emit("hideTestLead");
    },

    prepareUserData() {
      //console.log(this.userScore);
      return {
        module2Completed: true,
        module2Score: this.userScore,
      }
    },

    async register() {
      let id = localStorage.getItem("userId");
      await console.log("Called register function in Memory.vue");
      const user = this.prepareUserData();
      const headers = { "Authorization": `Bearer ${this.apiToken}` };
      await axios.patch("https://db-easymusictheory.directus.app/items/users/" + id, user, { headers })
        .then((response) => {
          console.log(response);
          //this.$refs.messageBox.showMessageBox();
          //this.message = "Du hast alle Paare mit " + this.triesNumber + " Versuchen gefunden! Nun folgen noch einige Fragen für die Auswertung des Versuchs.";
          //window.alert("Daten in Datenbank gesichert.")
        })
        .catch(err => {
          this.error.errorSubmit = true
        })
      await this.getAllUsersData("https://db-easymusictheory.directus.app/items/users/" + id);
      await this.setCompletedModulesArray();
    },

    /*Test functions no longer needed
    ...mapActions(useUserStore, ['setTestUserScoreMemory']),
    ...mapActions(useUserStore, ['setTestUserStartTime']),
    ...mapActions(useUserStore, ['setTestUserEndTime']),
    */
    ...mapActions(useUserStore, ['setModule2Score']),
    ...mapActions(useUserStore, ['getAllUsersData']),
    ...mapActions(useUserStore, ['setCompletedModulesArray']),
  },
  computed: {
    /* Test variables no longer needed
    ...mapState(useUserStore, ['testUserId']),
    ...mapState(useUserStore, ['testUserAge']),
    ...mapState(useUserStore, ['testUserGender']),
    ...mapState(useUserStore, ['testUserPreviousKnowledge']),
    ...mapState(useUserStore, ['testUserScoreMemory']),
    ...mapState(useUserStore, ['testUserStartTime']),
    ...mapState(useUserStore, ['testUserEndTime']),
    */

    ...mapState(useModuleStore, ['activeModule']),
    ...mapState(useModuleStore, ['apiToken']),
    ...mapState(useUserStore, ['apiToken']),
    ...mapState(useUserStore, ['module2Score']),
    ...mapState(useUserStore, ['userData']),
  },
  created() {
    this.testQuizCompleted = localStorage.getItem("testQuizCompleted");
    console.log("Get localstorage");
    console.log(this.testQuizCompleted);
    this.startGame();
  },
  emits: ['hideTestLead']
}
</script>

<style lang="css" scoped>
  .exercise {
    background-color: var(--main-bg-color);
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 50px;
    margin-bottom: 100px;
    border-radius: 10px;
  }
  .memory-container {
    display: grid;
    margin: 50px;
    width: 75%;
    height: auto;
    align-self: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .memory-box {
    max-width: 250px;
    min-width: 200px;
    max-height: 250px;
    min-height: 200px;
    background-color: var(--main-accent-color);
    border-style: solid;
    border-color: var(--main-dark-color);
    border-radius: 5px;
    margin-bottom: 50px;
    font-size: 0;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .memory-image {
    visibility: hidden;
  }
  .visible {
    background-color: var(--main-bg-color);
    border-color: var(--main-accent-color);
    font-size: 12pt;
    visibility: visible;
  }
  .solved {
    background-color: var(--confirm-color);
    font-size: 12pt;
    border-color: var(--main-dark-color);
    visibility: visible;
  }
  .continue-btn {
    margin-left: 50px;
    background-color: grey;
    color: var(--mistake-color);
    cursor: default;
  }
  .active {
    background-color: var(--main-dark-color);
    color: var(--dark-bg-text-color);
    cursor: pointer;
  }
</style>

<!--
<div class="memory-box" @click="toggleVisibility" :class="{visible: isVisible}">
  <h4>Memory-Box</h4>
</div>
-->
