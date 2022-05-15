<template>
  <h3 v-if="testComplete">Herzlichen Dank für Deine Mithilfe! Die Resultate wurden in der Datenbank gespeichert. Du kannst dieses Fenster nun schliessen.</h3>
  <p v-if="!testComplete" id="instruction"><b>Bitte fülle nun noch folgenden Fragebogen aus.</b></p>
  <div class="" v-if="!testComplete">
    <form class="questions-form" @submit.prevent="handleForm">
      <div class="single-question">
        <p>1 - Wie unterhaltsam fandest Du das Lernen auf spielerische Weise mit diesem Versuch?</p>
        <input type="radio" v-model="question1" value="Gar nicht unterhaltsam" required>
        <label for="gar nicht unterhaltsam">Gar nicht unterhaltsam</label><br>
        <input type="radio" v-model="question1" value="Wenig unterhaltsam">
        <label for="wenig unterhaltsam">Wenig unterhaltsam</label><br>
        <input type="radio" v-model="question1" value="Ziemlich unterhaltsam">
        <label for="ziemlich unterhaltsam">Ziemlich unterhaltsam</label><br>
        <input type="radio" v-model="question1" value="Sehr unterhaltsam">
        <label for="sehr unterhaltsam">Sehr unterhaltsam</label><br>
      </div>
      <!--<p>Test: {{ this.question1 }}</p>-->
      <div class="single-question">
        <p>2 - Verglichen mit normalen Lernmethoden, wie schätzt Du Deinen Lernerfolg bei diesem Versuch ein?</p>
        <input type="radio" v-model="question2" value="Viel schlechter als normal" required>
        <label for="viel schlechter als normal">Viel schlechter aks normal</label><br>
        <input type="radio" v-model="question2" value="Etwas schlechter als normal">
        <label for="etwas schlechter als normal">Etwas schlechter als normal</label><br>
        <input type="radio" v-model="question2" value="Etwas besser als normal">
        <label for="etwas besser als normal">Etwas besser als normal</label><br>
        <input type="radio" v-model="question2" value="Viel besser als normal">
        <label for="viel besser als normal">Viel besser als normal</label><br>
      </div>
      <div class="single-question">
        <p>3 - Es folgt eine Wissensfrage, deren Beantwortung mir beim Auswerten des Versuchs hilft:
                Nenne ein textbasierendes Datenformat, das verwendet wird, um Daten über das Netzwerk zu übermitteln.
        </p>
        <input type="text" v-model="question3" required>
      </div>
      <div class="single-question">
        <p>4 - Wie benutzerfreundlich schätzt Du den Versuch ein?</p>
        <input type="radio" v-model="question4" value="Gar nicht benutzerfreundlich" required>
        <label for="gar nicht benutzerfreundlich">Gar nicht benutzerfreundlich</label><br>
        <input type="radio" v-model="question4" value="Wenig benutzerfreundlich">
        <label for="wenig benutzerfreundlich">Wenig benutzerfreundlich</label><br>
        <input type="radio" v-model="question4" value="Ziemlich benutzerfreundlich">
        <label for="ziemlich benutzerfreundlich">Ziemlich benutzerfreundlich</label><br>
        <input type="radio" v-model="question4" value="Sehr benutzerfreundlich">
        <label for="sehr benutzerfreundlich">Sehr benutzerfreundlich</label><br>
      </div>
      <div class="single-question">
        <p>5 - Wie schätzt Du die Verständlichkeit der Anweisungen während dem Versuch ein?</p>
        <input type="radio" v-model="question5" value="Sehr unverständlich" required>
        <label for="sehr unverständlich">Sehr unverständlich</label><br>
        <input type="radio" v-model="question5" value="Etwas unverständlich">
        <label for="etwas unverständlich">Etwas unverständlich</label><br>
        <input type="radio" v-model="question5" value="Ziemlich verständlich">
        <label for="ziemlich verständlich">Ziemlich verständlich</label><br>
        <input type="radio" v-model="question5" value="Sehr verständlich">
        <label for="sehr verständlich">Sehr verständlich</label><br>
      </div>
      <div class="single-question">
        <p>6 - Es folgt eine weitere Wissensfrage, deren Beantwortung mit beim Auswerten des Versuchs hilft: Nenne drei Aspekte, die bei der Gestaltung von Infografiken beachtet werden sollten.</p>
        <input type="text" v-model="question6" required>
      </div>
      <div class="single-question">
        <p>7 - Wie vertraut bist Du allgemein mit Computerspielen?</p>
        <input type="radio" v-model="question7" value="Gar nicht vertraut" required>
        <label for="gar nicht vertraut">Gar nicht vertraut</label><br>
        <input type="radio" v-model="question7" value="Wenig vertraut">
        <label for="wenig vertraut">Wenig vertraut</label><br>
        <input type="radio" v-model="question7" value="Etwas vertraut">
        <label for="etwas vertraut">Etwas vertraut</label><br>
        <input type="radio" v-model="question7" value="Sehr vertraut">
        <label for="sehr vertraut">Sehr vertraut</label><br>
      </div>
      <div class="single-question">
        <p>8 - Könntest Du dir vorstellen, ein solches bzw. ähnliches Lerntool in Zukunft zu nutzen?</p>
        <input type="radio" v-model="question8" value="Nein" required>
        <label for="nein">Nein</label><br>
        <input type="radio" v-model="question8" value="Ja">
        <label for="ja">Ja</label><br>
      </div>
      <div class="single-question">
        <p>9 - Hast Du weiteres Feedback, Verbesserungsvorschläge oder Kritik? </p>
        <input type="text" v-model="question9">
      </div>
      <button class="btn" @click="handleForm">Fortfahren</button>
    </form>
  </div>
