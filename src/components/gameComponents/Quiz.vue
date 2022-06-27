<script>
import { useModuleStore } from '@/store/ModuleStore.js'
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

import MessageBox from '../modals/MessageBox.vue';

export default {
  name: 'Quiz',
  components: {
    MessageBox,
  },
  props: {
    text: String,
  },
  data() {
    return {
      elementsArray: [],

      numberOfQuestions: null,

      question1Array: [],
      question2Array: [],
      question3Array: [],
      question4Array: [],
      question5Array: [],

      questionCounter: 0,

      filteredQuestionsArray: [],
      filteredAnswersArray: [],
      correctAnswer: null,

      question: null,
      answers: [],

      answerChosen: false,
      isAnswerCorrect: false,
      quizPoints: null,

      apiLink: null,
      isGameRunning: false,

      message: null,
      moduleId: null,
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
      this.moduleId = this.activeModule.id + 1;
      this.apiLink = "https://ifuu2646.directus.app/items/module" + this.moduleId + "GameElements";
      console.log(this.apiLink);
    },

    splitArray(array) {
      this.question1Array = array.slice(0, 5);
      this.question2Array = array.slice(5, 10);
      this.question3Array = array.slice(10, 15);
      this.question4Array = array.slice(15, 20);
      this.question5Array = array.slice(20, 25);

      console.log(this.question1Array);
      console.log(this.question2Array);
      console.log(this.question3Array);
    },

    setNumberOfQuestions() {
      for (var i = 0; i < this.elementsArray.length; i++) {
        if (this.elementsArray[i].fieldType === "question") {
          this.numberOfQuestions++;
        }
      }
      console.log(this.numberOfQuestions);
    },

    nextQuestion() {
      if (this.numberOfQuestions === null) {
        this.setNumberOfQuestions();
      }

      if (this.questionCounter >= this.numberOfQuestions) {
        console.log("All questions answered");
        this.register();
        this.$refs.messageBox.showMessageBox();

      } else {
        this.questionCounter++;
        this.resetQuestion();

        let questionArray;

        if (this.questionCounter === 1) {
          questionArray = this.question1Array;
        } else if (this.questionCounter === 2) {
          questionArray = this.question2Array;
        } else if (this.questionCounter === 3) {
          questionArray = this.question3Array;
        } else if (this.questionCounter === 4) {
          questionArray = this.question4Array;
        } else if (this.questionCounter === 5) {
          questionArray = this.question5Array;
        } else {
          console.log("questionCounter Error");
        }

        this.filterArrayForQuestion(questionArray);
        this.filterArrayForAnswers(questionArray);
      }
    },

    filterArrayForQuestion(array) {
      this.isGameRunning = true;
      for (var i = 0; i < array.length; i++) {
        if (array[i].fieldType === "question") {
          this.filteredQuestionsArray.push(array[i]);
        }
      }
      console.log(this.filteredQuestionsArray);

      this.question = this.filteredQuestionsArray[0].fieldContent;
      let doc = document.getElementById("question");
      doc.innerHTML = this.question;
    },

    filterArrayForAnswers(array) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].fieldType === "answer") {
          this.filteredAnswersArray.push(array[i]);
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

    saveCorrectAnswer() {
      for (var i = 0; i < this.filteredAnswersArray.length; i++) {
        if (this.filteredAnswersArray[i].isCorrect === true) {
          console.log(this.filteredAnswersArray);
          this.correctAnswer = this.filteredAnswersArray[i].answerNumber;
          console.log(this.correctAnswer);
        }
      }
    },

    checkAnswer(id) {
      this.saveCorrectAnswer();
      if (this.answerChosen === false) {
        console.log("Clicked answer button with id " + id + ".");
        if (this.filteredAnswersArray[id].isCorrect === true) {
          console.log("Correct answer!");
          this.quizPoints++;
          this.message = "Du hast " + this.quizPoints + " Punkte erreicht.";
          console.log(this.quizPoints);
          this.answerChosen = true;
          this.isAnswerCorrect = true;
          let adjustedId = id + 1;
          let btn = document.getElementById("answer-" + adjustedId);
          btn.classList.add("correct");
        } else {
          console.log("Wrong answer.");
          this.answerChosen = true;
          this.isAnswerCorrect = false;
          let adjustedId = id + 1;
          let btnCorrect = document.getElementById("answer-" + this.correctAnswer);
          btnCorrect.classList.add("correct");
          let btnWrong = document.getElementById("answer-" + adjustedId);
          btnWrong.classList.add("wrong");
        }
      } else {
        console.log("Answer already given.");
      }
    },

    resetQuestion() {
      this.filteredQuestionsArray = [];
      this.filteredAnswersArray = [];
      this.correctAnswer = null;
      this.question = null;
      this.answers = [];
      this.answerChosen = false;
      this.isAnswerCorrect = false;

      let buttons = document.getElementsByClassName("btn");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("wrong", "correct");
      }
    },
    clickedMessageBox() {
      this.$router.push({ name: 'Home' });
    },

    prepareUserData() {
      //console.log(this.activeModule.id);
      //let moduleId = this.activeModule.id + 1;
      if (this.moduleId === 1) {
        return {
          module1Completed: true,
          module1Score: this.quizPoints,
        }
      } else if (this.moduleId === 3) {
        return {
          module3Completed: true,
          module3Score: this.quizPoints,
        }
      }
    },

    async register() {
      let id = localStorage.getItem("userId");
      await console.log("Called register function in Quiz.vue");
      const user = this.prepareUserData();
      await axios.patch("https://ifuu2646.directus.app/items/users/" + id, user)
        .then((response) => {
          console.log(response);
          //this.$refs.messageBox.showMessageBox();
          //this.message = "Du hast alle Paare mit " + this.triesNumber + " Versuchen gefunden! Nun folgen noch einige Fragen für die Auswertung des Versuchs.";
          window.alert("Daten in Datenbank gesichert.")
        })
        .catch(err => {
          this.error.errorSubmit = true
        })
      await this.getAllUsersData("https://ifuu2646.directus.app/items/users/" + id);
      await this.setCompletedModulesArray();
    },

    ...mapActions(useUserStore, ['getAllUsersData']),
    ...mapActions(useUserStore, ['setCompletedModulesArray']),

  },
  computed: {
    ...mapState(useModuleStore, ['activeModule']),
    ...mapState(useUserStore, ['userData']),
  },
  created() {
    this.createApiLink();
    this.startGame();
  }
}
</script>

