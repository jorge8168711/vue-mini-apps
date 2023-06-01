<script lang="ts">
import { defineComponent } from 'vue'
import { Todo } from './models'

export default defineComponent({
  emits: ['update:modelValue', 'onDelete', 'onEdit', 'doneEdit', 'cancelEdit'],
  props: {
    modelValue: { type: Boolean, required: false, default: false },
    todo: { type: Todo, required: true },
    editedTodo: { type: Todo, required: false, default: null }
  }
})
</script>

<template>
  <li class="todo-item">
    <input
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      :checked="modelValue"
      class="todo-item-checkbox"
      type="checkbox"
    />
    <input
      class="todo-item-input"
      v-if="todo.id === editedTodo?.id"
      :value="todo.content"
      @blur="$emit('doneEdit', todo, ($event.target as HTMLInputElement).value)"
      @keyup.enter="$emit('doneEdit', todo, ($event.target as HTMLInputElement).value)"
      @keyup.escape="$emit('cancelEdit', todo)"
      @vue:mounted="(e: any) => {
        // i didn't find a way to type this properly
        if (typeof e?.el?.focus === 'function') {
          e.el.focus()
        }
      }"
      type="text"
    />
    <label
      class="todo-item-content"
      :class="{ isActive: todo.completed }"
      v-show="todo.id !== editedTodo?.id"
      @dblclick="$emit('onEdit', todo)"
      >{{ todo.content }}</label
    >
    <button @click="$emit('onDelete', todo)" type="button" class="todo-item-button">x</button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 0;
}

.todo-item:hover .todo-item-button {
  visibility: visible;
  opacity: 1;
}

.todo-item:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.todo-item-checkbox {
  margin: 0;
}

.todo-item-content {
  padding: 0 1rem;
  margin: 0;
  width: 100%;
}
.todo-item-content.isActive {
  text-decoration: line-through;
}

.todo-item-button {
  transition: all 0.2s ease-in-out;
  visibility: hidden;
  opacity: 0;
  margin: 0;
}

.todo-item-input {
  width: 100%;
}
</style>
