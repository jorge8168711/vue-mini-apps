<script lang="ts">
import TodoInput from './TodoInput.vue'
import TodoItem from './TodoItem.vue'

import { nanoid } from 'nanoid'
import { defineComponent } from 'vue'
import { Todo } from './models'

export default defineComponent({
  components: {
    TodoInput,
    TodoItem
  },
  data() {
    return {
      todos: [] as Todo[]
    }
  },
  methods: {
    addTodo(todo: string) {
      const newTodo = new Todo(todo, nanoid())
      this.todos.push(newTodo)
    }
  }
})
</script>

<template>
  <div class="todolist">
    <TodoInput @submit="addTodo" />

    <ul class="todolist-wrapper">
      <TodoItem
        v-for="(todo, index) in todos"
        :key="todo.id"
        :todo="(todo as Todo)"
        :index="index"
      />
    </ul>
  </div>
</template>

<style scoped>
.todolist {
  max-width: 480px;
  margin: auto;
}

.todolist-wrapper {
  list-style: none;
  padding: 2rem;
  margin: 0;
}
</style>
