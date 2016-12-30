<template>
  <div id="app">
    <quizmaker></quizmaker>
  </div>
</template>

<script>
import quizmaker from './components/Quizmaker.vue';

export default {
  name: 'app',
  components: {
    quizmaker
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
