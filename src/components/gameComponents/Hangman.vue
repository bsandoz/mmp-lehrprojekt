<template>
  <div class="exercise">
    <div class="hangman-container" @click="startGame">
      <h4 v-if="this.isGameRunning === false">Hangman starten!</h4>
      <div class="hangman" v-if="this.isGameRunning">
        <p>Welcher Begriff gehört zu folgender Definition?</p>
        <h3>{{ this.wordsArray[this.currentDefinition].definition }}</h3>
        <div class="empty-definition" v-for="item in emptyLettersArray" v-if="isGameRunning">
          <h1> {{item}} </h1>
        </div>
        <div v-if="canEnterLetters">
          <input type="text" name="letter" maxlength="1" v-model="typedLetter">
          <button type="button" name="Check" value="Check" @click="checkForLetters(typedLetter)"></button>
        </div>
        <h2>Anzahl Fehler: {{ this.errorCounter }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
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
            console.log(this.wordsArray.length);
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
        console.log(this.currentStringLength);
      },
      createEmptyDefinition() {
        for (var i = 0; i < 3; i++) {
          this.emptyLettersArray.push("_");
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
          let letterArray = [];
          console.log(wordArray);
          for (var i = 0; i < wordArray.length; i++) {
            if (wordArray[i] === l) {
              this.emptyLettersArray.splice(i, 1, l);
            }
          }
          console.log(letterArray);
        } else {
          this.errorCounter++;
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  .exercise {
    display: flex;
    width: 100%;
  }
</style>
