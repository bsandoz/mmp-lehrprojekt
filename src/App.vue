<template>
  <DeviceWarning v-show="isMobile" @mobile="setIsMobile" />
  <header>
    <Header />
    <div class="wrapper">

    </div>
  </header>

  <main>
    <router-view></router-view>
  </main>
  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

import DeviceWarning from './components/DeviceWarning.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    DeviceWarning,
  },
  data() {
    return {
      content: null,

      isMobile: false,
    }
  },
  methods: {
    setIsMobile(bool) {
      this.isMobile = bool;
      this.hideOverflow(bool);
    },
    hideOverflow(bool) {
      if (bool) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }

    }

  },
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

  :root {
  --main-bg-color: #fff;
  --main-text-color: #000;
  --dark-bg-text-color: #fff;
  --main-accent-color: #f5971d;
  --main-dark-color: #001f33;
  --confirm-color: #85e085;
  --mistake-color: #cc2900;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--main-dark-color);
  }
  main {
    min-height: 90vh;
    background-color: var(--main-dark-color);
  }
  p {
    margin-bottom: 25px;
  }
  .nomargin {
    margin-bottom: 0px;
  }
  .note {
    border-style: groove;
    border-width: thin;
    border-color: var(--main-accent-color);
    padding: 10px;
    margin-bottom: 50px;
    margin-left: 10vw;
    margin-right: 10vw;
  }
  img {
    max-width: 450px;
  }
  ol {
    margin-top: 50px;
    font-weight: bold;
  }
  ul {
    margin-top: 50px;
    font-weight: bold;
  }
  li {
    padding-left: 10px;
  }
  ol li::marker {
    color: var(--main-accent-color);
  }
  ul li::marker {
    color: var(--main-accent-color);
  }
  li::before {
    content: "";
    width: 20px;
  }
  .container {
    max-width: 500px;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }
  .btn {
    display: inline-block;
    background: var(--main-accent-color);
    color: var(--main-text-color);
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
    transition: 0.2s;
  }
  .btn:focus {
    outline: none;
  }
  .btn:active {
    transform: scale(0.98);
  }
  .btn:hover {
    box-shadow: 3px 6px #888888;
    transform: scale(1.05);
  }
  .btn-block {
    display: block;
    width: 100%;
  }
  .site-title {
    margin-left: 50px;
    margin-right: 50px;
  }
  .main-container {
    margin-left: 50px;
    margin-right: 750px;
    margin-top: 50px;
    border-style: dashed;
    border-width: thin;
  }
  .clickbox {
    border-style: solid;
    max-width: 500px;
    min-height: 100px;
    text-align: center;
    margin-top: 50px;
    padding: 10px;
    font-weight: bold;
    background-color: var(--main-accent-color);
  }
  .site-title {
    margin-top: 50px;
  }
  .unstyled-link {
    text-decoration: none;
    color: var(--main-text-color);
  }
  .temporary-style {
    margin-top: 100px;
  }
  .error-message {
    color: var(--mistake-color);
  }
  .audio {
    margin-bottom: 25px;
  }
  .bold {
    font-weight: bold;
  }
  .header-summary {
    margin-top: 100px;
  }
  input[type=text], select {
    max-width: 25%;
    padding: 5px;
    margin: 10px;
    margin-top: 5px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  input[type=number] {
    margin: 10px;
  }
  label {
    margin: 5px;
    margin-bottom: 0px;
    margin-top: 20px;
  }
  figure {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 30px;
    margin-bottom: 30px;
  }
  figcaption {
    font-style: italic;
  }



</style>
