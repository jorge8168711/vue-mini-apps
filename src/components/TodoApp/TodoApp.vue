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
      todos: [] as Todo[],
      allCompleted: false
    }
  },
  methods: {
    addTodo(todo: string) {
      const newTodo = new Todo(todo, nanoid())
      this.todos.push(newTodo)
    },
    toggleAll() {
      if (!this.todos.length) return

      const newValue = !this.allCompleted
      this.allCompleted = newValue

      for (const todo of this.todos) {
        todo.completed = newValue
      }
    }
  },
  watch: {
    todos(_, newSt) {
      const allIsCompleted = newSt.every((todo: Todo) => todo.completed)
      this.allCompleted = allIsCompleted
    }
  }
})
</script>

<template>
  <div class="todolist">
    <TodoInput @onSubmit="addTodo" :allCompleted="allCompleted" @onToggle="toggleAll" />

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