<template>
  <MessageBox ref="messageBox" :message="message" @clickedMessageBox="clickedMessageBox" />
  <div v-if="!isGameRunning">
    <p v-if="this.moduleId === 1">Überprüfe nun dein Wissen zum Notensystem mit diesem Quiz! Benenne die gezeigten Noten richtig.
      Als Erinnerung: Das E liegt auf der unteren Notenlinie. Viel Erfolg! </p>
    <p v-if="this.moduleId === 3">In diesem Quiz wird nun dein erlerntes Wissen aus allen drei vorangegangenen Kapiteln auf die Probe gestellt.
    Hör genau hin und wähle die Antwort aus, die zum Audioclip passt! </p>
  </div>
  <button v-if="!isGameRunning" type="button" name="button" class="btn" @click="splitArray(this.elementsArray); nextQuestion();">Spiel starten</button>
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
    <div class="result-message" v-if="answerChosen">
      <h3 v-if="isAnswerCorrect">Korrekt! Weiter zur nächsten Frage?</h3>
      <h3 v-if="!isAnswerCorrect">Das war leider die falsche Antwort! Weiter zur nächsten Frage?</h3>
      <button id="next-button" class="btn" @click="nextQuestion">-></button>
    </div>
    <p v-if="numberOfQuestions">{{ this.questionCounter }}/{{ this.numberOfQuestions }}</p>
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
  .correct {
    background-color: var(--confirm-color);
  }

  .wrong {
    background-color: var(--mistake-color);
  }
</style>
