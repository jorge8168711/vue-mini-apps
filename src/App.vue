<script lang="ts">
import TodoApp from './components/TodoApp/TodoApp.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TodoApp
  }
})
</script>

<template>
  <main>
    <TodoApp />
  </main>
</template>

<style scoped></style>
