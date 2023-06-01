import type { Todo } from './models'

export const STORAGE_KEY = 'vue-todo-app'

export const FILTERS = {
  all: (todos: Todo[]) => todos,
  active: (todos: Todo[]) => todos.filter((todo) => !todo.completed),
  completed: (todos: Todo[]) => todos.filter((todo) => todo.completed)
}
