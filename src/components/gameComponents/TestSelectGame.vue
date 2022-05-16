<script>
export default {
  name: "TestSelectGame",
  data() {
    return {
      randomBoolean: false,
    }
  },
  mounted() {
    this.randomBoolean = Math.random() < 0.5;
    console.log(this.randomBoolean);
  },
  emits: ['setMemory', 'setHangman']
}
</script>

<template>
  <div class="">
    <div class="theory-text">
      <p class="theory-paragraph">Mithilfe von <b>Datenvisualisierungen</b> können komplexe Datensätze auf einfach verständliche Art dargestellt werden. Daten können beispielsweise in Form von <b>Infografiken</b> visualisiert werden. Bei der Erstellung von Infografiken sollten folgende drei Aspekte beachtet werden:</p>
        <ul class="list">
          <li>Form</li>
          <li>Farbe</li>
          <li>Text</li>
        </ul>
      <p class="theory-paragraph">Während statische Daten gut mit Grafiken visualisiert werden können, bieten HTML/CSS/JavaScript viele Möglichkeiten, dynamische Datensätze darzustellen. Eine der einfachsten Formen davon sind <b>Tabellen</b>, die ohne JavaScript, nur mit HTML/CSS umgesetzt werden können.</p>
      <p class="theory-paragraph">Das Tabellen-Element wird in HTML definiert mit <b>&lt;table></b>, <b>&lt;thead></b>, <b>&lt;tbody></b>, <b>&lt;tr></b>, <b>&lt;th></b> und <b>&lt;td></b>. Im &lt;thead> werden mithilfe der &lt;th>-Tags die Überschriften (Headers) der einzelnen Spalten definiert. Die eigentlichen Tabellenreihen werden dann im &lt;tbody> mithilfe des &lt;td>-Tags definiert.</p>
      <p class="theory-paragraph">Beim Styling der Grafiken und Elemente mit CSS ist es sinnvoll, sich an die <a href="http://getbem.com/naming/" target="_blank">BEM Naming Convention</a> zu halten. BEM steht für Block, Element, Modifier.</p>
      <p class="theory-paragraph">Um Daten dynamisch mit JavaScript anzuzeigen, wird häufig das <b>JSON-Format</b> verwendet. Dabei handelt es sich um ein textbasierendes Datenformat, in dem Informationen wie Objekte, Arrays und sonstige Variablen in lesbarer Form gespeichert werden können. JSON steht für <b>JavaScript Object Notation</b>. Daten aus Excel können mithilfe von Online-Convertern in JSON umgewandelt werden. Eine Tabelle kann dann mit den Daten aus dem JSON gefüllt werden, indem man mit einem <b>For-Loop</b> durch die Daten durchgeht.</p>
    </div>
    <h3>Wenn Du den Theorieinput gelesen hast, klicke auf den Button, um weiterzufahren:</h3>
    <div id="game-choice">
      <button class="btn" v-if="!randomBoolean" @click="$emit('setMemory')">Memory starten!</button>
      <button class="btn" v-if="randomBoolean" @click="$emit('setHangman')">Hangman starten!</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
  .list {
    margin: 25px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .theory-text {
    margin-top: 40px;
    margin-bottom: 40px;
    margin-left: 100px;
    margin-right: 200px;
    border-style: solid;
    border-width: thin;
    padding: 25px;
  }
  .theory-paragraph {
    margin-bottom: 20px;
  }
  #game-choice {
    display: flex;
    align-self: center;
    margin-left: 100px;
    margin-right: 100px;
    margin-top: 25px;
    align-items: center;
  }
</style>
