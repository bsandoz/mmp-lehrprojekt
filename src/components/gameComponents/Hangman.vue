<template>
  <div class="exercise">
    <div class="hangman-container" @click="startGame">
      <h4 v-if="this.isGameRunning === false">Hangman starten!</h4>
      <div class="hangman" v-if="this.isGameRunning">
        <p>Welcher Begriff gehört zu folgender Definition?</p>
        <h3>{{ this.wordsArray[this.currentDefinition].definition }}</h3>
        <div class="letter-gaps">
          <div class="empty-definition" v-for="item in emptyLettersArray" v-if="isGameRunning">
            <h1> {{item}} </h1>
          </div>
        </div>
        <div v-if="canEnterLetters">
          <input id="hangmanInput" type="text" name="letter" maxlength="1" v-model="typedLetter" v-on:input="checkForLetters(typedLetter)" autocomplete="off">
        </div>
        <h2>Anzahl Fehler: {{ this.errorCounter }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';

  export default {
    name: "Hangman",
    data() {
      return {
        isGameRunning: false,
        wordsArray: null,
        errorCounter: null,
        currentDefinition: null,
        maxDefinitions: null,
        currentStringLength: null,
        emptyLettersArray: [],
        canEnterLetters: false,
        typedLetter: "",
        wordScore: 9,
        totalScore: 0,

        userScore: Number,
      }
    },
    methods: {
      async startGame() {
        try {
          if (this.isGameRunning) {
            await console.log("Already running game");
          } else {
            await console.log("Started game");

            await axios
              .get ("https://ifuu2646.directus.app/items/hangmanGameElements")
              .then (response => (this.wordsArray = response.data.data))
              .catch (function(error) {
                console.log(error);
              })
            this.isGameRunning = true;
            this.errorCounter = 0;
            this.currentDefinition = 0;
            this.maxDefinitions = this.wordsArray.length;
            //console.log(this.wordsArray.length);
            await this.getStringLength();
            await this.createEmptyDefinition();
          }
        }
        catch (error) {
          console.log(error);
        }
      },
      getStringLength() {
        this.currentStringLength = this.wordsArray[this.currentDefinition].concept.length;
        //console.log(this.currentStringLength);
      },
      createEmptyDefinition() {
        //Reset empty letters array between each word.
        this.emptyLettersArray = [];
        let word = this.wordsArray[this.currentDefinition].concept;
        let wordArray = word.split('');
        //wordArray = wordArray.replaceAll(" ", "");
        console.log(wordArray);
        for (var i = 0; i < this.currentStringLength; i++) {
          if (wordArray[i] === false) {
            //skip spaces
            console.log("skipped");
          } else {
            this.emptyLettersArray.push("_");
          }
        }
        console.log(this.emptyLettersArray);
        this.canEnterLetters = true;
      },
      checkForLetters(l) {
        let word = this.wordsArray[this.currentDefinition].concept;
        let result = word.includes(l);
        console.log(result);
        if (result) {
          let wordArray = word.split('');
          //console.log(wordArray);
          for (var i = 0; i < wordArray.length; i++) {
            if (wordArray[i] === l) {
              this.emptyLettersArray.splice(i, 1, l);
              //console.log(this.emptyLettersArray);
              if (wordArray.length === this.emptyLettersArray.length) {
                //console.log("Same length");
                let areEqual = this.arraysEqual(wordArray, this.emptyLettersArray);
                console.log(areEqual);
                if (areEqual) {
                  this.showSuccessMessage();
                  this.getNextWord();
                  this.typedLetter = "";
                  return;
                }
              }
            }
          }
        } else {
          this.errorCounter++;
          this.wordScore--;
          if (this.errorCounter >= 9) {
            this.showFailureMessage();
            this.getNextWord();
            this.typedLetter = "";
          }
        }
        this.typedLetter = "";
      },
      arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;


        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      },
      getNextWord() {
        this.totalScore += this.wordScore;
        console.log("Totale Punktzahl: " + this.totalScore);
        this.wordScore = 9;
        if (this.currentDefinition < this.maxDefinitions-1) {
          console.log("Getting next definition");
          this.currentDefinition++;
          this.errorCounter = 0;
          this.getStringLength();
          this.createEmptyDefinition();
        } else {
          console.log("All Words found!");
          this.userScore = this.totalScore;
          //Only register in testUsers db if values are set
          if (this.testUserAge) {
            this.register();
          }
        }
      },
      showSuccessMessage() {
        window.alert("Korrekt! Das Wort lautete " + this.wordsArray[this.currentDefinition].concept + ". Du hattest bei diesem Wort " + this.errorCounter + " Fehler.");
      },
      showFailureMessage() {
        window.alert("Du hast leider verloren! Das richtige Wort lautete " + this.wordsArray[this.currentDefinition].concept + ". Weiter zum nächsten Wort?");
      },
      prepareUserData() {
        console.log(this.userScore);
        return {
          age: this.testUserAge,
          gender: this.testUserGender,
          previousKnowledge: this.testUserPreviousKnowledge,
          scoreHangman: this.userScore,
        }
      },
      async register() {
        await console.log("Called register function in Hangman.vue");
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
  }
</script>

<style lang="css" scoped>
  .exercise {
    display: flex;
    width: 100%;
  }
  .letter-gaps {
    display: flex;
  }
</style>