</template>

<script>
import MessageBox from '../modals/MessageBox.vue'
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: "TestQuestions",
  components: {
    MessageBox,
  },
  data() {
    return {
      question1: null,
      question2: null,
      question3: null,
      question4: null,
      question5: null,
      question6: null,
      question7: null,
      question8: null,
      question9: null,

      testComplete: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['testQuestion1']),
    ...mapState(useUserStore, ['testQuestion2']),
    ...mapState(useUserStore, ['testQuestion3']),
    ...mapState(useUserStore, ['testQuestion4']),
    ...mapState(useUserStore, ['testQuestion5']),
    ...mapState(useUserStore, ['testQuestion6']),
    ...mapState(useUserStore, ['testQuestion7']),
    ...mapState(useUserStore, ['testQuestion8']),
    ...mapState(useUserStore, ['testQuestion9']),

    ...mapState(useUserStore, ['testUserId']),
    ...mapState(useUserStore, ['testUserAge']),
    ...mapState(useUserStore, ['testUserGender']),
    ...mapState(useUserStore, ['testUserPreviousKnowledge']),
    ...mapState(useUserStore, ['testUserScoreMemory']),
    ...mapState(useUserStore, ['testUserScoreHangman']),
  },
  methods: {
    handleForm() {
      console.log("Called handleForm");
      if (this.question1 && this.question2 && this.question3 && this.question4 && this.question5 && this.question6 && this.question7 && this.question8) {
        this.saveUserAnswersInState();
        this.prepareUserData();
        this.register();
      } else {
        console.log("Empty fields");
      }
    },
    saveUserAnswersInState() {
      this.setTestQuestion1(this.question1);
      this.setTestQuestion2(this.question2);
      this.setTestQuestion3(this.question3);
      this.setTestQuestion4(this.question4);
      this.setTestQuestion5(this.question5);
      this.setTestQuestion6(this.question6);
      this.setTestQuestion7(this.question7);
      this.setTestQuestion8(this.question8);
      this.setTestQuestion9(this.question9);
      console.log("Saved user answers in state");
      /*
      console.log(this.testQuestion1);
      console.log(this.testQuestion2);
      console.log(this.testQuestion3);
      console.log(this.testQuestion4);
      console.log(this.testQuestion5);
      console.log(this.testQuestion6);
      console.log(this.testQuestion7);
      console.log(this.testQuestion8);
      console.log(this.testQuestion9);
      */
    },
    prepareUserData() {
      //console.log(this.userScore);
      return {
        age: this.testUserAge,
        gender: this.testUserGender,
        previousKnowledge: this.testUserPreviousKnowledge,
        scoreMemory: this.testUserScoreMemory,
        scoreHangman: this.testUserScoreHangman,
        question1: this.testQuestion1,
        question2: this.testQuestion2,
        question3: this.testQuestion3,
        question4: this.testQuestion4,
        question5: this.testQuestion5,
        question6: this.testQuestion6,
        question7: this.testQuestion7,
        question8: this.testQuestion8,
        question9: this.testQuestion9,
      }
    },
    async register() {
      await console.log("Called register function in TestQuestions.vue");
      const user = this.prepareUserData();
      await axios.post("https://ifuu2646.directus.app/items/testUsers", user)
        .then((response) => {
          console.log(response);
          this.testComplete = true;
          //window.alert("Herzlichen Dank für Deine Mithilfe! Die Resultate wurden in der Datenbank gespeichert. Du kannst dieses Fenster nun schliessen.")
        })
        .catch(err => {
          this.error.errorSubmit = true
        })
    },
    ...mapActions(useUserStore, ['setTestQuestion1']),
    ...mapActions(useUserStore, ['setTestQuestion2']),
    ...mapActions(useUserStore, ['setTestQuestion3']),
    ...mapActions(useUserStore, ['setTestQuestion4']),
    ...mapActions(useUserStore, ['setTestQuestion5']),
    ...mapActions(useUserStore, ['setTestQuestion6']),
    ...mapActions(useUserStore, ['setTestQuestion7']),
    ...mapActions(useUserStore, ['setTestQuestion8']),
    ...mapActions(useUserStore, ['setTestQuestion9']),
  },
}
</script>

<style lang="css" scoped>
  .single-question {
    margin-left: 50px;
    margin-top: 50px;
  }
  #instruction {
    margin-left: 50px;
  }
</style>
