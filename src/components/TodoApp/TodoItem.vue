<script lang="ts">
import { defineComponent } from 'vue'
import { Todo } from './models'

export default defineComponent({
  emits: ['onCompleteChange'],
  props: {
    todo: { type: Todo, required: true },
    index: { type: Number, required: true }
  },
  methods: {
    onCompleteChange(event: Event) {
      this.$emit('onCompleteChange', (event.target as HTMLInputElement).checked)
    }
  }
})
</script>

<template>
  <li class="todo-item">
    <input
      @change="onCompleteChange"
      class="todo-item-checkbox"
      :checked="todo.completed"
      type="checkbox"
    />
    <p :class="{ isActive: todo.completed }" class="todo-item-content">{{ todo.content }}</p>
    <button type="button" class="todo-item-button">x</button>
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
</style>
