<template>
  <div class="leadtext">
    <p>{{ lead }}</p>
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
    margin-left: 50px;
    max-width: 750px;
    margin-top: 20px;
    margin-bottom: 30px;
  }
</style>
