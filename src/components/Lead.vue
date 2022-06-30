<template>
  <div class="leadtext">
    <p class="leadtext-paragraph">{{ lead }}</p>
  </div>
</template>

<script>
export default {
  name: 'Lead',
  props: {
    lead: String,
  }
}
</script>

<style lang="css" scoped>
  .leadtext {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 20px;
    padding-bottom: 30px;
  }
  .leadtext-paragraph {
    max-width: 750px;
    align-self: center;
  }
</style>
