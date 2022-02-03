<template>
  <div id="root-app">
    Hello world
    {{ list }}
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, reactive } from 'vue';

const apiClient = axios.create({ baseURL: "http://localhost:8082" });

const students = apiClient.get("/api/students");

export default {
  name: 'App',
  setup() {
    const list = reactive({ students: [] });
    onMounted(() => {
      students.then(result => {
        list.students = result.data.students
      });
    });

    return {
      list
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
