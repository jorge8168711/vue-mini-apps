<script lang="ts">
import TodoInput from './TodoInput.vue'
import TodoItem from './TodoItem.vue'
import TodoFooter from './TodoFooter.vue'

import { nanoid } from 'nanoid'
import { defineComponent } from 'vue'
import { Todo } from './models'
import { STORAGE_KEY, FILTERS } from './constants'

function getInitialTodos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').map(
    (t: { _content: string; id: string; _completed: boolean }) =>
      new Todo(t._content, t.id, t._completed)
  )
}
export default defineComponent({
  components: {
    TodoInput,
    TodoItem,
    TodoFooter
  },
  data() {
    return {
      todos: getInitialTodos() as Todo[],
      allCompleted: false,
      visibility: 'all'
    }
  },
  computed: {
    filteredTodos() {
      const selectedVisibility = this.visibility as keyof typeof FILTERS
      return FILTERS[selectedVisibility](this.todos as Todo[])
    },
    remaining() {
      return FILTERS.active(this.todos as Todo[]).length
    }
  },
  methods: {
    addTodo(todo: string) {
      const newTodo = new Todo(todo, nanoid())
      this.todos.push(newTodo)
    },
    setCompleted(index: number, value: boolean) {
      console.log({ index, value })
      this.todos[index].completed = value
    },
    toggleAll() {
      if (!this.todos.length) return

      const newValue = !this.allCompleted
      this.allCompleted = newValue

      for (const todo of this.todos) {
        todo.completed = newValue
      }
    },
    deleteTodo(todo: Todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    clearCompleted() {
      this.todos = FILTERS.active(this.todos as Todo[])
    },
    onHashChange() {
      const visibility = window.location.hash.replace(/#\/?/, '')
      if (FILTERS[visibility as keyof typeof FILTERS]) {
        this.visibility = visibility
      } else {
        window.location.hash = ''
        this.visibility = 'all'
      }
    }
  },
  watch: {
    todos: {
      handler(todos: Todo[]) {
        this.allCompleted = todos.every((todo) => todo.completed)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
      },
      deep: true
    }
  },
  created() {
    this.allCompleted = this.todos.every((todo) => todo.completed)
  },
  mounted() {
    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()
  }
})
</script>

<template>
  <div class="todolist">
    <h2>TODOS</h2>
    <TodoInput @onSubmit="addTodo" :allCompleted="allCompleted" @onToggle="toggleAll" />

    <ul class="todolist-wrapper" v-show="todos.length">
      <TodoItem
        v-for="(todo, index) in filteredTodos"
        :key="todo.id"
        :todo="(todo as Todo)"
        :index="index"
        :modelValue="todo.completed"
        @update:modelValue="(newValue: boolean) => (todo.completed = newValue)"
        @onDelete="deleteTodo"
      />
    </ul>

    <TodoFooter
      v-show="todos.length"
      @onClear="clearCompleted"
      :todosCount="todos.length"
      :remaining="remaining"
      :visibility="visibility"
    />
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
