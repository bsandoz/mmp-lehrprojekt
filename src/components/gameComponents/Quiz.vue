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
          this.isGameRunning = true;
          this.showContinueButton = true;
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
  <button type="button" name="button" class="btn" @click="filterArrayForQuestion">Start</button>
  <button type="button" name="button" class="btn" @click="filterArrayForAnswers">Start</button>
  <div id="question">

  </div>
  <div id="answers">
    <div id="answer-1">

    </div>
    <div id="answer-2">

    </div>
    <div id="answer-3">

    </div>
    <div id="answer-4">

    </div>
  </div>
</template>

<style lang="css" scoped>
</style>
