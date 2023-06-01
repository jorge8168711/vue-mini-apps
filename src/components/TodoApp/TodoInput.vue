<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['onSubmit', 'onToggle'],
  props: {
    allCompleted: { type: Boolean, required: false, default: false }
  },
  data() {
    return {
      newTodo: ''
    }
  },
  methods: {
    onSubmit() {
      if (!this.newTodo.trim()) return

      this.$emit('onSubmit', this.newTodo)
      this.newTodo = ''
    }
  }
})
</script>

<template>
  <form class="form" @submit.prevent="onSubmit">
    <button :class="{ disabled: !allCompleted }" @click="$emit('onToggle')" type="button">
      {{ allCompleted ? '✓' : '-' }}
    </button>
    <input class="input" v-model="newTodo" type="text" placeholder="What needs to be done?" />
  </form>
</template>

<style scoped>
.form {
  display: flex;
  margin-bottom: 1rem;
}
.input {
  width: 100%;
}
button.disabled {
  opacity: 0.35;
}
</style>
