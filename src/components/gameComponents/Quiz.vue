<script>
import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';

export default {
  name: 'Quiz',
  components: {

  },
  data() {
    return {
      elementsArray: [],
      filteredQuestionsArray: [],
      filteredAnswersArray: [],

      question: null,
      answers: [],

      apiLink: null,
      isGameRunning: false,
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
            .get (this.apiLink)
            .then (response => (this.elementsArray = response.data.data))
            .catch (function(error) {
              console.log(error);
            })
          //this.isGameRunning = true;
          //this.showContinueButton = true;

        }
      }
      catch (error) {
        console.log(error);
      }
    },

    createApiLink() {
      let id = this.activeModule.id + 1;
      this.apiLink = "https://ifuu2646.directus.app/items/module" + id + "GameElements";
      console.log(this.apiLink);
    },

    filterArrayForQuestion() {
      this.isGameRunning = true;
      for (var i = 0; i < this.elementsArray.length; i++) {
        if (this.elementsArray[i].fieldType === "question") {
          this.filteredQuestionsArray.push(this.elementsArray[i]);
        }
      }
      console.log(this.filteredQuestionsArray);

      this.question = this.filteredQuestionsArray[0].fieldContent;
      let doc = document.getElementById("question");
      doc.innerHTML = this.question;
    },

    filterArrayForAnswers() {
      for (var i = 0; i < this.elementsArray.length; i++) {
        if (this.elementsArray[i].fieldType === "answer") {
          this.filteredAnswersArray.push(this.elementsArray[i]);
        }
      }
      console.log(this.filteredAnswersArray);

      let doc1 = document.getElementById("answer-1");
      doc1.innerHTML = this.filteredAnswersArray[0].fieldContent;
      let doc2 = document.getElementById("answer-2");
      doc2.innerHTML = this.filteredAnswersArray[1].fieldContent;
      let doc3 = document.getElementById("answer-3");
      doc3.innerHTML = this.filteredAnswersArray[2].fieldContent;
      let doc4 = document.getElementById("answer-4");
      doc4.innerHTML = this.filteredAnswersArray[3].fieldContent;

    },

    checkAnswer(id) {
      console.log("Clicked answer button with id " + id + ".");
      if (this.filteredAnswersArray[id].isCorrect === true) {
        console.log("Correct answer!");
      } else {
        console.log("Wrong answer.");
      }
    }

  },
  computed: {
    ...mapState(useModuleStore, ['activeModule']),
  },
  created() {
    this.createApiLink();
    this.startGame();
  }
}
</script>

<template>
  <div v-if="!isGameRunning">
    <p>Überprüfe nun dein Wissen zum Notensystem mit diesem Quiz! Benenne die gezeigten Noten richtig.
      Als Erinnerung: Das E liegt auf der unteren Notenlinie. Viel Erfolg! </p>
  </div>
  <button v-if="!isGameRunning" type="button" name="button" class="btn" @click="filterArrayForQuestion(); filterArrayForAnswers();">Spiel starten</button>
  <div class="quiz">
    <!--
    <button type="button" name="button" class="btn" @click="filterArrayForQuestion">Start</button>
    <button type="button" name="button" class="btn" @click="filterArrayForAnswers">Start</button>
    -->
    <div id="question">

    </div>
    <div id="answers" class="answer-buttons" :class="{visible: this.isGameRunning}">
      <button id="answer-1" class="btn" @click="checkAnswer(0)">

      </button>
      <button id="answer-2" class="btn" @click="checkAnswer(1)">

      </button>
      <button id="answer-3" class="btn" @click="checkAnswer(2)">

      </button>
      <button id="answer-4" class="btn" @click="checkAnswer(3)">

      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
  .answer-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
</style>
